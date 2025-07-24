'use client';
import { api } from "@/lib/api";
import { Button, Container, Typography, Box, Modal, TextareaAutosize } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FeedImportResponse, ImportLog } from "@/types";
import {  useEffect, useState } from "react";




export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleImportFeeds = async () => {
    const parsed = textareaValue
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (parsed.length === 0) return;
    

    setLoading(true);
    try {
      const query = parsed
      .map(url => `feed=${encodeURIComponent(url)}`)
      .join('&');

      await api.get<FeedImportResponse>(`/jobs/fetch?${query}`);

      fetchLogs();
    } catch (error) {
      console.error('Error importing feeds:', error);
    } finally {
      setLoading(false);
      setTextareaValue('');
      setOpenModal(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await api.get<ImportLog[]>('/import-logs');

      setLogs(res.data);
    }
    catch (err) {
      console.error('Error fetching logs:', err);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  const columns: GridColDef[] = [
    { field: 'filename', headerName: 'File Name', headerAlign: 'center', flex: 1, minWidth: 300 },

    {
      field: 'timestamp',
      headerName: 'ImportDateTime',
      flex: 1, minWidth: 200,
      headerAlign: 'center',
      valueFormatter: (params: string) => {
        const date = new Date(params);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).replace(',', '');
      }

    },
    { field: 'totalFetched', headerName: 'Total', headerAlign: 'center', cellClassName: 'centeredCell', flex: 0.5, minWidth: 150 },
    { field: 'newJobs', headerName: 'New', headerAlign: 'center', cellClassName: 'centeredCell', flex: 0.5, minWidth: 150 },
    { field: 'updatedJobs', headerName: 'Updated', headerAlign: 'center', cellClassName: 'centeredCell', flex: 0.5, minWidth: 150 },
    {
      field: 'failedJobsCount',
      headerName: 'Failed',
      headerAlign: 'center',
      flex: 0.5, minWidth: 150,
      cellClassName: 'centeredCell',
      valueGetter: (params: { row: { failedJobs: {length:number} } }) => params?.row?.failedJobs?.length || 0

    },
  ];

  return (
    <Container maxWidth="xl" sx={{ padding: '2rem' }}>
      <Typography variant="h4" className="text-center" gutterBottom>
        Job Importer
      </Typography>

      <Button variant="contained" sx={{ mb: 10 }} onClick={handleOpenModal}>Add Feeds</Button>


      <Box>
        <Typography variant="h6" gutterBottom>
          Import History Tracking
        </Typography>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={logs.map((log) => ({ ...log, id: log._id }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 }
              }
            }}
            pageSizeOptions={[10, 20, 30, 50]}
            sx={{
              '& .MuiDataGrid-cell.centeredCell': {
                justifyContent: 'center',
                display: 'flex',
              },
            }}
          />
        </div>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, width: 600, mx: 'auto', mt: 10 }}>
          <Typography variant="h6" gutterBottom>
            Enter Feed URLs
          </Typography>
          <TextareaAutosize

            minRows={6}
            style={{ width: '100%', padding: 10 }}
            placeholder="Enter URLs separated by commas or new lines"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleImportFeeds} variant="contained">
              {loading ? 'Importing...' : 'Import'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>


  );

}

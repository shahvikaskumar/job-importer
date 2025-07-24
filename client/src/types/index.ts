export interface FeedImportResponse {
    feeds: {
        feedurl: string;
        queued: number;
        error?: string;
    }
}

export interface ImportLog {
    _id: string;
    filename: string;
    totalFetched: number;
    newJobs: number;
    updatedJobs: number;
    timestamp: string;
    failedJobs: {
        job: string;
        reason: string;
    }[];
}
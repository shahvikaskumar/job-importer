
import { Worker } from 'bullmq';
import { bullQueueOptions } from '../config/redis.config';
import { JobService } from '../../features/job/job.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ImportLogService } from '../../features/import-log/import-log.service';
import { FeedSourceService } from '../../features/feed-source/feed-source.services';



async function bootstrapWorker() {

  const appContext = await NestFactory.createApplicationContext(AppModule);
  const jobService = appContext.get(JobService);
  const importLogService = appContext.get(ImportLogService);
  const feedSourceService = appContext.get(FeedSourceService);

  const worker = new Worker('JobQueue', async (job) => {

   const { items, feedurl: filename } = job?.data;
    const timestamp = new Date()
    let totalFetched = 0;
    let newJobs = 0;
    let updatedJobs = 0;
    let failedJobs: { job: any; reason: string }[] = [];

    await feedSourceService.createOrUpdateFeedSource({url:filename, isActive:true});


    for (const item of items) {
      try {
          const externalId = item.id;
          if (!externalId) throw new Error('External ID is missing');
          
          const jobDoc = {
          externalId,
          title: item.title,
          description: item.description,
          link: item.link,
          pubDate: new Date(item.pubDate),
          location:item['job_listing:location'],
          company:item['job_listing:company'],
          type:item['job_listing:job_type'],
          mediaContent: item['media:content'],
          guid: item.guid,
          createdAt: timestamp,
          updatedAt: timestamp
        };

        const result = await jobService.createOrUpdate(jobDoc);
        
        if (result?.isNew) {
          newJobs++;
        } else {
          updatedJobs++;
        }
        totalFetched++;
      }


      catch (err: any) {
        failedJobs.push({ job: item.title, reason: err.message });
        console.error('Job Failed:', err.message);       
      }
    }

    
    await importLogService.logImport({
          filename, totalFetched, newJobs, updatedJobs, failedJobs, timestamp
    });


  }, {...bullQueueOptions , concurrency: 5}

  );

  worker.on('completed', (job) => {
    console.log(`Completed job ${job.id}`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job failed: ${job?.id}`, err);
  });

  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });

  worker.on('active', (job) => {
    console.log(`Job started: ${job.id}`);
  });

}

bootstrapWorker().catch(err => {
  console.error('Worker initialization failed', err);
});


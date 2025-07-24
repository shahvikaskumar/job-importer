# System Architecture Documentation

<br><br>
## Clean Architecture Layers

```text
┌──────────────────────────┐
│        Controller        │ ← Receives HTTP requests
├──────────────────────────┤
│         Service          │ ← Business logic layer
├──────────────────────────┤
│       Repository         │ ← Handles database queries
├──────────────────────────┤
│         Entity           │ ← Defines pure business models
└──────────────────────────┘
```

<br><br>
## Tech Stack

| Layer          | Technology                     |
|----------------|--------------------------------|
| Frontend       | Next.js + MUI + Axios          |
| Backend        | NestJS + BullMQ + Mongoose     |
| Database       | MongoDB Atlas or local server  |
| Queue          | Redis (BullMQ)                 |
| Deployment     | Railway / Render / Vercel      |

<br><br>
## System Workflow

1. Admin submits one or multiple RSS feed URLs via frontend.
2. Backend receives the request, parses each feed and queues a job.
3. Worker picks the job from the queue.
4. Each item in the feed is saved or updated in MongoDB.
5. Import logs are created and stored.
6. Frontend fetches and displays logs using a datagrid.

<br><br>
## Key Design Decisions

* Queue per feed: Each feed URL is processed as one job to optimize performance.
* Concurrency: Worker concurrency is configurable for scalable job handling.
* Logs: Detailed import logs with success/failure info for auditing.
* Clean Code: Follows clean architecture for maintainability and testability.

<br><br>
## Scalability

* Easily add more workers for parallel processing.
* Each module is independently testable.
* Feed processing can be horizontally scaled.


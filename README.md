# Job Importer

A full-stack application to fetch job feeds (XML), convert them to JSON, process them through a background worker using BullMQ, and display logs in a dashboard.

<br><br>
# Live Demo :- &nbsp;&nbsp;  <a href="https://job-importer-client.up.railway.app/">https://job-importer-client.up.railway.app/</a>

<br><br>
# Tech Stack

| Layer          | Technology                     |
|----------------|--------------------------------|
| Frontend       | Next.js + MUI + Axios          |
| Backend        | NestJS + BullMQ + Mongoose     |
| Database       | MongoDB Atlas or local server  |
| Queue          | Redis (BullMQ)                 |
| Deployment     | Railway / Render / Vercel      |


<br><br>
## Backend Setup (NestJS)


### 1. Navigate to backend directory
```bash
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
MONGODB_URL="<Your Mongodb URL>"
REDIS_URL="<Your Redis URL>"
PORT=5000
```

### 4. Run development server
```bash
npm run start:dev
```

### 5. Run worker process
In a separate terminal:

```bash
ts-node src/infrastructure/queue/worker.ts
```

Or run both together with:
```bash
npx concurrently "npm run start:dev" "ts-node src/infrastructure/queue/worker.ts"
```

<br><br><br>
## Frontend Setup (Next.js Admin Dashboard)

### 1. Navigate to frontend directory
```bash
cd ../client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run development server
```bash
npm run dev
```
<br><br>
## Open http://localhost:3000 in your browser.






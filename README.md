# Zapier Event Processor

> **Note**: This is an ongoing project under active development. Features and documentation are subject to change.

A distributed system for processing and managing Zapier events using Kafka and Prisma. This project consists of multiple microservices that work together to process, track, and manage Zapier webhook events.

## Features

### Zap Management
- Create, view, and manage Zaps
- Support for multiple trigger types (Webhook, Schedule, Email)
- JSON metadata validation for triggers and actions
- Enhanced error handling for invalid JSON input

### UI Components
- Modern dashboard interface
- Search functionality for triggers
- Form validation for JSON metadata
- Toast notifications for user feedback

### API Integration
- RESTful API endpoints
- WebSocket support for real-time updates
- JWT authentication

## Project Structure

- `frontend/`: Next.js frontend application with TypeScript and Tailwind CSS
- `primary_backend/`: Main backend service with REST API endpoints for managing Zaps
- `backend/`: Legacy API server (being phased out)
- `processor/`: Service that processes events from the database and publishes them to Kafka
- `outbox_processor/`: Service that consumes events from Kafka and processes them

- `primary_backend/`: Main backend service with REST API endpoints for managing Zaps
- `backend/`: Legacy API server (being phased out)
- `processor/`: Service that processes events from the database and publishes them to Kafka
- `outbox_processor/`: Service that consumes events from Kafka and processes them

## Prerequisites

- Node.js (v18 or later)
- Bun (for development)
- Docker (for running Kafka and PostgreSQL)
- Kafka (for message queuing)
- PostgreSQL (for data persistence)
- Prisma (for database management)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zapier
   ```

2. **Install dependencies for each service**
   ```bash
   # Main backend service
   cd primary_backend && bun install && cd ..
   
   # Legacy services
   cd backend && bun install && cd ..
   cd processor && bun install && cd ..
   cd outbox_processor && bun install && cd ..
   ```

3. **Set up environment variables**
   Create `.env` files in each service directory with the required environment variables.
   Example for primary_backend:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
   JWT_SECRET="your-jwt-secret"
   PORT=3001
   ```

4. **Start Docker services**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   cd primary_backend && npx prisma migrate dev && cd ..
   ```

## Running the Services

### Primary Backend (Recommended)
```bash
cd primary_backend
bun run dev
```

### Frontend
```bash
cd frontend
bun install
bun run dev
```

### Legacy Backend API
```bash
cd backend
bun run dev
```

### Event Processor
```bash
cd processor
bun run dev
```

### Outbox Processor
```bash
cd outbox_processor
bun run dev
```

## Environment Variables

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Primary Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
JWT_SECRET="your-jwt-secret"
PORT=3001
```

### Legacy Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
PORT=3008
```

### Primary Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
JWT_SECRET="your-jwt-secret"
PORT=3001
```

### Legacy Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
PORT=3008
```

### Processor
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
KAFKA_BROKERS="localhost:9092"
TOPIC_NAME="zap-topic"
```

### Outbox Processor
```env
KAFKA_BROKERS="localhost:9092"
TOPIC_NAME="zap-topic"
GROUP_ID="zapier-group"
```

## Development

- **Linting**: `bun lint`
- **Testing**: `bun test`
- **Formatting**: `bun format`

## Architecture

1. **Primary Backend Service**
   - Main REST API for managing Zaps
   - User authentication and authorization
   - Zap management (create, read, update, delete)
   - Webhook handling

2. **Legacy Backend Service**
   - Previous implementation being phased out
   - Handles webhook events
   - Implements the outbox pattern for reliable event processing

2. **Processor Service**
   - Polls the database for new events
   - Publishes events to Kafka
   - Manages the outbox pattern implementation

3. **Outbox Processor Service**
   - Consumes events from Kafka
   - Processes events asynchronously
   - Handles retries and error cases


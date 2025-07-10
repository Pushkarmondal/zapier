# Zapier Event Processor

> **Note**: This is an ongoing project under active development. Features and documentation are subject to change.

A distributed system for processing and managing Zapier events using Kafka and Prisma. This project consists of multiple microservices that work together to process, track, and manage Zapier webhook events.

## Project Structure

- `backend/`: Main API server that receives and processes webhook events
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
   cd backend && bun install && cd ..
   cd processor && bun install && cd ..
   cd outbox_processor && bun install && cd ..
   ```

3. **Set up environment variables**
   Create `.env` files in each service directory with the required environment variables.

4. **Start Docker services**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   cd backend && npx prisma migrate dev && cd ..
   ```

## Running the Services

### Backend API
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

### Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/zapier?schema=public"
PORT=3000
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

1. **Backend Service**
   - Receives webhook events from Zapier
   - Stores events in the database
   - Implements the outbox pattern for reliable event processing

2. **Processor Service**
   - Polls the database for new events
   - Publishes events to Kafka
   - Manages the outbox pattern implementation

3. **Outbox Processor Service**
   - Consumes events from Kafka
   - Processes events asynchronously
   - Handles retries and error cases


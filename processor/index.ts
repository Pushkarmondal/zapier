import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();
const TOPIC_NAME = 'zap-topics';

const kafka = new Kafka({
  clientId: 'zapier-processor',
  brokers: ['localhost:9092'],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    try {
      const pendingRows = await prisma.zapRunOutBox.findMany({
        where: {},
        take: 10,
      });

      if (pendingRows.length === 0) {
        // No data to process, sleep for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      // Send messages to Kafka
      await producer.send({
        topic: TOPIC_NAME,
        messages: pendingRows.map((r: any) => ({
          value: JSON.stringify({ zapRunId: r.zapRunId }), // wrap as JSON for structure
        })),
      });

      // Delete sent messages from DB
      await prisma.zapRunOutBox.deleteMany({
        where: {
          id: {
            in: pendingRows.map((r: any) => r.id),
          },
        },
      });

      console.log(`Processed and deleted ${pendingRows.length} rows.`);
    } catch (err) {
      console.error("❌ Error in Kafka Outbox loop:", err);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // back off on error
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

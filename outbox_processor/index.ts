import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();
const TOPIC_NAME = 'zap-topic';

const kafka = new Kafka({
  clientId: 'zapier-processor',
  brokers: ['localhost:9092'],
});

async function main() {
    const consumer = kafka.consumer({groupId: 'main-worker'});
    await consumer.connect();
    await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true});
    await consumer.run({
        eachMessage: async({topic, partition, message}) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            })
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Committed offset")

            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: message.offset,
            }])
        }
    })
}
main()
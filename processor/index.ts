import {PrismaClient} from "@prisma/client";
import {Kafka} from "kafkajs";
const prisma = new PrismaClient();

const kafka = new Kafka({
    clientId: 'zapier-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while(1) {
        const pendingRows = await prisma.zapRunOutBox.findMany({
            where: {},
            take: 10
        })
    }
}
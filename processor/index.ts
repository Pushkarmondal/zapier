import {PrismaClient} from "@prisma/client";
import {Kafka, Partitioners} from "kafkajs";
const prisma = new PrismaClient();
const TOPIC_NAME = 'zap-topic';
const kafka = new Kafka({
    clientId: 'zapier-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    await producer.connect();
    while(1) {
        const pendingRows = await prisma.zapRunOutBox.findMany({
            where: {},
            take: 10
        })
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map((r:any) => ({
                value: r.zapRunId
            }))
        })
        const deleted = await prisma.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map((r:any) => r.id)
                }
            }
        })
    }
}
main();
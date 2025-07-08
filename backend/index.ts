import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  try {
    const { userId, zapId } = req.params;
    const metadata = req.body
    const transaction = await prisma.$transaction(async (tx) => {
      const zapruns = await prisma.zapRun.create({
        data: {
          zapId,
          metadata: metadata
        },
      });
      const zaprunoutbox = await prisma.zapRunOutBox.create({
        data: {
          zapRunId: zapruns.id,
        },
      });
      return { zapruns, zaprunoutbox };
    });
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

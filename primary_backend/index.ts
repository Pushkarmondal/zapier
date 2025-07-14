import express from 'express';
import { authMiddleware } from './middleware';
import cors from 'cors';
import { createZapSchema, loginSchema, signupSchema } from './validation/types';
import  {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './validation/config';
import type { Request } from 'express';
import bcrypt from "bcryptjs";
import type { any } from 'zod';

const prisma = new PrismaClient();
const app = express();
const PORT = 3008;

app.use(express.json());
app.use(cors());

interface AuthenticatedRequest extends Request {
    id?: string;
}

app.post('/api/v1/auth/signup', async(req, res) => {
    try {
        const {name, email, password} = req.body
        const parseData = signupSchema.safeParse({name, email, password})
        if (!parseData.success) {
            return res.status(400).json({ error: parseData.error.message })
        }

        const getUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (getUser) {
            return res.status(400).json({ error: "User already exists" })
        }
        const registerUser = await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            }
        })
        return res.status(201).json(registerUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post('/api/v1/auth/login', async(req, res) => {
    try {
        const {email, password} = req.body
        const parseData = loginSchema.safeParse({email, password})
        if (!parseData.success) {
            return res.status(400).json({ error: parseData.error.message })
        }
        const getUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!getUser) {
            return res.status(400).json({ error: "User not found" })
        }
        if (!bcrypt.compareSync(password, getUser.password)) {
            return res.status(400).json({ error: "Incorrect password" })
        }
        //sign the jwt token ->
        const token = jwt.sign({
            id: getUser.id,
        }, JWT_SECRET);
        return res.status(200).json({getUser, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/api/v1/auth/getUser', authMiddleware, async(req: AuthenticatedRequest, res) => {
    try {
        const id = req.id;
            if (!id) {
            return res.status(401).json({ error: "Unauthorized" });
            }
       const getUser = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }, select: {
            name: true,
            email: true
        }
       })
       if (!getUser) {
        return res.status(400).json({ error: "User not found" })
       }
       return res.status(200).json({user: getUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post('/api/v1/zaps/create', authMiddleware, async(req: AuthenticatedRequest, res) => {
    try {
        const body = req.body;
        const parsedData = createZapSchema.safeParse(body)
        if (!parsedData.success) {
            return res.status(400).json({ error: parsedData.error.message })
        }

        const zapId = await prisma.$transaction(async(tx) => {
            const createZap  = await prisma.zap.create({
                data: {
                    userId: Number(req.id),
                    triggerId: "",
                    actions: {
                        create: parsedData.data.actions.map((x: any, index) => {
                            return {
                                actionId: x.availableActionId,
                                sortingOrder: index
                            }
                        })
                    }
                }
            })

            const trigger = await tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: createZap.id
                }
            })

            await tx.zap.update({
                where: {
                    id: createZap.id
                },
                data: {
                    triggerId: trigger.id
                }
            })
            return createZap.id;
        })
        return res.status(201).json({success: true, zapId})
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/api/v1/zaps/getAllZaps', authMiddleware, async(req: AuthenticatedRequest, res) => {
    try {
        const id = req.id;
        if (!id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const getAllZaps = await prisma.zap.findMany({
            where: {
                userId: Number(id)
            }, 
            include: {
                actions: {
                    include: {
                        type: true,
                    }
                },
                trigger: {
                    include: {
                        type: true,
                    }
                }
            }
        })
        return res.status(200).json({getAllZaps})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/api/v1/zaps/:zapId', authMiddleware, async(req: AuthenticatedRequest, res) => {
    try {
        const id = req.id;
        const zapId = req.params.zapId;
        if (!id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const getZap = await prisma.zap.findUnique({
            where: {
                id: zapId
            }, 
            include: {
                actions: {
                    include: {
                        type: true,
                    }
                },
                trigger: {
                    include: {
                        type: true,
                    }
                }
            }
        })
        console.log(getZap)
        return res.status(200).json({getZap})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
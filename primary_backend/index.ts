import express from 'express';
import { authMiddleware } from './middleware';
import cors from 'cors';
import { loginSchema, signupSchema } from './validation/types';
import  {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './validation/config';
import type { Request } from 'express';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

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
       return res.status(200).json(getUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post('/api/v1/zaps/create', authMiddleware, async(req, res) => {
    
})


app.get('/api/v1/zaps/getAllZaps', authMiddleware, async(req, res) => {
    
})

app.get('/api/v1/zaps/:zapId', authMiddleware, async(req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
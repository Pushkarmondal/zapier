import express from 'express';
import { authMiddleware } from './middleware';
import cors from 'cors';
import { signupSchema } from './validation/types';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/api/v1/auth/signup', async(req, res) => {
    try {
        const {name, email, password} = req.body
        const parseData = signupSchema.safeParse({name, email, password})
        if (!parseData.success) {
            return res.status(400).json({ error: parseData.error.message })
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post('/api/v1/auth/login', async(req, res) => {
    
})


app.get('/api/v1/auth/getUser', authMiddleware, async(req, res) => {
    
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
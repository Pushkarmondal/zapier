import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./validation/config";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    id?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.id = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
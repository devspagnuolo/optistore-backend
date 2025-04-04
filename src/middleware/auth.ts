import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'optistore-super-secreto';

export interface AuthRequest extends Request {
  userId?: string;
  userType?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; type: string };
    req.userId = decoded.id;
    req.userType = decoded.type;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, imageUrl } = req.body;
  const userId = (req as any).userId;

  const product = await prisma.product.create({
    data: { name, description, price, imageUrl, userId },
  });

  res.status(201).json(product);
};

export const getProducts = async (_: Request, res: Response) => {
  const products = await prisma.product.findMany({ include: { user: true } });
  res.json(products);
};

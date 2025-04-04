import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, imageUrl, tipoVenda } = req.body;
  const userId = (req as any).userId; // Pegando do middleware auth

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        tipoVenda,
        user: {
          connect: { id: userId }
        }
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}
import { Request, Response } from 'express';
import { PrismaClient, TipoVenda } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, tipoVenda, imageUrl } = req.body;
    const userId = (req as any).userId;

    if (!name || !description || !price || !tipoVenda) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        tipoVenda,
        imageUrl,
        userId,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ error: 'Erro interno ao criar produto.' });
  }
};
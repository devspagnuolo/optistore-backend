import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { PrismaClient, TipoVenda } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// 📦 Rota B2B – apenas fornecedores podem ver produtos B2B
router.get('/b2b', authMiddleware, async (req: AuthRequest, res) => {
  if (req.userType !== 'FORNECEDOR') {
    return res.status(403).json({ error: 'Acesso restrito a fornecedores' });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        tipoVenda: 'B2B',
      },
      include: {
        user: {
          select: {
            companyName: true,
            logoUrl: true,
          },
        },
      },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos B2B' });
  }
});

// 🛍️ Rota B2C – qualquer usuário logado pode ver
router.get('/b2c', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        tipoVenda: 'B2C',
      },
      include: {
        user: {
          select: {
            companyName: true,
            logoUrl: true,
          },
        },
      },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos B2C' });
  }
});

// 👤 Rota para listar produtos do próprio usuário logado
router.get('/meus', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos do usuário:', err);
    res.status(500).json({ error: 'Erro ao buscar seus produtos.' });
  }
});

// ➕ Rota para criar novo produto
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { name, description, price, tipoVenda, imageUrl } = req.body;

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
        userId: req.userId,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
});

export default router;
import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Rota B2B protegida (só fornecedores)
router.get('/b2b', authMiddleware, (req: AuthRequest, res) => {
  if (req.userType !== 'FORNECEDOR') {
    return res.status(403).json({ error: 'Acesso restrito a fornecedores' });
  }
  return res.json({ message: 'Produtos B2B acessados com sucesso!' });
});

// Rota B2C protegida (qualquer logado pode ver)
router.get('/b2c', authMiddleware, (req: AuthRequest, res) => {
  return res.json({ message: `Produtos B2C acessados por ${req.userType}` });
});

export default router;

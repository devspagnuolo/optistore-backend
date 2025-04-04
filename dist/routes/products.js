"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Rota B2B protegida (só fornecedores)
router.get('/b2b', auth_1.authMiddleware, (req, res) => {
    if (req.userType !== 'FORNECEDOR') {
        return res.status(403).json({ error: 'Acesso restrito a fornecedores' });
    }
    return res.json({ message: 'Produtos B2B acessados com sucesso!' });
});
// Rota B2C protegida (qualquer logado pode ver)
router.get('/b2c', auth_1.authMiddleware, (req, res) => {
    return res.json({ message: `Produtos B2C acessados por ${req.userType}` });
});
exports.default = router;

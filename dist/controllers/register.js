"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, type, cnpj, cpf, companyName, responsible, logoUrl, contactPhone } = req.body;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    type,
                    cnpj,
                    cpf,
                    companyName,
                    responsible,
                    logoUrl,
                    contactPhone
                }
            });
            return res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user.id });
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Erro ao registrar usuário' });
        }
    });
}

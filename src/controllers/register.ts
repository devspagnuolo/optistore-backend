import { PrismaClient, UserType } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { name, email, password, type, cnpj, cpf, companyName, responsible, logoUrl, contactPhone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
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
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
}

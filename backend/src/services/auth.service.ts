import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';

export class AuthService {
  static async register(name: string, email: string, password: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { id: user.id, uid: user.uid, email: user.email };
  }

  static async login(email: string, password: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken(user.uid);
    const refreshToken = generateRefreshToken(user.uid);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken, user: { id: user.id, uid: user.uid, email: user.email } };
  }

  static async refresh(refreshToken: string) {
    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = generateAccessToken(user.uid);
    return { accessToken };
  }

  static async logout(refreshToken: string) {
    if (refreshToken) {
      await prisma.user.updateMany({
        where: { refreshToken },
        data: { refreshToken: null },
      });
    }
  }
}

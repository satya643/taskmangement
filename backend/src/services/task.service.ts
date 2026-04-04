import prisma from '../config/prisma.js';
import { Status } from '@prisma/client';

export class TaskService {
  static async getTasks(userId: string, query: {
    page?: string;
    limit?: string;
    status?: string;
    search?: string;
  }) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);

    const where: any = { userId };

    if (query.status) {
      where.status = query.status as Status;
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.task.count({ where });

    return {
      tasks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async createTask(userId: string, data: {
    title: string;
    description?: string;
    dueDate?: string;
  }) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId,
      },
    });
  }

  static async updateTask(userId: string, id: string, data: {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: string;
  }) {
    return prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        status: data.status as Status,
      },
    });
  }

  static async deleteTask(userId: string, id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }

  static async toggleTask(userId: string, id: string) {
    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return prisma.task.update({
      where: { id },
      data: {
        status:
          task.status === Status.COMPLETED
            ? Status.PENDING
            : Status.COMPLETED,
      },
    });
  }
}
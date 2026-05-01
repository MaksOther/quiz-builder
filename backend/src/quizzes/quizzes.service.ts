import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface QuestionDto {
  text: string;
  type: string;
  options?: string[];
}

interface QuizDto {
  title: string;
  questions: QuestionDto[];
}

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: QuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q: QuestionDto) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      include: {
        _count: { select: { questions: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  async update(id: number, dto: QuizDto) {
    await this.prisma.question.deleteMany({ where: { quizId: id } });

    return this.prisma.quiz.update({
      where: { id },
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q: QuestionDto) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}

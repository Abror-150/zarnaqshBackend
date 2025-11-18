import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: {
        ...createMaterialDto,
      },
      include: { product: true },
    });
  }

  async findAll() {
    return this.prisma.material.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.material.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.prisma.material.update({
      where: { id },
      data: { ...updateMaterialDto },
      include: { product: true },
    });
  }

  async remove(id: string) {
    return this.prisma.material.delete({
      where: { id },
    });
  }
}

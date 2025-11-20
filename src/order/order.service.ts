import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let totalPrice = 0;

    const orderItemsData = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) throw new Error('Product topilmadi');
        if (product.amount < item.quantity)
          throw new Error(`${product.name_uz} yetarli emas`);

        totalPrice += Number(product.price) * item.quantity;

        await this.prisma.product.update({
          where: { id: product.id },
          data: { amount: product.amount - item.quantity },
        });

        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    );

    const order = await this.prisma.order.create({
      data: {
        fullName: createOrderDto.fullName,
        phone: createOrderDto.phone,
        address: createOrderDto.address,
        email: createOrderDto.email,
        oferta: createOrderDto.oferta,
        totalPrice,
        OrderItem: {
          create: orderItemsData,
        },
      },
      include: { OrderItem: { include: { Product: true } } },
    });

    const orderText = `
  🆕 <b>Yangi buyurtma!</b>
  👤 Ism: ${order.fullName}
  📞 Telefon: ${order.phone}
  📍 Manzil: ${order.address}
  💰 Narxi: ${order.totalPrice} so'm
  🧾 Buyurtma ID: ${order.id}
  
  🛍️ <b>Mahsulotlar:</b>
  ${order.OrderItem.map(
    (item) =>
      `• ${item.Product.name_uz} — ${item.quantity} dona — ${item.Product.price} so'm`,
  ).join('\n')}
  `;

    await this.telegram.sendMessage(orderText);

    return {
      message: 'Buyurtma yaratildi va Telegramga yuborildi ✅',
      data: order,
    };
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { OrderItem: true },
    });
  }

  async findOne(id: string) {
    const one = await this.prisma.order.findFirst({ where: { id } });
    if (!one) {
      throw new NotFoundException('order topilmadi');
    }
    return one;
  }

  async update(id: string, data: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }
}

import {
  Global,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'; // Default import – custom yo'l emas!
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');
    const pool = new Pool({
      connectionString: databaseUrl,
    });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma DB ga ulandi!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Prisma uzildi.');
  }
}

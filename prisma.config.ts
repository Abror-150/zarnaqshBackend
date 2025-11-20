import { defineConfig, env } from '@prisma/config';
import 'dotenv/config';
const databaseUrl = env('DATABASE_URL');
if (!databaseUrl) {
  throw new Error(
    "❌ DATABASE_URL atrof-muhit o'zgaruvchisi topilmadi! .env faylini tekshiring yoki loyihaning ildizida ekanligini ishonch hosil qiling.",
  );
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: databaseUrl,
  },
});

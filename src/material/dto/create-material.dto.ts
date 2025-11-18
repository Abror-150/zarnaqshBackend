import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    example: '146d2782-9827-48f7-b063-e5fab90ce4f4',
    description: 'Mahsulot ID (Product bilan bog‘liq)',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 'Material nomi (O‘zbek tilida)',
    description: 'Material nomi (O‘zbek tilida)',
  })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({
    example: 'Material name (English)',
    description: 'Material nomi (Ingliz tilida)',
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({
    example: 'Название материала (Русский)',
    description: 'Material nomi (Rus tilida)',
  })
  @IsString()
  @IsNotEmpty()
  name_ru: string;
}

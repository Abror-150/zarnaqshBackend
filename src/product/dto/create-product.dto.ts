import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    example: 'NameUZ',
    description: 'Mahsulot nomi (O‘zbek tilida)',
  })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({
    example: 'NameEN',
    description: 'Mahsulot nomi (Ingliz tilida)',
  })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'NameRU', description: 'Mahsulot nomi (Rus tilida)' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({
    example: 'descUZ',
    description: 'Mahsulot tavsifi (O‘zbek tilida)',
  })
  @IsString()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty({
    example: 'descEN',
    description: 'Mahsulot tavsifi (Ingliz tilida)',
  })
  @IsString()
  @IsNotEmpty()
  description_en: string;

  @ApiProperty({
    example: 'descRU',
    description: 'Mahsulot tavsifi (Rus tilida)',
  })
  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty({
    example: 50,
    description: 'Mahsulotdan omborda nechta borligi',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 129000.5, description: 'Mahsulot narxi' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Mahsulot rasmi',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}

import { Prop } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class stockInfo {
  _id: String;
  id: String;

  @ApiProperty()
  @IsString()
  name: String;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsInt()
  count: number;

  @ApiProperty()
  @IsString()
  description: String;

  @ApiProperty()
  catagory?: String[];
}

export class getAll {
  @ApiPropertyOptional()
  catagory: string;

  @ApiProperty()
  @IsNotEmpty()
  start: number;
}

export class getStockDto {
  @ApiProperty()
  data: stockInfo[];

  @ApiProperty()
  count: number;
}

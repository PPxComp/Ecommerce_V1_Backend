import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

import { ObjectId } from "mongodb";

export class stockInfo {
  _id: ObjectId;

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
  @IsString()
  start: string;
}

export class deleteDto {
  @ApiProperty()
  data: string[];
}
export class getStockDto {
  @ApiProperty()
  data: stockInfo[];

  @ApiProperty()
  count: number;
}

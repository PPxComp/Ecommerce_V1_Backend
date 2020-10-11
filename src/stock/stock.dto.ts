import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class stockInfo {
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
  img: String;

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

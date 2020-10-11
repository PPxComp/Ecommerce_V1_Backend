import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createCatDto {
  @ApiProperty()
  @IsString()
  name: string;
}

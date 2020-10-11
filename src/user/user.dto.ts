import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { isValidObjectId } from "mongoose";

export class userRegister {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class userInfo {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  refreshToken: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Mongoose } from "mongoose";

//-------------------------------------------------------------------------//
// TODO : SChema that required when user register
//-------------------------------------------------------------------------//
export class userRegister {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

//-------------------------------------------------------------------------//
// TODO : SChema that return when  request user's info
//-------------------------------------------------------------------------//
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

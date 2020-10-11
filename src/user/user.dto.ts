import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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

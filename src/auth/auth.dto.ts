import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class JwtPayload {
  @ApiProperty()
  username: string;
}

export class userLogin {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class WebappTokensDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
//      firebaseToken: await this.firebaseSerive.createToken(username),

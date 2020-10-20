import { Bucket } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
export declare class FirebaseService {
  private userService;
  bucket: Bucket;
  constructor(configService: ConfigService, userService: UserService);
  createToken(username: string): Promise<string>;
  private stockPicture;
  hasStockPicture(id: string): Promise<boolean>;
}

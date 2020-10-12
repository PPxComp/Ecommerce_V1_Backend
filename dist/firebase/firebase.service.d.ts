import { Bucket } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
export declare class FirebaseService {
  bucket: Bucket;
  constructor(configService: ConfigService);
  createToken(id: string): Promise<string>;
  private stockPicture;
  hasStockPicture(id: string): Promise<boolean>;
}

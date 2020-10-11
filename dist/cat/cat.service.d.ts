import { ConfigService } from "@nestjs/config";
export declare class CatService {
  private configService;
  constructor(configService: ConfigService);
  getName(): Promise<string>;
}

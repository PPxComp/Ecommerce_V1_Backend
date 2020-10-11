import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CatService {
  constructor(private configService: ConfigService) {}

  async getName() {
    return this.configService.get<string>("MONGO_URI");
  }
}

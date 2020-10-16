import { MeService } from "./me.service";
export declare class MeController {
  private meService;
  constructor(meService: MeService);
  getUserInfo(
    req: any
  ): Promise<{
    isAdmin: boolean;
    username: string;
    refreshToken: string;
  }>;
}

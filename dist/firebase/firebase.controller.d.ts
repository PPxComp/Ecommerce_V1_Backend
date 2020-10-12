import { FirebaseService } from "./firebase.service";
export declare class FirebaseController {
  private firebaseService;
  constructor(firebaseService: FirebaseService);
  getToken(req: any): Promise<string>;
}

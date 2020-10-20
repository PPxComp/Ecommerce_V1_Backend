import { FirebaseService } from "./firebase.service";
export declare class FirebaseController {
  private firebaseService;
  constructor(firebaseService: FirebaseService);
  CheckImage(id: string): Promise<boolean>;
}

import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { Bucket, File } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

function parseServiceAccount(jsonOrBase64: string): any {
  try {
    return JSON.parse(jsonOrBase64);
  } catch (ignored /* might be in base64 */) {
    try {
      return JSON.parse(Buffer.from(jsonOrBase64, "base64").toString("ascii"));
    } catch (e) {
      console.log("Unable to parse FIREBASE_SERVICE_ACCOUNT");
    }
  }
}

@Injectable()
export class FirebaseService {
  bucket: Bucket;
  //-------------------------------------------------------------------------//
  // TODO : Contructor
  //-------------------------------------------------------------------------//
  constructor(configService: ConfigService, private userService: UserService) {
    const serviceAccount = configService.get<string>("firebase.serviceAccount"); //path for json file
    const storageBucketName = configService.get<string>(
      "firebase.storageBucketName"
    );

    console.log("Service account path  : ", serviceAccount);
    console.log("storageBucketName  : ", storageBucketName);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${storageBucketName}.appspot.com`,
    });
    this.bucket = admin.storage().bucket();
  }

  //-------------------------------------------------------------------------//
  // TODO : To Generate Token
  //-------------------------------------------------------------------------//
  async createToken(username: string): Promise<string> {
    const user = await this.userService.findUserByUsername(username);
    let role = "user";
    if (user.isAdmin) role = "admin";
    return await admin.auth().createCustomToken(role);
  }

  //-------------------------------------------------------------------------//
  // TODO : To check is image avaliable in firebase ?
  //-------------------------------------------------------------------------//
  private stockPicture(id: string): File {
    return this.bucket.file(`img/${id}`);
  }

  async hasStockPicture(id: string): Promise<boolean> {
    const [exists] = await this.stockPicture(id).exists();
    return exists;
  }
}

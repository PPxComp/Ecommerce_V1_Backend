import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const development = configService.get<boolean>("development");

  const options = new DocumentBuilder()
    .setTitle("Swagger API")
    .setDescription("This is swagger api for Free_01")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    })
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(development ? "api/swagger" : "hidden", app, document);

  app.use(
    cors({
      origin: [
        `http://localhost:${process.env.FRONT_PORT}`,
        "https://localhost",
        "https://localhost:3000",
        "https://localhost:9000",
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  console.log("Server listening on port :", process.env.PORT);

  await app.listen(process.env.PORT);
}
bootstrap();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  const configService = app.get(config_1.ConfigService);
  const development = configService.get("development");
  const options = new swagger_1.DocumentBuilder()
    .setTitle("Swagger API")
    .setDescription("This is swagger api for Free_01")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    })
    .build();
  app.useGlobalPipes(new common_1.ValidationPipe());
  const document = swagger_1.SwaggerModule.createDocument(app, options);
  swagger_1.SwaggerModule.setup(
    development ? "api/swagger" : "hidden",
    app,
    document
  );
  app.use(cookieParser());
  console.log("Server listening on port :", process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map

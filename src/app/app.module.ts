import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "../config/database/database.module";
import { AppController } from "./app.controller";
import { ThrottleModule } from '../config/throttle/throttle.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoggerModule } from '../config/logger/logger.module';
import { LoggingMiddleware } from "src/common/middleware/logging/logging.middleware";
import { AuthModule } from "src/modules/auth/auth.module";
import { AppService } from './app.service';
import { UserModule } from "src/modules/user/user.module";
import { QrcodeModule } from "src/modules/qrcode/qrcode.module";
import { ShortenUrlModule } from "src/modules/shorten-url/shorten-url.module";
import { MongoModule } from "src/config/database/mongo.module";
import { HealthModule } from "src/modules/health/health.module";

@Module({
  imports: [
    DatabaseModule,
    MongoModule,
    ThrottleModule,
    LoggerModule,
    HealthModule,
    AuthModule,
    UserModule,
    QrcodeModule,
    ShortenUrlModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }, 
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggingMiddleware)
        .forRoutes('*');
  }
}
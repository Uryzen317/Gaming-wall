import { Module } from '@nestjs/common'; import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from './games/games.module';
import { ConfigModule } from '@nestjs/config';
import { BioModule } from './bio/bio.module';

@Module({
  imports: [    ConfigModule.forRoot({
    isGlobal : true ,
    cache : true
  }),
    UsersModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
    ),
    GamesModule,
    BioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

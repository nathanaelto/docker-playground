import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokeApiModule } from './infra/poke-api/poke-api.module';
import { FeaturesModule } from './features/features.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './infra/config/configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseConfig } from './infra/config/types/configuration.types';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PokeApiModule,
    FeaturesModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('Pokedex API', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
      ],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          DB_HOST,
          DB_PORT,
          DB_USER,
          DB_PASSWORD,
          DB_NAME,
        }: DatabaseConfig = configService.get('database');

        return {
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          host: DB_HOST,
          port: DB_PORT,
          user: DB_USER,
          password: DB_PASSWORD,
          dbName: DB_NAME,
          driver: PostgreSqlDriver,
          extensions: [Migrator],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule, OnModuleInit {
//   constructor(private readonly orm: MikroORM) {}
//
//   async onModuleInit() {
//     await this.orm.getMigrator().up();
//   }
//
//   configure(consumer: MiddlewareConsumer): any {
//     consumer.apply(MikroOrmMiddleware).forRoutes('*');
//   }
// }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import MYSQl from './mysql/mysl.config';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule,
    TypeOrmModule.forRoot(MYSQl),
  ],
})
export class AppModule { }

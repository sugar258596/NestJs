import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { jwtConstants } from './strategy/jwt.constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { LoginThrottlerMiddleware } from './middleware/login-throttler.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtModule, JwtStrategy, LocalStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginThrottlerMiddleware)
      .forRoutes('/auth/login', '/auth/register');
  }
}

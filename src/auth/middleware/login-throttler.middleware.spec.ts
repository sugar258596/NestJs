import { LoginThrottlerMiddleware } from './login-throttler.middleware';

describe('LoginThrottlerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoginThrottlerMiddleware()).toBeDefined();
  });
});

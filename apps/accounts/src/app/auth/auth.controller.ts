import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsRegister, AccountsLogin } from '@microservices/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountsRegister.topic)
  async register(
    dto: AccountsRegister.Request
  ): Promise<AccountsRegister.Response> {
    return this.authService.register(dto);
  }

  @RMQRoute(AccountsLogin.topic)
  async login(
    @Body() { email, password }: AccountsLogin.Request
  ): Promise<AccountsLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}

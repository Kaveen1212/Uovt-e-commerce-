import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.validateUser(
      userDTO.email,
      userDTO.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.signPayload({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);

    const token = await this.authService.signPayload({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

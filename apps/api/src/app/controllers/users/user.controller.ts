import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthUser, JwtAuthGuard } from '@b-task/infrastructure';
import { User } from '@b-task/persistence';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService,
    ) {}
  
    @Post('sign-up')
    async signUp(@Body() createUserDto: CreateUserDto) {
      return await this.userService.signUp(createUserDto);
    }
  
    @Get('me')
    @UseGuards(JwtAuthGuard) 
    async getMe(@AuthUser() user: User) {
      return await this.userService.getUserData(user.username);
    }
  }
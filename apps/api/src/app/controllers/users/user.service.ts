// user.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { User } from '@b-task/persistence';
import {JwtService } from '@nestjs/jwt'
import { DecryptionService } from '@b-task/infrastructure';
import { EncryptionService } from '@b-task/infrastructure';

@Injectable()
export class UserService {
  
  constructor(
    private dataSource: DataSource,
    private readonly jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const eM = new EntityManager(this.dataSource);
    const encryption = new EncryptionService()
    const { username, password } = createUserDto;

    // Validate username
    if (!/^[!@1234567890._]{5,12}$/.test(username)) {
      throw new BadRequestException('Invalid username format');
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('Invalid password format');
    }

    // Hash the password
    const hashedPassword = await encryption.encrypt(password);

    const newUser = eM.create(User,{
      username,
      password: hashedPassword,
    });

    await eM.save(User,newUser);

    const token = await this.jwtService.signAsync({ sub: newUser.id }, { expiresIn: '15m',
      secret: process.env['JWT_SECRET'],});
    
    
    return { token };
  }

  async getUserData(
    userId: string
  ): Promise<{ id: string; username: string; password: string }> {
    const eM = new EntityManager(this.dataSource);
    const decryption = new DecryptionService()
    const user = await eM.findOne(User,{ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dcryptedPassword = await decryption.decrypt(user.password);

    return {
      id: user.id,
      username: user.username,
      password: dcryptedPassword,
    };
  }
}

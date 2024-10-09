import { User } from '@b-task/persistence';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET'],
    });
  }
  async validate(payload: { sub: string; phoneNumber: string }) {
    const eM = new EntityManager(this.dataSource);
    const user = await eM.findOne(User,{
      where: {
        id: payload.sub,
      },
    });
    return user;
  }
}

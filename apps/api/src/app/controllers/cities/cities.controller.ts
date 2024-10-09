// city.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthUser, JwtAuthGuard } from '@b-task/infrastructure';
import { CityService } from './cities.service';
import { User } from '@b-task/persistence';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('my-requests')
  @UseGuards(JwtAuthGuard) // Assuming JWT Auth is being used
  async getMyRequests(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @AuthUser() user: User
  ) {
    console.log('1');
    return await this.cityService.getMyRequests(user, page, limit);
  }

  @Get(':postCode')
  @UseGuards(JwtAuthGuard) // Assuming JWT Auth is being used
  async getCityByPostCode(
    @Param('postCode') postCode: string,
    @AuthUser() userId: string
  ) {
    return await this.cityService.getCityByPostCode(postCode, userId);
  }
}

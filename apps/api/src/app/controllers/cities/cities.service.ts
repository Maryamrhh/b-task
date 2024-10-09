// city.service.ts
import { InfrastructureService } from '@b-task/infrastructure';
import { City, User } from '@b-task/persistence';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class CityService {
  constructor(private dataSource: DataSource

  ) {}

  async getCityByPostCode(postCode: string, userId: string): Promise<City> {
    const eM = new EntityManager(this.dataSource);
    const postCodeService = new InfrastructureService();
    const response = await postCodeService.getCityData(postCode);
    const city = await eM.create(City,{
      userId,
      country: response.country,
      postCode,
      places: [
        {
          placeName: response.places[0]['place name'],
          state: response.places[0]['state'],
          abbreviation: response.places[0]['state abbreviation'],
          latitude: response.places[0]['latitude'],
          longitude: response.places[0]['longitude'],
        },
      ],
      countryAbbreviation: response['country abbreviation'],
    });
    await eM.save(City,city);

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return response;
  }

  async getMyRequests(user: User, page: number, limit: number) {
    const eM = new EntityManager(this.dataSource);

    const [results, total] = await eM.findAndCount(City,{
      where: { userId: user.id },
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log(results)


    const newResult = results.map((city) => {
      return {
        postCode: city.postCode,
        country: city.country,
        places: {
          placeName: city.places[0].placeName,
          state: city.places[0].state,
          abbreviation: city.places[0].abbreviation,
        },
      };
    });


    return {
      data: newResult,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}

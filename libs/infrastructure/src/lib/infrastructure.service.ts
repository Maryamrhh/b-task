import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class InfrastructureService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.zippopotam.us/us';
  }

  async getCityData(postCode: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/${postCode}`
      );
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Failed to fetch data', HttpStatus.BAD_REQUEST);
    }
  }
}

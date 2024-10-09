import { IsNotEmpty } from 'class-validator';

export class CityRequestDto {
    @IsNotEmpty()
    postCode!: string;
}
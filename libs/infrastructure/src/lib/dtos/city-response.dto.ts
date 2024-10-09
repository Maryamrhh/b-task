import { CityData } from "../interfaces/city-data.interface";

export class CityResponseDto {
    postCode!: string;
    country!: string;
    countryAbbreviation!: string;

    places: Array<{
        placeName: string;
        state: string;
        stateAbbreviation: string;
        latitude: string;
        longitude: string;
    }>;

    constructor(data: CityData) {
        this.postCode = data.postCode;
        this.places = data.places;
        this.country = data.country;
        this.countryAbbreviation = data.countryAbbreviation;
    }
}
export interface CityData {
    postCode: string;
    country: string;
    countryAbbreviation: string;
    places: Array<{
        placeName: string;
        state: string;
        stateAbbreviation: string;
        latitude: string;
        longitude: string;
    }>;
}
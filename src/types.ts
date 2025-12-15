export interface BaseCountryData {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
}

export interface Country extends BaseCountryData {
  flag: string;
}
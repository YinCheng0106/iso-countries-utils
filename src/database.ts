import type { Country } from "./types";
import { rawCountries } from "./raw-data";
import { getFlagEmoji } from "./utils";

export const countries: Country[] = rawCountries.map((data) => ({
  ...data,
  flag: getFlagEmoji(data.alpha2),
}));
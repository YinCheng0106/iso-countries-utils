import { countries } from "./database";
import type { Country } from "./types";

const alpha2Map = new Map<string, Country>();
const alpha3Map = new Map<string, Country>();
const numericMap = new Map<string, Country>();
const searchIndex = countries.map((country) => ({
  original: country,
  lowerName: country.name.toLowerCase(),
}));

countries.forEach((country) => {
  alpha2Map.set(country.alpha2, country);
  alpha3Map.set(country.alpha3, country);
  numericMap.set(country.numeric, country);
});

/**
 * Retrieve country data using its ISO 3166-1 Alpha-2 code.
 * @param alpha2 - ISO Alpha-2 code (e.g., "TW")
 * @returns The corresponding country object or undefined if not found.
 * @example
 * import { getCountryByAlpha2 } from "i18n-country";
 *
 * const country = getCountryByAlpha2("TW");
 * console.log(country?.flag); // "🇹🇼"
 */
export function getCountryByAlpha2(alpha2: string): Country | undefined {
  return alpha2Map.get(alpha2.toUpperCase());
}

/**
 * Retrieve country data using its ISO 3166-1 Alpha-3 code.
 * @param alpha3 - ISO Alpha-3 code (e.g., "TWN")
 * @returns The corresponding country object or undefined if not found.
 * @example
 * import { getCountryByAlpha3 } from "i18n-country";
 *
 * const country = getCountryByAlpha3("TWN");
 * console.log(country?.flag); // "🇹🇼"
 */
export function getCountryByAlpha3(alpha3: string): Country | undefined {
  return alpha3Map.get(alpha3.toUpperCase());
}

/**
 * Retrieve country data using its ISO 3166-1 numeric code.
 * @param numeric - ISO numeric code (e.g., "158" or "840")
 * @returns The corresponding country object or undefined if not found.
 * @example
 * import { getCountryByNumeric } from "i18n-country";
 *
 * const country = getCountryByNumeric("158");
 * console.log(country?.flag); // "🇹🇼"
 */
export function getCountryByNumeric(numeric: string): Country | undefined {
  return numericMap.get(numeric);
}

/**
 * Retrieve the emoji flag using ISO 3166-1 Alpha-2 code.
 * @param alpha2 - ISO Alpha-2 code (e.g., "TW")
 * @returns The corresponding emoji flag or undefined if not found.
 * @example
 * import { getEmojiByAlpha2 } from "i18n-country";
 *
 * const emoji = getEmojiByAlpha2("TW");
 * console.log(emoji); // "🇹🇼"
 */
export function getEmojiByAlpha2(alpha2: string): string | undefined {
  const country = getCountryByAlpha2(alpha2);
  return country?.flag;
}

/**
 * Retrieve the emoji flag using ISO 3166-1 Alpha-3 code.
 * @param alpha3 - ISO Alpha-3 code (e.g., "TWN")
 * @returns The corresponding emoji flag or undefined if not found.
 * @example
 * import { getEmojiByAlpha3 } from "i18n-country";
 *
 * const emoji = getEmojiByAlpha3("TWN");
 * console.log(emoji); // "🇹🇼"
 */
export function getEmojiByAlpha3(alpha3: string): string | undefined {
  const country = getCountryByAlpha3(alpha3);
  return country?.flag;
}

/**
 * Retrieve country data using its ISO 3166-1 numeric code.
 * @param numeric - ISO numeric code (e.g., "158" or "840")
 * @returns The corresponding emoji flag or undefined if not found.
 * @example
 * import { getEmojiByNumeric } from "i18n-country";
 *
 * const emoji = getEmojiByNumeric("158");
 * console.log(emoji); // "🇹🇼"
 */
export function getEmojiByNumeric(numeric: string): string | undefined {
  const country = getCountryByNumeric(numeric);
  return country?.flag;
}

/**
 * Retrieve country data using its name.
 * @param name - Country name (e.g., "Taiwan")
 * @returns The corresponding country object or undefined if not found.
 * @example
 * import { getCountryByName } from "i18n-country";
 *
 * const countryData = getCountryByName("Taiwan");
 * console.log(countryData?.flag); // "🇹🇼"
 */
export function getCountryByName(name: string): Country | undefined {
  if (!name) return undefined;
  return countries.find(
    (country) => country.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Search countries by name, returning all matches that contain the query string.
 * @param name - Partial or full country name to search for (e.g., "land")
 * @returns An array of matching country objects.
 * @example
 * import { searchByName } from "i18n-country";
 *
 * const results = searchByName("land");
 * results.forEach(country => console.log(country.name, country.flag));
 */
export function searchByName(name: string): Country[] {
  if (!name) return [];
  const query = name.toLowerCase();
  return searchIndex
    .filter((item) => item.lowerName.includes(query))
    .sort((a, b) => {
      const indexA = a.lowerName.indexOf(query);
      const indexB = b.lowerName.indexOf(query);
      if (indexA === indexB) {
        return a.lowerName.length - b.lowerName.length;
      }
      return indexA - indexB;
    })
    .map((item) => item.original);
}

/**
 * Validate if a given ISO 3166-1 Alpha-2 code exists.
 * @param code - ISO Alpha-2 code to validate (e.g., "US")
 * @returns True if the code is valid, false otherwise.
 * @example
 * import { isValidAlpha2 } from "i18n-country";
 * console.log(isValidAlpha2("US")); // true
 * console.log(isValidAlpha2("XX")); // false
 */
export function isValidAlpha2(code: string): boolean {
  return alpha2Map.has(code.toUpperCase());
}

/**
 * Validate if a given ISO 3166-1 Alpha-3 code exists.
 * @param code - ISO Alpha-3 code to validate (e.g., "USA")
 * @returns True if the code is valid, false otherwise.
 * @example
 * import { isValidAlpha3 } from "i18n-country";
 * console.log(isValidAlpha3("USA")); // true
 * console.log(isValidAlpha3("XXX")); // false
 */
export function isValidAlpha3(code: string): boolean {
  return alpha3Map.has(code.toUpperCase());
}

export { countries };
export type { Country };

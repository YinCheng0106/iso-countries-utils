import { describe, expect, it } from "bun:test";
import {
  getCountryByAlpha2,
  getCountryByAlpha3,
  getEmojiByAlpha2,
  getEmojiByAlpha3,
  getCountryByName,
  searchByName,
  isValidAlpha2,
  isValidAlpha3,
  countries,
} from "../index";

describe("i18n-country-flag Library Tests", () => {
  describe("getCountryByAlpha2()", () => {
    it("should retrieve country data for a valid Alpha-2 code (TW)", () => {
      const result = getCountryByAlpha2("TW");
      expect(result).toBeDefined();
      expect(result?.name).toBe("Taiwan");
      expect(result?.alpha3).toBe("TWN");
    });

    it("should be case-insensitive (tw)", () => {
      const result = getCountryByAlpha2("tw");
      expect(result).toBeDefined();
      expect(result?.alpha2).toBe("TW");
    });

    it("should return undefined for an invalid code (XX)", () => {
      const result = getCountryByAlpha2("XX");
      expect(result).toBeUndefined();
    });
  });

  describe("getCountryByAlpha3()", () => {
    it("should retrieve country data for a valid Alpha-3 code (USA)", () => {
      const result = getCountryByAlpha3("USA");
      expect(result).toBeDefined();
      expect(result?.name).toBe("United States of America");
    });

    it("should be case-insensitive (usa)", () => {
      const result = getCountryByAlpha3("usa");
      expect(result).toBeDefined();
      expect(result?.alpha3).toBe("USA");
    });

    it("should return undefined for an invalid code (XYZ)", () => {
      const result = getCountryByAlpha3("XYZ");
      expect(result).toBeUndefined();
    });
  });

  describe("Emoji Getters", () => {
    it("should retrieve the correct flag emoji using Alpha-2 (TW -> 🇹🇼)", () => {
      const emoji = getEmojiByAlpha2("TW");
      expect(emoji).toBe("🇹🇼");
    });

    it("should retrieve the correct flag emoji using Alpha-3 (USA -> 🇺🇸)", () => {
      const emoji = getEmojiByAlpha3("USA");
      expect(emoji).toBe("🇺🇸");
    });

    it("should return undefined when flag is not found", () => {
      expect(getEmojiByAlpha2("ZZ")).toBeUndefined();
    });
  });

  describe("getCountryByName()", () => {
    it("should retrieve country data by exact name", () => {
      const result = getCountryByName("Japan");
      expect(result).toBeDefined();
      expect(result?.alpha2).toBe("JP");
    });
    it("should handle case differences if implemented", () => {
      // Only if you updated the function to use toLowerCase()
      // const result = getCountryByName("japan");
      // expect(result?.alpha2).toBe("JP");
    });

    it("should return undefined for non-existent names", () => {
      const result = getCountryByName("Atlantis");
      expect(result).toBeUndefined();
    });
  });

  describe("searchByName()", () => {
    it("should return matches containing the query string", () => {
      const results = searchByName("land");
      expect(results.length).toBeGreaterThan(0);
      const hasPoland = results.some((c) => c.name === "Poland");
      expect(hasPoland).toBe(true);
    });

    it("should be case-insensitive", () => {
      const results = searchByName("TAIWAN");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].alpha2).toBe("TW");
    });

    it("should return an empty array if no match found", () => {
      const results = searchByName("Atlantis");
      expect(results).toEqual([]);
      expect(results.length).toBe(0);
    });

    it("should return empty array for empty input", () => {
      const results = searchByName("");
      expect(results.length).toBe(0);
    });
  });

  describe("Validators", () => {
    it("isValidAlpha2 should return true for valid codes", () => {
      expect(isValidAlpha2("TW")).toBe(true);
      expect(isValidAlpha2("us")).toBe(true);
    });

    it("isValidAlpha2 should return false for invalid codes", () => {
      expect(isValidAlpha2("ZZ")).toBe(false);
    });

    it("isValidAlpha3 should return true for valid codes", () => {
      expect(isValidAlpha3("TWN")).toBe(true);
    });

    it("isValidAlpha3 should return false for invalid codes", () => {
      expect(isValidAlpha3("XXY")).toBe(false);
    });
  });

  describe("Data Integrity", () => {
    it("should export a countries array", () => {
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
    });
  });
});

# iso-countries-utils

A lightweight, zero‑dependency, and type‑safe utility library for converting ISO 3166‑1 country codes (Alpha‑2, Alpha‑3, Numeric) and flag emoji. Built for high performance with fuzzy search and validation out of the box.

![License](https://img.shields.io/npm/l/iso-countries-utils)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Size](https://img.shields.io/bundlephobia/min/iso-countries-utils)
![Version](https://img.shields.io/npm/v/iso-countries-utils)

## Features

- **Zero dependencies**: Extremely lightweight with no extra baggage.
- **Type‑safe**: Written in TypeScript with complete `.d.ts` definitions.
- **Full ISO 3166‑1 support**: Supports **Alpha‑2** (e.g. `TW`), **Alpha‑3** (e.g. `TWN`), and **Numeric** (e.g. `158`).
- **Fuzzy search**: Find countries by partial name (e.g. searching "land" returns Finland, Iceland, etc.) with weighted ranking.
- **High performance**: O(1) lookups using `Map`-based indexes.
- **Cross‑platform**: Works in Node.js, Bun, Deno, and modern browsers.

## Installation

Using npm:

```bash
npm install iso-countries-utils
```

Using yarn:

```bash
yarn add iso-countries-utils
```

Using pnpm:

```bash
pnpm add iso-countries-utils
```

Using bun:

```bash
bun add iso-countries-utils
```

## Usage

### 1. Get Country Data

Lookup by Alpha‑2, Alpha‑3, or Numeric codes (case‑insensitive).

```typescript
import {
  getCountryByAlpha2,
  getCountryByAlpha3,
  getCountryByNumeric,
} from "iso-countries-utils";

// Alpha-2 (ISO 3166-1 alpha-2)
const tw = getCountryByAlpha2("TW");
console.log(tw);
/* Output:
{
	name: "Taiwan",
	alpha2: "TW",
	alpha3: "TWN",
	numeric: "158",
	flag: "🇹🇼"
}
*/

// Alpha-3 (ISO 3166-1 alpha-3)
const usa = getCountryByAlpha3("USA");
console.log(usa?.flag); // "🇺🇸"

// Numeric (ISO 3166-1 numeric) — pass as string
const japan = getCountryByNumeric("392");
console.log(japan?.name); // "Japan"
```

### 2. Get Flag Emoji Only

If you only need the emoji, these helpers are convenient:

```typescript
import {
  getEmojiByAlpha2,
  getEmojiByAlpha3,
  getEmojiByNumeric,
} from "iso-countries-utils";

console.log(getEmojiByAlpha2("GB")); // "🇬🇧"
console.log(getEmojiByAlpha3("FRA")); // "🇫🇷"
console.log(getEmojiByNumeric("158")); // "🇹🇼"
```

### 3. Name Search and Fuzzy Query

Supports exact and fuzzy search. Fuzzy results are ranked by relevance (match position and name length).

```typescript
import { getCountryByName, searchByName } from "iso-countries-utils";

// Exact match (case-insensitive)
const result = getCountryByName("Taiwan");
console.log(result?.alpha2); // "TW"

// Fuzzy search
// For example, searching "Korea" returns both South and North Korea
const results = searchByName("Korea");
results.forEach((c) => console.log(c.name, c.flag));
// Output:
// South Korea 🇰🇷
// North Korea 🇰🇵
```

### 4. Code Validation

Handy for form validation and data cleaning. Checks whether the code is a valid ISO code.

```typescript
import { isValidAlpha2, isValidAlpha3 } from "iso-countries-utils";

console.log(isValidAlpha2("TW")); // true
console.log(isValidAlpha2("XX")); // false

console.log(isValidAlpha3("USA")); // true
```

## API Reference

### Data Interface

All returned country objects follow this interface:

```typescript
interface Country {
  name: string; // English name (e.g. "Taiwan")
  alpha2: string; // 2-letter code (e.g. "TW")
  alpha3: string; // 3-letter code (e.g. "TWN")
  numeric: string; // numeric code (e.g. "158")
  flag: string; // flag emoji (e.g. "🇹🇼")
}
```

### Functions

| Function                    | Returns     | Description                                  |
| --------------------------- | ----------- | -------------------------------------------- |
| `getCountryByAlpha2(alpha2)`  | `Country`   | Get country by 2-letter code                 |
| `getCountryByAlpha3(alpha3)`  | `Country`   | Get country by 3-letter code                 |
| `getCountryByNumeric(numeric)` | `Country`   | Get country by 3-digit numeric code (string) |
| `getEmojiByAlpha2(alpha2)`    | `string`    | Get flag emoji by 2-letter code              |
| `getEmojiByAlpha3(alpha3)`    | `string`    | Get flag emoji by 3-letter code              |
| `getEmojiByNumeric(numeric)`   | `string`    | Get flag emoji by numeric code               |
| `getCountryByName(name)`    | `Country`   | Exact match by name (case-insensitive)       |
| `searchByName(query)`       | `Country[]` | Fuzzy search for country names (ranked)      |
| `isValidAlpha2(alpha2)`       | `boolean`   | Validate Alpha‑2 code                        |
| `isValidAlpha3(alpha3)`       | `boolean`   | Validate Alpha‑3 code                        |
## Tech Stack

- **Runtime**: Node.js / Bun
- **Language**: TypeScript
- **Testing**: Bun Test

## License

MIT License © [YinCheng0106](https://github.com/YinCheng0106)

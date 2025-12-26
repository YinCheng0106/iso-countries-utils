# iso-countries-utils

一個輕量級、零依賴且型別安全的工具庫，用於轉換 ISO 3166-1 國家代碼（Alpha-2, Alpha-3, Numeric）與國旗 Emoji。專為高效能設計，並內建模糊搜尋與驗證功能。

![License](https://img.shields.io/npm/l/iso-countries-utils)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Version](https://img.shields.io/npm/v/iso-countries-utils)

[English](./README.md) | 繁體中文

## 特色

- **零依賴 (Zero Dependencies)**：極致輕量，不增加專案負擔。
- **型別安全 (Type-Safe)**：完全使用 **TypeScript** 撰寫，內含完整的型別定義檔 (`.d.ts`)。
- **完整 ISO 3166-1 支援**：支援 **Alpha-2** (如 `TW`)、**Alpha-3** (如 `TWN`) 與 **數字代碼** (如 `158`)。
- **模糊搜尋 (Fuzzy Search)**：支援透過國家名稱片段搜尋（例如搜尋 "land" 可找到 Finland, Iceland 等），並具備權重排序功能。
- **高效能 (High Performance)**：使用 `Map` 建立索引，代碼查找速度為 O(1)。
- **全平台支援**：適用於 Node.js, Bun, Deno 以及現代瀏覽器。

## 安裝

使用 npm:

```bash
npm install iso-countries-utils
```

使用 yarn:

```bash
yarn add iso-countries-utils
```

使用 pnpm:

```bash
pnpm add iso-countries-utils
```

使用 bun:

```bash
bun add iso-countries-utils
```

## 使用方式

### 1\. 獲取國家完整資訊 (Get Country Data)

支援透過 Alpha-2、Alpha-3 或數字代碼（Numeric）查找。大小寫不敏感。

```typescript
import {
  getCountryByAlpha2,
  getCountryByAlpha3,
  getCountryByNumeric,
} from "iso-countries-utils";

// 使用 Alpha-2 (ISO 3166-1 alpha-2)
const tw = getCountryByAlpha2("TW");
console.log(tw);
/* 輸出:
{
  name: "Taiwan",
  alpha2: "TW",
  alpha3: "TWN",
  numeric: "158",
  flag: "🇹🇼"
}
*/

// 使用 Alpha-3 (ISO 3166-1 alpha-3)
const usa = getCountryByAlpha3("USA");
console.log(usa?.flag); // "🇺🇸"

// 使用 數字代碼 (ISO 3166-1 numeric) - 請傳入字串
const japan = getCountryByNumeric("392");
console.log(japan?.name); // "Japan"
```

### 2\. 僅獲取國旗 Emoji (Get Flag Emoji Only)

如果你只需要國旗圖示，使用這些函式會更方便。

```typescript
import {
  getEmojiByAlpha2,
  getEmojiByAlpha3,
  getEmojiByNumeric,
} from "iso-country-utils";

console.log(getEmojiByAlpha2("GB")); // "🇬🇧"
console.log(getEmojiByAlpha3("FRA")); // "🇫🇷"
console.log(getEmojiByNumeric("158")); // "🇹🇼"
```

### 3\. 名稱搜尋與模糊查詢 (Search)

支援精確搜尋與模糊搜尋。模糊搜尋會自動根據匹配位置與名稱長度排序，將最相關的結果排在前面。

```typescript
import { getCountryByName, searchByName } from "iso-country-utils";

// 精確搜尋 (Exact Match) - 大小寫不敏感
const result = getCountryByName("Taiwan");
console.log(result?.alpha2); // "TW"

// 模糊搜尋 (Fuzzy Search)
// 例如搜尋 "korea" 會找到 南韓與北韓
const results = searchByName("Korea");
results.forEach((c) => console.log(c.name, c.flag));
// 輸出:
// South Korea 🇰🇷
// North Korea 🇰🇵
```

### 4\. 代碼驗證 (Validation)

用於表單驗證或資料清洗，檢查代碼是否為有效的 ISO 標準代碼。

```typescript
import { isValidAlpha2, isValidAlpha3 } from "iso-country-utils";

console.log(isValidAlpha2("TW")); // true
console.log(isValidAlpha2("XX")); // false

console.log(isValidAlpha3("USA")); // true
```

## API 文件 (API Reference)

### 資料介面 (Data Interface)

所有回傳的國家物件皆符合以下介面：

```typescript
interface Country {
  name: string; // 英文名稱 (e.g. "Taiwan")
  alpha2: string; // 2碼代碼 (e.g. "TW")
  alpha3: string; // 3碼代碼 (e.g. "TWN")
  numeric: string; // 數字代碼 (e.g. "158")
  flag: string; // Emoji 國旗 (e.g. "🇹🇼")
}
```

### 函式列表

| 函式名稱                    | 回傳值      | 描述                            |
| --------------------------- | ----------- | -------------------------------|
| `getCountryByAlpha2(alpha2)`  | `Country`   | 透過 2 碼代碼取得國家資訊         |
| `getCountryByAlpha3(alpha3)`  | `Country`   | 透過 3 碼代碼取得國家資訊         |
| `getCountryByNumeric(numeric)` | `Country`   | 透過 3 位數字代碼字串取得國家資訊 |
| `getEmojiByAlpha2(alpha2)`    | `string`    | 僅取得國旗 Emoji (透過 2 碼)      |
| `getEmojiByAlpha3(alpha3)`    | `string`    | 僅取得國旗 Emoji (透過 3 碼)      |
| `getEmojiByNumeric(numeric)`   | `string`    | 僅取得國旗 Emoji (透過數字碼)     |
| `getCountryByName(name)`    | `Country`   | 透過名稱精確查找 (不分大小寫)     |
| `searchByName(query)`       | `Country[]` | 模糊搜尋國家名稱 (依關聯度排序) |
| `isValidAlpha2(alpha2)`       | `boolean`   | 驗證是否為有效的 Alpha-2 代碼   |
| `isValidAlpha3(alpha3)`       | `boolean`   | 驗證是否為有效的 Alpha-3 代碼   |

## 技術堆疊

- **Runtime**: Node.js / Bun
- **Language**: TypeScript
- **Testing**: Bun Test

## 授權

MIT License © [YinCheng0106](https://github.com/YinCheng0106)

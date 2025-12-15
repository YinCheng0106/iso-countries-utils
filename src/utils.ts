export function getFlagEmoji(alpha2: string): string {
  const codePoint = alpha2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoint);
}

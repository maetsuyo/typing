const conversionMap: Record<string, string[]> = {
  "く": ["ku", "cu"],
  "こ": ["ko", "co"],
  "し": ["shi", "si"],
  "ち": ["chi", "ti"],
  "つ": ["tsu", "tu"],
  "ふ": ["fu", "hu"],
  "ん": ["n", "nn"],
};

export function generateVariations(kana: string): string[] {
  if (kana.length === 0) return [""];

  const first = kana[0];
  const restVariations = generateVariations(kana.slice(1));

  if (conversionMap[first]) {
    return conversionMap[first].flatMap((romaji) =>
      restVariations.map((suffix) => romaji + suffix)
    );
  }

  return restVariations.map((suffix) => first + suffix);
}

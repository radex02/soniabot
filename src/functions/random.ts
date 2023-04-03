export const shuffle = (source: any[]): any[] =>
  source
    .map((value) => ({ value: value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const pickOne = (source: any[]): any =>
  source[Math.floor(Math.random() * source.length)];

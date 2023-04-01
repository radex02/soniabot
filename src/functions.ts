import { decode } from "html-entities";

export const shuffle = (source: any[]): any[] =>
  source
    .map((value) => ({ value: value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const pickOne = (source: any[]): any =>
  source[Math.floor(Math.random() * source.length)];

export const sanitize = (source: string): string =>
  decode(source).replaceAll(/\*\|_~`>/g, (char) => "\\" + char);

export const fixMath = (source: string | number): string =>
  source
    .toString()
    .replaceAll(
      /(cos|sin|log|ln|tan|acos|asin|atan)([\d.xy]+)/gi,
      (match, op, x) => `${op}(${x})`
    );

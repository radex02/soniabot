export const fixMath = (source: string | number): string =>
  source
    .toString()
    .replaceAll(
      /(cos|sin|log|ln|tan|acos|asin|atan)([\d.xy]+)/gi,
      (match, op, x) => `${op}(${x})`
    );

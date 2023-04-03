import { decode } from "html-entities";

export const sanitize = (source: string): string =>
  decode(source).replaceAll(/\*\|_~`>/g, (char) => "\\" + char);

export const makeInclusive = (source: string): string =>
  source.replaceAll(/ (he|him|his|she|her)([ '])/gi, (match, word, sep) => {
    const isCap = ["H", "S"].includes(word.charAt(0));
    switch (word.toUpperCase()) {
      case "HE":
      case "SHE":
        return ` ${isCap ? "H" : "h"}e/she${sep}`;
      case "HIM":
      case "HER":
        return ` ${isCap ? "H" : "h"}im/her${sep}`;
      case "HIS":
        return ` ${isCap ? "H" : "h"}is/her${sep}`;
      default:
        return match;
    }
  });

export const parseUserIds = (source: string): string =>
  source.replaceAll(/\d{17,19}/g, (id) => `<@${id}>`);

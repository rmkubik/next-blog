// https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
const slugify = (string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "gu");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/gu, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/gu, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/gu, "") // Remove all non-word characters
    .replace(/--+/gu, "-") // Replace multiple - with single -
    .replace(/^-+/u, "") // Trim - from start of text
    .replace(/-+$/u, ""); // Trim - from end of text
};

const randIntBetween = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

const randomString = (length) => {
  return new Array(length)
    .fill()
    .map(() => {
      const randChar = randIntBetween(65, 90);

      return String.fromCharCode(randChar);
    })
    .join("");
};

/**
 * This function will discard the time component of the provided
 * date and then convert it to the provided time zone. This can be used to
 * persist the year/month/day components of a Date in a new time zone.
 *
 *
 * ex.
 * Without this function:
 * new Date('2021-07-09T00:00:00.000Z') would convert to
 * Thu Jul 08 2021 17:00:00 GMT-0700 (Pacific Daylight Time).
 *
 * Note that we've ended with a July 8th date, instead of the 9th.
 *
 *
 * With this function:
 * forceDateToTimeZone(new Date('2021-07-09T00:00:00.000Z'), 'PST') you get
 * Fri Jul 09 2021 01:00:00 GMT-0700 (Pacific Daylight Time).
 *
 * Note that both dates read July 9th now.
 */
const forceDateToTimeZone = (date, timeZone) => {
  const [isoDate, isoTime] = date.toISOString().split("T");

  return new Date(`${isoDate} ${timeZone}`);
};

export { slugify, randIntBetween, randomString, forceDateToTimeZone };

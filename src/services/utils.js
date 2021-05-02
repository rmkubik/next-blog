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

export { slugify, randIntBetween, randomString };

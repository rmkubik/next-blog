const spanifyElementContents = (element, className) => {
  /**
   * Credit for this regex from wmacfarl's platformize.js
   * https://github.com/wmacfarl/web-platformer/blob/main/platformize.js#LL175C1-L176C1
   * https://wmacfarl.itch.io/eggjam17
   */
  // eslint-disable-next-line no-param-reassign
  element.innerHTML = element.innerHTML.replace(
    // eslint-disable-next-line security/detect-unsafe-regex
    /(?<!(<\/?[^>]*|&[^;]*))([^\s<]+)/gu,
    `$1<span class="${className}">$2</span>`
  );
};

export default spanifyElementContents;

const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encodedStr = "";
  let counter = 1;
  for (let i = 1; i <= str.length; i++) {
    if (str[i] !== str[i - 1] || i === str.length) {
      encodedStr += (counter === 1 ? "" : counter) + str[i - 1];
      counter = 1;
    } else {
      counter++;
    }
  }
  return encodedStr;
}

module.exports = {
  encodeLine,
};

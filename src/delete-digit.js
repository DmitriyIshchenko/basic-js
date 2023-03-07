const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const nums = [];
  const strNum = n.toString();

  for (let i in strNum) {
    const arr = strNum.split("");
    arr[i] = "";
    nums.push(arr.join(""));
  }

  return Math.max(...nums);
}

module.exports = {
  deleteDigit,
};

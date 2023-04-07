const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    let result = 0;

    // if array go deeper
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        // update in case of [[[[[[[[[[]]]]]]]]], 1,[2,[]], ]
        result = Math.max(result, this.calculateDepth(item));
      });
      result++; // count wrapper array
    }
    return result;
  }
}

module.exports = {
  DepthCalculator,
};

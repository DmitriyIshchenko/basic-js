const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  // throw new NotImplementedError("Not implemented");
  // remove line with error and write your code here
  if (!Array.isArray(arr))
    throw new Error("'arr' parameter must be an instance of the Array!");

  const result = [];
  const controls = {
    "--discard-next": () => i++,
    "--discard-prev": () => {
      // edge case:  this element was previously deleted
      if (arr[i - 2] === "--discard-next") return;
      result.pop();
    },
    "--double-next": () => {
      if (i === arr.length - 1) return;
      result.push(arr[i + 1]);
    },
    "--double-prev": () => {
      // edge case: first elem or  this element was previously deleted
      if (i === 0 || arr[i - 2] === "--discard-next") return;
      result.push(arr[i - 1]);
    },
  };

  let i; // only works if i is defined here
  for (i = 0; i < arr.length; i++) {
    if (controls.hasOwnProperty(arr[i])) {
      controls[arr[i]]();
      continue;
    }
    result.push(arr[i]);
  }

  return result;
}

module.exports = {
  transform,
};

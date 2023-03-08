const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(value === undefined ? "" : value);
    return this;
  },
  removeLink(position) {
    if (position % 1 !== 0 || position <= 0 || position > this.chain.length) {
      this.chain.length = 0;
      throw new Error("You can't remove incorrect link!");
    }
    this.chain.splice(position - 1, 1); // chain is 1-based
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const result = this.chain.map((value) => `( ${value} )`).join("~~");
    this.chain.length = 0;
    return result;
  },
};

module.exports = {
  chainMaker,
};

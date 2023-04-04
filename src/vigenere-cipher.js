const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.table = this._generateTable();
    this.isDirect = isDirect;
  }
  _generateTable() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((item, index, arr) => [
      ...arr.slice(index, arr.length),
      ...arr.slice(0, index),
    ]);
  }
  _getKeyString(str, key) {
    let keyStr = "";
    let index = 0;
    for (let ch of str) {
      if (!this.table[0].includes(ch)) keyStr += ch;
      else {
        keyStr += key[index % key.length];
        index++;
      }
    }
    return keyStr;
  }
  encrypt(message, key) {
    if (message === undefined || key === undefined)
      throw new Error("Incorrect arguments!");

    message = message.toUpperCase();
    key = key.toUpperCase();
    const keyStr = this._getKeyString(message, key);
    let result = "";

    [...message].forEach((char, index) => {
      if (!this.table[0].includes(char)) {
        result += char; // skip the non-letters
      } else {
        const column = this.table[0].indexOf(char);
        const row = this.table[0].indexOf(keyStr[index]);
        result += this.table[row][column]; // intersection of message and keyword char
      }
    });

    return this.isDirect ? result : result.split("").reverse().join("");
  }
  decrypt(encryptedMessage, key) {
    if (encryptedMessage === undefined || key === undefined)
      throw new Error("Incorrect arguments!");

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    const keyStr = this._getKeyString(encryptedMessage, key);
    let result = "";

    [...keyStr].forEach((char, index) => {
      if (!this.table[0].includes(char)) {
        result += char; // skip the non-letters
      } else {
        const row = this.table[0].indexOf(char); // find row of keyword char
        const column = this.table[row].indexOf(encryptedMessage[index]); // find message char in that row
        result += this.table[0][column]; // column is the original char
      }
    });

    return this.isDirect ? result : result.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};

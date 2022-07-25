/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Assembler": () => (/* binding */ Assembler)
/* harmony export */ });
/* eslint-disable no-dupe-keys */


class Assembler {
  constructor() {
    this.memAddress = 0;
    this.labels = {};
  }

  getMemAddress() {
    return this.memAddress;
  }
  setMemAddress(value) {
    this.memAddress = value;
  }
  incrementMemAddress(byValue = 1) {
    this.memAddress += byValue;
  }

  getLabel(key) {
    return this.labels[key];
  }

  setLabel(key, value) {
    this.labels[key] = value;
  }

  assemble(code) {
    this.setMemAddress(0);
    code = code.replace(/:/g, "\n");
    let lines = code.split('\n').filter(line => line.trim()); //filter out empty lines
    let finalCode = "v2.0 raw\n";

    lines.forEach(line => {
      line = line.split(/;|#/)[0];
      line = line.trim();
      if (line.length === 0) return;  // skip lines with only comments

      let [opCode, operand, data] = line.split(/, |,| |:/).map(line => {
        line = line.replace("(", "");
        line = line.replace(")", "");
        return line;
      });

      let firstChar = Assembler.hex(InstructionMap[opCode], "end");
      // this.incrementMemAddress();
      let restOfString = this.makeOperand(opCode, operand, data);
      //console.log(restOfString,"\n");

      if (operand === undefined && data === undefined) return;

      if (restOfString !== undefined && restOfString.length === 1) {  // one byte
        finalCode += firstChar[0] + restOfString + " ";
        this.incrementMemAddress();
      }
      else {
        if (restOfString !== undefined && firstChar !== undefined) {  // two bytes
          finalCode += firstChar[0] + restOfString[0] + restOfString.substring(restOfString.indexOf(" ")) + " ";
          this.incrementMemAddress(2);
        }
        else if (opCode === "JMP") { // two bytes, JMP
          finalCode += firstChar[0] + "0 " + Assembler.hex(this.getLabel(operand)) + " ";
          this.incrementMemAddress(2);
        }
        else {  // two bytes, JNE, JEQ...
          finalCode += firstChar[0]+(operand[1]*4).toString(16)+ " " + Assembler.hex(this.getLabel(data)) + " ";
          // added the second bit to jump opcode for example jne - 9 and R3 - c ==> 9c
          this.incrementMemAddress(2);
        }
      }
      //console.log(restOfString," ",restOfString.substring(restOfString.indexOf(" ")));

    });

    return finalCode.slice(0,-1);   // remove last appended space
  }

  makeOperand(opCode, operand, data) {
    // this.incrementMemAddress();
    if (data !== undefined && data[0] == 'R') {
      return (((operand[1]) & 0b11) << 2 | ((((data[1]) & 0b11) << 0) & 0xff)).toString(16);
    }
    else {
      if (!isNaN(parseInt(data))) {
        return (operand[1] * 4).toString(16) + ' ' + data.slice(-2);
      }
      else {
        // this.incrementMemAddress(-1);
        if (data === undefined)
          this.setLabel(opCode, this.getMemAddress());
        else
          this.setLabel(opCode, this.getMemAddress());
          //at this section the label is the opcode not the data
      }

    }

  }

  /**
   * Converts DEC to HEX
   * @param {Number} value Value to convert
   * @param {String} pad Text padding. Default "start"
   */
  static hex(value, pad = "start") {
    if (value !== undefined) return pad === "start" ? value.toString(16).padStart(2, '0') : value.toString(16).padEnd(2, '0');
  }
}

const InstructionMap = {
  "AND": 0x00,
  "OR": 0x01,
  "ADD": 0x02,
  "SUB": 0x03,
  "LW": 0x04,
  "SW": 0x05,
  "MOV": 0x06,
  "INP": 0x07,
  "JEQ": 0x08,
  "JNE": 0x09,
  "JGT": 0xa,
  "JLT": 0xb,
  "LW": 0xc,
  "SW": 0xd,
  "LI": 0xe,
  "JMP": 0xf,
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
// Assembler import
const assembler_js_1 = __webpack_require__(2);
const assembler = new assembler_js_1.Assembler();
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("sapicpu-assembler.assemble", () => {
        let editorText = "";
        let output = "Copy your assembled code from here (including 'v2.o raw'): \n";
        if (vscode.window.activeTextEditor?.document.getText()) {
            editorText = vscode.window.activeTextEditor?.document.getText();
        }
        output = output.concat(assembler.assemble(editorText));
        vscode.window.showInformationMessage(output);
        vscode.window.createTerminal("Assembler");
        vscode.window.onDidOpenTerminal((terminal) => {
            console.log(output);
        });
    }));
}
exports.activate = activate;
// eslint-disable-next-line @typescript-eslint/no-empty-function
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pong__ = __webpack_require__(1);


window.onload = function() {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  new __WEBPACK_IMPORTED_MODULE_0__pong__["a" /* default */](canvas, context);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paddle__ = __webpack_require__(3);



class Pong {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.canvasContext = context;
    this.fps = 30;

    const { width, height } = this.canvas;
    this.balls = [
      new __WEBPACK_IMPORTED_MODULE_0__ball__["a" /* default */](canvas, context),
    ];

    this.paddles = [
      new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */](canvas, context),
      new __WEBPACK_IMPORTED_MODULE_1__paddle__["a" /* default */](canvas, context, 'right'),
    ];

    setInterval(() => {         
      this.collisions();
      this.draw();

    }, 1000/this.fps);
  }

  collisions() {
    const { width, height } = this.canvas;

    this.balls.forEach(ball => {
      const ballRight = ball.x + ball.radius;
      this.paddles.forEach(paddle => {
        let hit =  (paddle.side === 'left') 
          ? (ball.x <= paddle.x + paddle.width)
          : ball.x + ball.radius >= paddle.x;

        if (hit && (ball.y >= paddle.y && ball.y <= paddle.y + paddle.height)) {
          ball.xVelocity *= -1;
        }
      });

      if (ball.x <= 0) {
        this.score(ball);
      }

      if (ballRight >= width) {
        this.score(ball);
      }
    });
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, width, height);

    this.balls.forEach(_e => _e.draw());
    this.paddles.forEach(_e => _e.draw());
  }

  score(ball) {
    ball.resetPosition();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Pong);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.canvasContext = context;

    const { width, height } = this.canvas;

    // Set init position
    this.radius = 5;
    this.resetPosition();
  }

  resetPosition() {
    const { width, height } = this.canvas;

    const randomize = (min, max) => {
      const genInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const direction = genInRange(0, 1);
      const val = genInRange(min, max);

      return direction 
        ? -val
        : val;
    };

    this.x = (width - this.radius)/2;
    this.y = (height - this.radius)/2;
    this.xVelocity = randomize(8, 11);
    this.yVelocity = randomize(1, 10);
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.beginPath();
    this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.canvasContext.fill();

    if (this.y >= (height - (this.radius*2)) || this.y <= 0) {
      this.yVelocity *= -1;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Paddle {
  constructor(canvas, context, side = 'left') {
    this.canvas = canvas;
    this.canvasContext = context;
    this.side = side;
    this.height = 100;
    this.width = 5;
    this.yVelocity = 30;
    this.KEY_CODES =  {
      left: { 87: -this.yVelocity, 83: this.yVelocity },
      right: { 38: -this.yVelocity, 40: this.yVelocity },
    }

    const { width, height } = this.canvas;

    this.resetPosition();
    this.addEventListeners();
  }

  resetPosition() {
    const { width, height } = this.canvas;

    this.x = this.side === 'left'
      ? 10
      : width - (10 + this.width);

    this.y = (height - this.height)/2;
  }

  mouseMove(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const root = document.documentElement;

    return { 
      x: evt.clientX - rect.left - root.scrollLeft, 
      y: evt.clientY - rect.top - root.scrollTop, 
    }
  }

  addEventListeners() {
    const { height } = this.canvas;

    //if (this.side === 'left') { return; }

    // this.canvas.addEventListener('mousemove', (evt) => {
    //   const { x, y } = this.mouseMove(evt);
    //   this.y = y - (this.height/2);

    //   if (this.y < 0) {
    //        this.y = 0;
    //   }

    //   if (this.y + this.height > height) {
    //     this.y = height - this.height;
    //   }
    // });

    document.addEventListener('keydown', (event) => {
      const codes = this.KEY_CODES[this.side];
      const e = codes[event.keyCode];

      if (e) {
        this.y += e;

        if (this.y < 0) {
          this.y = 0;
        }

        if (this.y + this.height > height) {
          this.y = height - this.height;
        }
      }
    });
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Paddle);

/***/ })
/******/ ]);
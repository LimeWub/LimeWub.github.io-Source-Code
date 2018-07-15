//==================================================================================================
//	Dependencies
//==================================================================================================
import Ball from "./shapes/Ball";
import Rectangle from "./shapes/Rectangle";
import Pointer from "./Pointer";


/**
 * Animating particle canvas with click/touch functionality
 * @constructor
 * @param {HTMLObject} element - The canvas element.
 * @param {Object} options - The options object used by the canvas (TODO: How do I declare these better?)
 *
 * @property {Object} ctx - The canvas context
 *  shapes
 * @property {HTMLElement} element - The canvas element passed into the canvas constructor.
 * @property {Object} options - The options passed into the constructor.
 * @property {Pointer} pointer - Instance of the pointer from the canvas' view.
 */
class Canvas {
  constructor(element, options = {}) {
    // Default options
    const defaultOptions = {
      colours: ["rgba( 0, 0, 0, 1)"],
      shapes: {
        ball: {
          count: 50,
          colours: ["#eee", "#777", "#333"]
        },
        rectangle: {
          count: 50,
          colours: ["#777", "#fff"]
        }
      }
    }
    // Merge options with defaults
    options = Object.assign(defaultOptions, options);
    

    // Set properties
    this.element = element;
    this.options = options;
    this.colour = this.options.colours[Math.floor(Math.random() * this.options.colours.length)]
    this.pointer = new Pointer;
    this.isTapped = false;
    this.ctx = this.element.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    this.init();
    

    return this;
  }

  /**
   * Initialize the canvas.
   * @memberof Canvas
   */
  init() {
    this.size();
    this.fill(this.colour);
    this.initShapes();
    this.attachEvents();
    requestAnimationFrame(() => this.redraw());
  };

  /**
   * Set the size of the canvas.
   * @memberof Canvas
   */
  size() {
    this.width = this.element.width = window.innerWidth;
    this.height = this.element.height = window.innerHeight;
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  };

  /**
   * Function to handle canvas re-initialisation based
   * on whether the window has been stretched.
   * @memberof Canvas
   */
  resize() {
    // Do I want any breakpoints here?
    // Only trigger events if canvas size is now bigger than it were
    if (this.width >= window.innerWidth && this.height >= window.innerHeight) {
      return;
    }
    this.init();
  };

  /**
   * Fills the canvas with a colour.
   * @memberof Canvas
   */
  fill(colour) {
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  /**
   * Handles and calls the animation redraw loop.
   * @memberof Canvas
   */
  redraw() {
    this.fill(this.colour);
    this.shapes.forEach(function (shape) {
      shape.update();
      shape.draw();
    });
    requestAnimationFrame(() => this.redraw());
  };


  /**
   * Initialises the canvas shapes.
   * @memberof Canvas
   */
  initShapes() {
    this.shapes = [];

    //Balls
    for (let i = 0; i < this.options.shapes.ball.count; i++) {
      const ball = new Ball(this);
      ball.draw();
      this.shapes.push(ball);
    }

    //Rectangles
    for (let i = 0; i < this.options.shapes.rectangle.count; i++) {
      const rectangle = new Rectangle(this);
      rectangle.draw();
      this.shapes.push(rectangle);
    }
  }

  /**
   * Pushes shapes around the canvas based
   * on the pointer location.
   * @memberof Canvas
   */
  pushShapes(e) {
    const pointer = this.pointer;

    this.pointer.updateCoords(e);
    let nearbyShapes = this.pointer.nearbyShapes(this);
    nearbyShapes.forEach((shape) => {
      // Set new shape direction to opposite of pointer
      shape.direction = Math.atan2(shape.y - this.pointer.y, shape.x - this.pointer.x) * 180 / Math.PI;
      shape.step = 6;
      shape.draw();
    });
  };

  /**
   * Attaches events to the canvas
   * object.
   * @memberof Canvas
   */
  attachEvents() {

    const element = this;

    const tapStart =
      "ontouchstart" in window || navigator.msMaxTouchPoints
        ? "touchstart"
        : "mousedown";
    const tapMove =
      "ontouchstart" in window || navigator.msMaxTouchPoints
        ? "touchmove"
        : "mousemove";
    const tapEnd =
      "ontouchstart" in window || navigator.msMaxTouchPoints
        ? "touchend"
        : "mouseup";

    document.addEventListener(
      tapStart,
      function (e) {
        element.isTapped = true;
        element.pushShapes(e);
      },
      false
    );

    document.addEventListener(
      tapMove,
      function (e) {
        if (!element.isTapped) return;
        element.pushShapes(e);
      },
      false
    );

    document.addEventListener(
      tapEnd,
      function (e) {
        element.isTapped = false;
      },
      false
    );


    window.addEventListener(
      "resize",
      function () {
        element.resize();
      },
      false
    );
  }
}


export { Canvas as default }

//==================================================================================================
//	Dependencies
//==================================================================================================
import Ball from "./shapes/Ball";
import Rectangle from "./shapes/Rectangle";
import Pointer from "./Pointer";
import { min } from "../../../../node_modules/moment";


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
    // TODO: This is not working as object assign doesn't seem to work 
    // with nested properties (deep merging).
    options = Object.assign(defaultOptions, options);
    

    // Set properties
    this.element = element;
    this.options = options;
    this.colour = this.options.colours[Math.floor(Math.random() * this.options.colours.length)]
    this.pointer = new Pointer;

    this.init();
    
    requestAnimationFrame(() => this.redraw());

    return this;
  }

  /**
   * Initialize the canvas.
   * @memberof Canvas
   */
  init() {
    this.isTapped = false;
    this.ctx = this.element.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.size();
    this.fill(this.colour);
    this.initShapes();
    this.attachEvents();
  };

  /**
   * Set the size of the canvas.
   * @memberof Canvas
   */
  size() {
    this.width = this.element.width = window.innerWidth;
    this.height = this.element.height = window.innerHeight;
  };

  /**
   * Function to handle canvas re-initialisation based
   * on whether the window has been stretched.
   * @memberof Canvas
   */
  resize() {
    // Only trigger resize if canvas size is now bigger than it were
    if (this.width >= window.innerWidth && this.height >= window.innerHeight) {
      return;
    }

    this.options.shapes.rectangle.count
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

    let ballsToDraw = this.options.shapes.ball.count;
    let rectanglesToDraw = this.options.shapes.rectangle.count;

    // Breakpoints!
    // Limit ball/rectangles drawn as needed on smaller 
    // screens to assist with performance bottlenecks
    if ( window.innerWidth < 600) { // Mobile
      ballsToDraw = Math.min(ballsToDraw, 15);
      rectanglesToDraw = Math.min(rectanglesToDraw, 15);
    } if ( window.innerWidth < 960) { // Tablet
      ballsToDraw = Math.min(ballsToDraw, 30);
      rectanglesToDraw = Math.min(rectanglesToDraw, 30);
    }

    //Balls
    for (let i = 0; i < ballsToDraw; i++) {
      const ball = new Ball(this);
      ball.draw();
      this.shapes.push(ball);
    }

    //Rectangles
    for (let i = 0; i < rectanglesToDraw; i++) {
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
    
    //this.element.addEventListener( // Doesn't work due to z-index
    window.addEventListener(
      tapStart,
      function (e) {
        element.isTapped = true;
        element.pushShapes(e);
      },
      false
    );

    window.addEventListener(
      tapMove,
      function (e) {
        if (!element.isTapped) return;
        element.pushShapes(e);
      },
      false
    );

    window.addEventListener(
      tapEnd,
      function () {
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

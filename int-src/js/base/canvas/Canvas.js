//==================================================================================================
//
//	Canvas element w/ animating particle shapes
//
//==================================================================================================


//==================================================================================================
//	Dependencies
//==================================================================================================
import Ball from "./shapes/Ball";
import Rectangle from "./shapes/Rectangle";
import Pointer from "./Pointer";


//==================================================================================================
//	Constructor
//==================================================================================================

class Canvas {
  constructor(element, options) {
 
    this.element = element;
    this.options = options; // Default options??
    this.pointer = new Pointer;

    this.init();

    return this;
  }

  init() {
    this.ctx = this.element.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.isTapped = false;
    this.size();
    this.fill(this.options.canvasColour);
    this.initShapes();
    this.attachEvents();
    requestAnimationFrame(() => this.redraw());
  };


  size() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.element.style.width = window.innerWidth + "px";
    this.element.style.height = window.innerHeight + "px";
  };

  resize() {
    // Do I want any breakpoints here?
    // Only trigger events if canvas size is now bigger than it were
    if (this.width >= window.innerWidth && this.height >= window.innerHeight) {
      return;
    }
    this.init();
  };

  fill(colour) {
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  redraw() {
    this.fill(this.options.canvasColour);
    this.shapes.forEach(function (shape) {
      shape.update();
      shape.draw();
    });
    requestAnimationFrame(() => this.redraw());
  };



  initShapes() {
    this.shapes = [];

    //Balls
    for (let i = 0; i < 70; i++) {
      let ballOptions = {};
      ballOptions.colour = this.options.ballColours[Math.floor(Math.random() * this.options.ballColours.length)]
      const ball = new Ball(this, ballOptions);
      ball.draw();
      this.shapes.push(ball);
    }

    //Rectangles
    for (let i = 0; i < 50; i++) {
      let rectangleOptions = {};
      rectangleOptions.colour = this.options.rectColours[Math.floor(Math.random() * this.options.rectColours.length)];
      const rect = new Rectangle(this, rectangleOptions); 
      rect.draw();
      this.shapes.push(rect);
    }
  }


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


  //==================================================================================================
  //	Events
  //==================================================================================================
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

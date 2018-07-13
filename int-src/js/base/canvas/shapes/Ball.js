//==================================================================================================
//	Dependencies
//==================================================================================================
import Shape from "./Shape";

class Ball extends Shape {
    constructor(canvas, options) {
      super(canvas);

      this.options = options;

      this.lineWidth = 6;
  
      this.draw = function() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        canvas.ctx.lineWidth = this.lineWidth;
        canvas.ctx.fillStyle = this.options.colour;
        canvas.ctx.fill();
      };
      return this;
    }
  }

  export { Ball as default }
//==================================================================================================
//	Dependencies
//==================================================================================================
import Shape from "./Shape";

class Ball extends Shape {
    constructor(canvas) {
      super(canvas);

      this.lineWidth = 6;
      this.colour = canvas.options.shapes.ball.colours[
                      Math.floor(Math.random() * canvas.options.shapes.ball.colours.length)
                    ];
  
      this.draw = function() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        canvas.ctx.lineWidth = this.lineWidth;
        canvas.ctx.fillStyle = this.colour;
        canvas.ctx.fill();
      };
      return this;
    }
  }

  export { Ball as default }
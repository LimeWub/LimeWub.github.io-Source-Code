//==================================================================================================
//	Dependencies
//==================================================================================================
import Shape from "./Shape";


class Rectangle extends Shape {
    constructor(canvas) {
      super(canvas);

      this.lineWidth = 6;
      this.colour = canvas.options.shapes.rectangle.colours[
                      Math.floor(Math.random() * canvas.options.shapes.rectangle.colours.length)
                    ];
      this.deg = Math.random() * 180; // Rotation
  
      this.draw = function() {
        canvas.ctx.save(); // Saves the coordinate system
  
        canvas.ctx.translate(this.x, this.y); // Move canvas to where we want our shape to be drawn
        canvas.ctx.rotate(this.deg); // Rotate around the start point of the line
  
        canvas.ctx.beginPath();
        canvas.ctx.rect(0, 0, this.r / 3, this.r);
        canvas.ctx.lineWidth = this.lineWidth;
        canvas.ctx.fillStyle = this.colour;
        canvas.ctx.fill();
  
        canvas.ctx.restore(); // Restores the coordinate system back to (0,0)
      };
      return this;
    }
  
    update() {
      super.update();
      if (this.canvas.x < this.x) {
        this.deg += this.step/this._step * 0.005;
      } else if (this.canvas.pointer.x >= this.x) {
        this.deg -= this.step/this._step * 0.005;
      }
    }
  }

  export { Rectangle as default }
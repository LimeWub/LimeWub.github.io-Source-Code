//==================================================================================================
//	Shapes
//==================================================================================================
class Shape {
    constructor(canvas) {
        this.canvas = canvas;

        this.x = Math.floor(Math.random() * this.canvas.width); //random
        this.y = Math.floor(Math.random() * this.canvas.height); //random
        this.r = Math.floor(10 + 5 * Math.random());
        this._step = this.step = 0.2 + Math.random();
        this.direction = 360 * Math.random(); // Move to a random direction

        return this;
    }

    update() {

        // Move (x,y) based on the direction
        let angleRad = this.direction * (Math.PI / 180); //angle in radians
        this.x = this.x + this.step * Math.cos(angleRad);
        this.y = this.y + this.step * Math.sin(angleRad);

        // Slow down step (if accelerated) to match original _step
        if (this._step < this.step) {
            this.step -= this._step / this.step * 0.1;
        }

        // If a shape reaches the end of the canvas move it to the other side
        if (this.y + this.r <= 0) {
            // Top -> Bottom
            this.y = Math.ceil(this.canvas.height) + this.r;
            this.x = this.x - this.r;
        } else if (this.x - this.r >= this.canvas.width) {
            // Right -> Left
            this.x = 0 - this.r;
            this.y = this.y - this.r;
        } else if (this.y - this.r >= this.canvas.height) {
            // Bottom -> Top
            this.y = 0 - this.r;
            this.x = this.x - this.r;
        } else if (this.x + this.r <= 0) {
            // Left -> Right
            this.x = Math.ceil(this.canvas.width) + this.r;
            this.y = this.y - this.r;
        }
    }
}

export { Shape as default }
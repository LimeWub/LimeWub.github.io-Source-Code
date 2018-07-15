//==================================================================================================
//	Constructor
//==================================================================================================
class Pointer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.r = 100; // Diameter of the tap

        return this;
    }

    nearbyShapes(canvas) {
        return canvas.shapes.filter((shape) => {
            let xLowerRange = this.x - this.r;
            let xHigherRange = this.x + this.r;
            let yLowerRange = this.y - this.r;
            let yHigherRange = this.y + this.r;
            if (
                shape.x > xLowerRange &&
                shape.x < xHigherRange &&
                shape.y > yLowerRange &&
                shape.y < yHigherRange
            ) {
                return true;
            }
        });
    };

    updateCoords(e) {
        this.x = (e.clientX || e.clientX === 0) ? e.clientX : e.touches[0].clientX;
        this.y = (e.clientY || e.clientY === 0) ? e.clientY : e.touches[0].clientY;
    };
}
export { Pointer as default }
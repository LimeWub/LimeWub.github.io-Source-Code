//==================================================================================================
//	Dependencies
//==================================================================================================
import Canvas from "../base/canvas/Canvas";

//==================================================================================================
//	Canvas (Particles)
//==================================================================================================
/**
 * Implementation of Canvas functionality.
 * @function initParticlesCanvas
 * @ignore
 */
document.addEventListener("DOMContentLoaded", function initParticlesCanvas() {

    const canvasElement = document.querySelector(".particles");

    // If the element exists
    if (canvasElement){

        // Set the options
        const canvasOptions = {
            colours: ["rgba(58,51,53, 1)"], //#3a3335
            shapes: {
                ball: {
                    count: 50,
                    colours: ["#00b2d6", "#D5035E", "#F9E814"]
                },
                rectangle:  {
                    count: 50,
                    colours: ["#00b2d6", "#FFFFFF"]
                }
            }
        }

        // Create the canvas
        const canvas = new Canvas(canvasElement, canvasOptions);
    }

});
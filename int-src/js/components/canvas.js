//==================================================================================================
//	Dependencies
//==================================================================================================
import Canvas from "../base/canvas/Canvas";


//==================================================================================================
//	Settings
//==================================================================================================
const canvasElement = document.querySelector(".particles");

const canvasOptions = {
    colours: ["rgba(58,51,53, 1)"], //#3a3335
    shapes: {
        ball: {
            count: 70,
            colours: ["#00b2d6", "#D5035E", "#F9E814"]
        },
        rectangle:  {
            count: 50,
            colours: ["#00b2d6", "#FFFFFF"]
        }
    }
}


const canvas = new Canvas(canvasElement, canvasOptions);
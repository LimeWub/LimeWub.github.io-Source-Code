//==================================================================================================
//	Dependencies
//==================================================================================================
import Canvas from "../base/canvas/Canvas";


//==================================================================================================
//	Settings
//==================================================================================================
const canvasElement = document.querySelector(".particles");

const canvasOptions = {}
canvasOptions.canvasColour = "rgba(58,51,53, 1)"; //#3a3335
canvasOptions.ballColours = ["#00b2d6", "#D5035E", "#F9E814"];
canvasOptions.rectColours = ["#00b2d6", "#FFFFFF"];

const canvas = new Canvas(canvasElement, canvasOptions);
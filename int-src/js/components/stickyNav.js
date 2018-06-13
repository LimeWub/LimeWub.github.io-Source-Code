//==================================================================================================
//	Sticky Nav Init
//==================================================================================================
/**
 * @function initStickyNav
 * @ignore
 */
document.addEventListener("DOMContentLoaded", function initStickyNav() {

    // Get stickyNav element
    const stickNavElement = document.querySelector("[data-sticky-nav]");

    // Get stickNavSpacerElement spacer element
    const stickNavSpacerElement = document.querySelector("[data-sticky-nav-spacer]");

    // If found
    if (stickNavElement) {
        window.addEventListener("scroll", function () {

            // Get stickNavElement offset
            offset = stickNavSpacerElement.offsetTop;

            // Get stickNavElement height
            height = stickNavElement.clientHeight;

            // When stickNavElement of the item is reached add sticky class to nav
            if ( offset + height < window.pageYOffset) { 
                stickNavElement.classList.add("nav--sticky"); 
                
            } else {
                stickNavElement.classList.remove("nav--sticky");
            }
             
        }, false);


        if (stickNavSpacerElement) {

            let onLoadScrollAndResize = function () {
                
                if (stickNavElement.classList.contains("nav--sticky")) {
                    stickNavSpacerElement.style.height = height+'px';
                } else {
                    stickNavSpacerElement.style.height ='0px';
                }

            };
    
            window.addEventListener("resize", onLoadScrollAndResize, false);
            window.addEventListener("load", onLoadScrollAndResize, false);
            window.addEventListener("scroll", onLoadScrollAndResize, false);
        }
    }

});
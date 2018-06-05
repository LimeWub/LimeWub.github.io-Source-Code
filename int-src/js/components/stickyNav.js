//==================================================================================================
//	Sticky Nav Init
//==================================================================================================
/**
 * @function initStickyNav
 * @ignore
 */
document.addEventListener("DOMContentLoaded", function initStickyNav() {

    // Get stickyNav element
    const stickNavElement = document.querySelector("[data-sticky-nav]")

    // If found
    if (stickNavElement) {


        window.addEventListener("scroll", function () {

            // Get stickNavElement offset
            offset = stickNavElement.offsetTop;

            // Get stickNavElement height
            height = stickNavElement.clientHeight;

            // When stickNavElement of the item is reached add sticky class to nav
            if ((offset + height/2) < window.pageYOffset) {
                stickNavElement.classList.add("nav--sticky");
            } else {
                stickNavElement.classList.remove("nav--sticky");
            }
            
        }, false);

    }

});
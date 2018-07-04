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

    // If found
    if (stickNavElement) {

        stickNavElement.fixed = function(newOffset = window.pageYOffset) {

            this.classList.remove("nav--sticky");

            // Get stickNavElement offset
            let offset = this.getBoundingClientRect().top + window.scrollY;


            // When stickNavElement of the item is reached add sticky class to nav
            if ( offset <= newOffset) {
                stickNavElement.classList.add("nav--sticky");  
                return true; 
            }

            return false;
        }

        window.addEventListener("load", function () {
            stickNavElement.fixed()
        }, false); 

        window.addEventListener("resize", function () {
            stickNavElement.fixed()
        }, false); 

        window.addEventListener("scroll", function () {
            stickNavElement.fixed()
        }, false);

    }

});
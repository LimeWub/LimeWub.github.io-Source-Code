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

        // Get stickNavElement offset
        offset = stickNavElement.offsetTop;

        window.addEventListener("scroll", function () {
            // When offset is reached add sticky class to nav
            if (offset < window.pageYOffset) {
                stickNavElement.classList.add("nav--sticky");
            } else {
                stickNavElement.classList.remove("nav--sticky");
            }
        }, false);

    }

});
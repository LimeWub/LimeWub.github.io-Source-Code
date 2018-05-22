//==================================================================================================
//	Dependencies
//==================================================================================================
import anime from "animejs";
//==================================================================================================
//
//	Scroll To Element
//
//==================================================================================================
let scrollObject;
//==================================================================================================
// Private Functions
//==================================================================================================
/**
 * Function to remove the bound window events
 * @function
 * @ignore
 * @param {function} callback - the callback set against the window
 */
function removeEvents() {
    // Remove the events
    window.removeEventListener("touch", handleInteruption, false);
    window.removeEventListener("mousewheel", handleInteruption, false);
    window.removeEventListener("mousedown", handleInteruption, false);
}

/**
 * Function to attach a desired callback to the window
 * @function
 * @ignore
 * @param {function} callback - the callback set against the window
 */
function attachEvents() {
    // Remove the events
    window.addEventListener("touch", handleInteruption, false);
    window.addEventListener("mousewheel", handleInteruption, false);
    window.addEventListener("mousedown", handleInteruption, false);
}

/**
 * Function to handle the user interuptions
 * @function
 * @ignore
 * @param {Array} args - Array containing the bound anime instance and element
 */
function handleInteruption() {

    // Cancel animation on element
    anime.remove(scrollObject);

    removeEvents();

}

//==================================================================================================
//	Scroll To Element Function
//==================================================================================================
/**
 * Scroll To Element Function
 * @function
 * @ignore
 * @param {HTMLElement} element - Element to scroll to
 */
export const scrollToElement = function (element) {

    // Check element is valid
    if (typeof (element) !== "object") {
        console.warn("Warning, Non DOM element passed to scrollToElement");
        return false;
    }

    // Calculate position of element in the DOM
    const elementPosition = element.getBoundingClientRect();

    // Calculate window scroll offset
    /*
        Set to animate object rather than div to allow multiple properties to be
        animated at once. Should allow for X / multiple elements movement in the future
        if required.
    */
    scrollObject = {
        y: window.pageYOffset
    };

    // Calculate target scroll Position
    const target = (elementPosition.top + scrollObject.y);

    // Animate and scroll to the element
    const animate = anime({
        targets: scrollObject,
        y: target,
        duration: 1000,
        easing: 'easeInOutCubic',
        update: function () {
            // Update window scroll position
            window.scroll(0, scrollObject.y);
        },
        complete: function () {
            // Remove interuptions events
            removeEvents();
        }

    });

    // Atatch events to handle user interuptions
    attachEvents();

};
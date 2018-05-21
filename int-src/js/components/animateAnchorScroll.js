//==================================================================================================
//	Dependencies
//==================================================================================================
import { scrollToElement } from "../base/scrollToElement";

//==================================================================================================
//	Private Functions
//==================================================================================================
function returnElement(identifier) {
    // Lookup the element
    let element = document.querySelector(identifier);

    // Check if result is not valid
    if (element === null || element === undefined) {
        return false;
    }

    // Return Element
    return element;

}

//==================================================================================================
//
//	Scroll To Element Implementation
//
//==================================================================================================
document.addEventListener("DOMContentLoaded", function initScrollToElement() {
    // Query Select scroll to element
    const anchorScrollToElements = Array.prototype.slice.call(
        document.querySelectorAll("[data-animate-anchor-scroll]")
    );

    // If elements exist
    if (anchorScrollToElements.length > 0) {
        


        // Loop through elements
        anchorScrollToElements.forEach(function (currentItem) {

            // Add click event to the element
            currentItem.addEventListener("click", function (event) {
                // Prevent default
                event.preventDefault();
                
                // Get the href attibute value
                const target = currentItem.getAttribute("href");

                //Don't lose the anchor
                window.history.replaceState(null, null, target);

                // Retrieve the target element
                const targetElement = returnElement(target);

                // If target is returned
                if (targetElement !== false) {

                    // Is there a sticky nav on this page?
                    const stickyNav = document.querySelector("[data-sticky-nav]");
                    if (stickyNav) {

                        // If there is, account for it in the scroll
                        let offsetY= stickyNav.offsetHeight;
                        scrollToElement(targetElement,offsetY);
                    } else {
                        scrollToElement(targetElement);
                    }

                }

            });
        });
    }
});
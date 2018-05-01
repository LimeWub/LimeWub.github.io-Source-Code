//==================================================================================================
//	Dependencies
//==================================================================================================
import ToggleView from "../base/ToggleView";

//==================================================================================================
//	Accordion Init
//==================================================================================================
/**
 * Implementation of ToggleView functionality on the Accordion. Produces an accessible Accordion.
 * On DOMReady initialises all the Accordion open/close functionality.
 * @function initAccordions
 * @ignore
 */
document.addEventListener("DOMContentLoaded", function initAccordions() {


    // Get all accordion triggers on the page
    const accordionTriggerElements =  Array.prototype.slice.call(
        document.querySelectorAll("[data-accordion] button")
    );
    // If there are accordion triggers
    if(accordionTriggerElements.length > 0){

        // Loop through them
        accordionTriggerElements.forEach(function(accordionTriggerElement, index) {

            // Set up the accordion functionality
            const accordion = new ToggleView(accordionTriggerElement);

            // Toggle views to hidden or not, based on data attribute
            if (accordion.view.hasAttribute("data-accordion-expanded")) {

                // Open default open accordions
                accordion.hidden = false;

            } else {

                // Close all other accordions
                accordion.hidden = true;

            }

            // Accordion's toggle event
            accordion.trigger.addEventListener("click", function accordionToggle(event) {

                // Prevent Default Click behaviour
                event.preventDefault();

                // Toggle the accordion
                accordion.toggle();
            });

        });
    }

});
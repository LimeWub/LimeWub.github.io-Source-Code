//==================================================================================================
//	Dependencies
//==================================================================================================
import AccordionGroup from '../base/AccordionGroup';

//==================================================================================================
//	Accordion Group
//==================================================================================================
/**
 * Implementation of AccordionGroup functionality. Initialises an accessible accordion group list.
 * @function initAccordionGroups
 * @ignore
 */
document.addEventListener("DOMContentLoaded", function initAccordionGroups() {


    //Accordion Groups
    // Select all accordionGroups
    const accordionGroupElements = Array.prototype.slice.call(
        document.querySelectorAll("[data-accordion-group]")
    );

    // If elements exist
    if (accordionGroupElements.length > 0) {

        // Loop through accordion groups
        accordionGroupElements.forEach(function(accordionGroupElement) {

            // Get all accordion triggers inside the group
            const accordionTriggerElements = Array.prototype.slice.call(
                accordionGroupElement.querySelectorAll("[data-accordion-trigger]")
            );

            // If there are accordion triggers
            if(accordionTriggerElements.length > 0){

                // Loop through accordions
                accordionTriggerElements.forEach(function(accordionTriggerElement, index) {

                    // Set the position attribute on the trigger button for the group navigation accessibility
                    accordionTriggerElement.setAttribute("data-accordion-position", index);
                });

                // Init AccordionGroup
                new AccordionGroup(accordionGroupElement, accordionTriggerElements);
            }

        });
    }

});
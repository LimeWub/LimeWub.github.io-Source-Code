/**
 * Component used to group a desired number of accordions together and provide accessibility functionality to the user.
 * @constructor
 * @param {HTMLObject} element - The element to be used as the group wrapper.
 * @param {Array} accordions - The array of accordions relevant to the group.
 * 
 * @property {HTMLElement} element - The accordion element passed into the accordion constructor.
 * @property {Array} accordions - Array of accordions passed into the constructor.
 * @property {Integer} count - The accordions count.
 * @property {HTMLElement} active=undefined - The active accordion.
 * @property {Integer} currentPosition=0 - Current position of the user on the accordions.
 * @property {Integer} position - Position of the accordion with the current focus.
 */

class AccordionGroup {
    constructor(element, accordions) {
        // Set properties
        this.element = element;
        this.accordions = accordions;
        this.count = accordions.length - 1;
        this.active = undefined;
        this.currentPosition = 0;

        // Call Init
        this.init();

        return this;
    }

    get position() {
        return this.currentPosition;
    }

    set position(newPosition) {
        // If new positon is less than 0
        if (newPosition < 0) {
            // Set position to limit
            this.currentPosition = this.count;
        }
        // If new position more than limit
        else if (newPosition > this.count) {
            // Set position to 0
            this.currentPosition = 0;
        }
        else {
            // Update position
            this.currentPosition = newPosition;
        };
        // Call the set Active method
        this.setActive();
    }

    /**
     * Initialise the accordion group.
     * @memberof AccordionGroup
     */
    init() {
        // Call accessibility
        this.attachEvents();
    }

    /**
     * Toggle the next accordion element in the group.
     * @memberof AccordionGroup
     */
    next() {
        this.position++;
    }

    /**
     * Toggle the previous accordion element in the group.
     * @memberof AccordionGroup
     */
    prev() {
        this.position--;
    }

    /**
     * Add toggle focus state on a desired element.
     * @memberof AccordionGroup
     */
    setActive() {
        this.accordions[this.currentPosition].focus();
    }

    /**
     * Attached events to the accordion group.
     * @memberof AccordionGroup
     */
    attachEvents() {
        // Cache Instance
        let accordionGroup = this;

        // Add keydown events
        accordionGroup.element.addEventListener("keydown", function (event) {

            // Get current position
            let newCurrentPosition = parseInt(event.target.getAttribute("data-accordion-position"));

            // Update if the current possition value is truthy or '0', else keep old
            if (newCurrentPosition || (newCurrentPosition === 0)) {
                accordionGroup.currentPosition = newCurrentPosition;
            }

            // Arrow Down
            if (event.key === "ArrowDown" || event.key === "Down") {
                event.preventDefault();
                accordionGroup.next();
            }
            // Arrow Up
            if (event.key === "ArrowUp" || event.key === "Up") {
                event.preventDefault();
                accordionGroup.prev();
            }
            // Home
            if (event.key === "Home") {
                event.preventDefault();
                accordionGroup.currentPosition = 0; //first accordion
                accordionGroup.setActive();
            }
            // End
            if (event.key === "End") {
                event.preventDefault();
                accordionGroup.currentPosition = accordionGroup.count; //last accordion
                accordionGroup.setActive();
            }
            // Ctrl + Page up
            if (event.ctrlKey === true && event.key === "PageUp") {
                accordionGroup.prev();
            }

            // Ctrl + Page Down
            if (event.ctrlKey === true && event.key === "PageDown") {
                accordionGroup.next();
            }
        });
    }
}

export { AccordionGroup as default }
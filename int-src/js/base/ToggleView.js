//==================================================================================================
//
//	Show or hide an element using the "aria-hidden" attribute
//
//==================================================================================================


//==================================================================================================
//	Constructor
//==================================================================================================
/**
 * Show/hide functionality.
 * This can be inherited from (or instantiated) as required.
 * @constructor
 * @param {HTMLElement} trigger - Element which will toggle our view
 * @param {Function} callback - Callback to be fired when our view state changes. <br>
 *                              <b>Changelog</b>
 *                              1Mar2018 - The callback is now called at the *very end* of setViewState(); *after* the 'hidden' property is updated.
 * @property {HTMLElement} trigger - Local reference to our trigger argument.
 * @property {HTMLElement} view - View element for our CTA, this is derived from the "aria-controls" element attribute.
 * @property {Function} callback - Local reference to our callback argument.
 * @property {String} activeClass - Class to be used to toggle the state of our view elements, defaults to ".hidden".
 * @property {Boolean} hidden - Reflects the current state of the view. When updated this will automatically show/hide as appropriate.
 *
 */
class ToggleView {
    constructor(trigger, callback) {
        // Set properties
        this.trigger = trigger;
        this.callback = callback;
        this.view = document.getElementById(trigger.getAttribute("aria-controls"));
        this.viewState = false;
        return this;
    }

    get hidden() {
        return this.viewState;
    }

    set hidden(value) {       
        this.trigger.setAttribute("aria-expanded", !value);
        this.view.setAttribute("aria-hidden", value);

        
        this.viewState = value;

        //  Fire our callback if it exists
        if (this.callback) {
            this.callback(this);
        }
    }

    toggle() {
        this.hidden = this.viewState = !this.hidden;
    }
}

export { ToggleView as default } 
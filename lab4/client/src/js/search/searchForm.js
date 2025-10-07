import { ID, CLASS_NAME, ELEMENT, TYPE } from "../constants.js"
import { TEXT_CONTENT } from "../../../user.js";

class SearchForm {
    constructor() {
        this.element = document.createElement(ELEMENT.FORM);
        this.element.id = ID.SEARCH_FORM;

        const input = document.createElement(ELEMENT.INPUT);
        input.id = ID.SEARCH_INPUT;


        const submitButton = document.createElement(ELEMENT.BUTTON);
        submitButton.id = ID.SUBMIT_BUTTON;
        submitButton.textContent = TEXT_CONTENT.SUBMIT_BUTTON;
        submitButton.type = TYPE.SUBMIT;

        this.element.appendChild(input);
        this.element.appendChild(submitButton);
    }

}
export default SearchForm
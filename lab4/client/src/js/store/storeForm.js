import { ID, ELEMENT, TYPE } from "../constants.js"
import { TEXT_CONTENT } from "../../../user.js";

const TEXT_AREA = {
    ROWS: 5,
    RESIZE: "none",
}


class StoreForm {
    constructor() {
        this.element = document.createElement(ELEMENT.FORM);
        this.element.id = ID.STORE_FORM;

        const wordInput = document.createElement(ELEMENT.INPUT);
        wordInput.id = ID.STORE_WORD_INPUT;

        const definitionInput = document.createElement(ELEMENT.TEXT_AREA);
        definitionInput.id = ID.STORE_DEFINITION_INPUT;
        definitionInput.rows = TEXT_AREA.ROWS
        definitionInput.style.resize = TEXT_AREA.RESIZE;



        const submitButton = document.createElement(ELEMENT.BUTTON);
        submitButton.id = ID.SUBMIT_BUTTON;
        submitButton.textContent = TEXT_CONTENT.SUBMIT_BUTTON;
        submitButton.type = TYPE.SUBMIT;

        this.element.appendChild(wordInput);
        this.element.appendChild(definitionInput);
        this.element.appendChild(submitButton);
    }

}

export default StoreForm
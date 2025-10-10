import { ID, ELEMENT, TYPE } from "../util/constants.js";
import { TEXT_CONTENT } from "../../lang/en/user.js";

const TEXT_AREA = {
  ROWS: 5,
  RESIZE: "none",
};

class StoreForm {
  constructor() {
    this.element = document.createElement(ELEMENT.FORM);
    this.element.id = ID.STORE_FORM;

    this.wordInput = document.createElement(ELEMENT.INPUT);
    this.wordInput.id = ID.STORE_WORD_INPUT;

    this.definitionInput = document.createElement(ELEMENT.TEXT_AREA);
    this.definitionInput.id = ID.STORE_DEFINITION_INPUT;
    this.definitionInput.rows = TEXT_AREA.ROWS;
    this.definitionInput.style.resize = TEXT_AREA.RESIZE;

    this.submitButton = document.createElement(ELEMENT.BUTTON);
    this.submitButton.id = ID.SUBMIT_BUTTON;
    this.submitButton.textContent = TEXT_CONTENT.SUBMIT_BUTTON;
    this.submitButton.type = TYPE.SUBMIT;

    this.element.appendChild(this.wordInput);
    this.element.appendChild(this.definitionInput);
    this.element.appendChild(this.submitButton);
  }
}

export default StoreForm;

import { ID, ELEMENT, TYPE, PLACEHOLDER } from "../util/constants.js";
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
    this.wordInput.placeholder = PLACEHOLDER.WORD;

    this.definitionInput = document.createElement(ELEMENT.TEXT_AREA);
    this.definitionInput.id = ID.STORE_DEFINITION_INPUT;
    this.definitionInput.rows = TEXT_AREA.ROWS;
    this.definitionInput.style.resize = TEXT_AREA.RESIZE;
    this.definitionInput.placeholder = PLACEHOLDER.DEFINITION;

    this.storeButton = document.createElement(ELEMENT.BUTTON);
    this.storeButton.id = ID.STORE_BUTTON;
    this.storeButton.textContent = TEXT_CONTENT.STORE_BUTTON;
    this.storeButton.type = TYPE.SUBMIT;

    this.message = document.createElement(ELEMENT.DIV);

    this.element.appendChild(this.message);
    this.element.appendChild(this.wordInput);
    this.element.appendChild(this.definitionInput);
    this.element.appendChild(this.storeButton);
  }

  displayMessage(message) {
    this.message.innerText = message;
  }

  getInputValues() {
    const word = this.wordInput.value.trim();
    const definition = this.definitionInput.value.trim();
    return { word, definition };
  }
}

export default StoreForm;

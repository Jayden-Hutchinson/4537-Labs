import { ID, ELEMENT, TYPE } from "../util/constants.js";
import { TEXT_CONTENT } from "../../lang/en/user.js";

class SearchForm {
  constructor() {
    this.element = document.createElement(ELEMENT.FORM);
    this.element.id = ID.SEARCH_FORM;

    this.wordInput = document.createElement(ELEMENT.INPUT);
    this.wordInput.id = ID.SEARCH_INPUT;
    this.wordInput.type = TYPE.TEXT;

    this.searchButton = document.createElement(ELEMENT.BUTTON);
    this.searchButton.id = ID.SEARCH_BUTTON;
    this.searchButton.textContent = TEXT_CONTENT.SEARCH_BUTTON;
    this.searchButton.type = TYPE.SUBMIT;

    this.message = document.createElement(ELEMENT.DIV);

    this.element.appendChild(this.message);
    this.element.appendChild(this.wordInput);
    this.element.appendChild(this.searchButton);
  }
  displayMessage(message) {
    this.message.innerText = message;
  }

  getInputValue() {
    return this.wordInput.value.trim();
  }
}

export default SearchForm;

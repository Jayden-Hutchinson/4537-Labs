import { ID, ELEMENT, TYPE } from "../util/constants.js";
import { TEXT_CONTENT } from "../../lang/en/user.js";

class SearchForm {
  constructor() {
    this.element = document.createElement(ELEMENT.FORM);
    this.element.id = ID.SEARCH_FORM;

    this.input = document.createElement(ELEMENT.INPUT);
    this.input.id = ID.SEARCH_INPUT;
    this.input.type = TYPE.TEXT;

    this.submitButton = document.createElement(ELEMENT.BUTTON);
    this.submitButton.id = ID.SUBMIT_BUTTON;
    this.submitButton.textContent = TEXT_CONTENT.SUBMIT_BUTTON;
    this.submitButton.type = TYPE.SUBMIT;

    this.element.appendChild(this.input);
    this.element.appendChild(this.submitButton);
  }
}

export default SearchForm;

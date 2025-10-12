import { ID, ELEMENT, TYPE, EVENT } from "../util/constants.js";
import { MESSAGE, TEXT_CONTENT } from "../../lang/en/user.js";
import ClientApi from "../api/clientApi.js";

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
    this.element.addEventListener(EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    console.log("Handle Submit");
    const word = this.getInputValue();

    if (!word) {
      this.displayMessage(MESSAGE.SEARCH_FORM.NO_WORD_VALUE);
      return;
    }

    console.log("word:", word);
    try {
      const res = await ClientApi.search(word);

      if (!res) {
        this.displayMessage(MESSAGE.SEARCH_FORM.DEFINITION_NOT_FOUND);
        return;
      }

      this.displayMessage(
        `Request ${res.requestNumber}: 
        
        ${MESSAGE.SEARCH_FORM.WORD_DEFINITION(res.definition)}`
      );
    } catch (error) {
      this.displayMessage(MESSAGE.SEARCH_FORM.DEFINITION_NOT_FOUND);
    }
  }

  displayMessage(message) {
    this.message.innerText = message;
  }

  getInputValue() {
    return this.wordInput.value.trim();
  }
}

export default SearchForm;

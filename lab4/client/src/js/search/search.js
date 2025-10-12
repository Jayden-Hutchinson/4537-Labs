import { ID, EVENT, ELEMENT } from "../util/constants.js";
import SearchForm from "./searchForm.js";
import ClientApi from "../api/clientApi.js";
import { MESSAGE } from "../../lang/en/user.js";

class Search {
  run() {
    this.root = document.getElementById(ID.ROOT);
    this.searchForm = new SearchForm();

    this.definition = document.createElement(ELEMENT.DIV);
    this.definition.id = ID.DEFINITION;

    this.searchForm.element.addEventListener(EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      const word = this.searchForm.getInputValue();

      if (!word) {
        this.searchForm.displayMessage(MESSAGE.SEARCH_FORM.NO_WORD_VALUE)
        return;
      }

      this.handleSubmit(word);
    });

    this.root.appendChild(this.definition);
    this.root.appendChild(this.searchForm.element);
  }

  async handleSubmit(word) {

    try {
      const res = await ClientApi.search(word);


      if (!res) {
        this.searchForm.displayMessage(MESSAGE.SEARCH_FORM.DEFINITION_NOT_FOUND)
        return
      }

      this.searchForm.displayMessage(MESSAGE.SEARCH_FORM.WORD_DEFINITION(res));

    } catch (error) {
      this.searchForm.displayMessage(MESSAGE.SEARCH.DEFINITION_NOT_FOUND);
    }
  }
}

new Search().run();

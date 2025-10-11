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
      this.handleSubmit();
    });

    this.root.appendChild(this.definition);
    this.root.appendChild(this.searchForm.element);
  }

  async handleSubmit() {
    const word = this.searchForm.getInputValue();
    try {
      const res = await ClientApi.search(word);

      console.log("Search result:", res);

      if (res && res.definition) {
        this.searchForm.displayMessage(res.definition);
      }
    } catch (error) {
      console.error("Search error:", error);
      this.searchForm.displayMessage(MESSAGE.SEARCH.DEFINITION_NOT_FOUND);
    }
  }
}

new Search().run();

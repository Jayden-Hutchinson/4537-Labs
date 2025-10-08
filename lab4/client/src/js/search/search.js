import { ID, EVENT } from "../util/constants.js";
import SearchForm from "./searchForm.js";
import ClientApi from "../api/clientApi.js";

class Search {
  run() {
    this.root = document.getElementById(ID.ROOT);
    this.searchForm = new SearchForm();

    this.searchForm.element.addEventListener(EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    root.appendChild(this.searchForm.element);
  }

  async handleSubmit() {
    const word = this.searchForm.input.value;
    const res = await ClientApi.search(word);
  }
}

new Search().run();

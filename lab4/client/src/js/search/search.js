import { ID, EVENT } from "../util/constants.js";
import SearchForm from "./searchForm.js";
import ClientApi from "../api/clientApi.js";

class Search {
  run() {
    this.root = document.getElementById(ID.ROOT);
    this.searchForm = new SearchForm();

    this.definitionDiv = document.createElement('div');
    this.definitionDiv.id = 'definition';

    this.searchForm.element.addEventListener(EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    this.root.appendChild(this.searchForm.element);
    this.root.appendChild(this.definitionDiv);
  }

  async handleSubmit() {
    const definition = document.getElementById("definition");
    const word = this.searchForm.input.value.trim();

    try {
      const res = await ClientApi.search(word);
      console.log('Search result:', res);

      if (res && res.definition) {
        definition.innerText = res.definition;
      } else {
        definition.innerText = "Definition not found";
      }
    } catch (error) {
      console.error('Search error:', error);
      definition.innerText = "Item not found";
    }
  }

}

new Search().run();

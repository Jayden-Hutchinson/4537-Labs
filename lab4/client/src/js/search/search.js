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

    this.root.appendChild(this.definition);
    this.root.appendChild(this.searchForm.element);
  }
}

new Search().run();

import { TEXT_CONTENT } from "./lang/en/user.js";
import { ELEMENT, ID, PAGE } from "./js/util/constants.js";

class App {
  constructor() {
    this.element = document.getElementById(ID.ROOT);
    const header = document.createElement(ELEMENT.H1);
    header.textContent = TEXT_CONTENT.HEADER;

    const searchLink = document.createElement(ELEMENT.A);
    searchLink.textContent = TEXT_CONTENT.SEARCH_LINK;
    searchLink.href = PAGE.SEARCH;

    const storeLink = document.createElement(ELEMENT.A);
    storeLink.textContent = TEXT_CONTENT.STORE_LINK;
    storeLink.href = PAGE.STORE;

    this.element.appendChild(header);
    this.element.appendChild(searchLink);
    this.element.appendChild(storeLink);
  }
}

new App();

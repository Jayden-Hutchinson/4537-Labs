import { ID } from "./js/constants.js";
import ElementFactory from "./js/ElementFactory.js";

class Client {
  constructor() {
    this.element = document.getElementById(ID.root);

    this.sqlTextArea = ElementFactory.createSqlTextArea();
    this.dataButton = ElementFactory.createDataButton();

    this.element.appendChild(this.sqlTextArea);
    this.element.appendChild(this.dataButton);
  }
}

new Client();

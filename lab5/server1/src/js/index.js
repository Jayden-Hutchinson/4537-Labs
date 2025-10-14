import { EVENT, ID } from "./constants.js";
import ElementFactory from "./ElementFactory.js";

class Client {
  constructor() {
    this.element = document.getElementById(ID.root);

    this.sqlForm = ElementFactory.createSqlForm();
    this.dataButton = ElementFactory.createDataButton();
    this.message = ElementFactory.createMessage();

    this.element.appendChild(this.dataButton);
    this.element.appendChild(this.sqlForm);
    this.element.appendChild(this.message);

    this.sqlForm.addEventListener(EVENT.submit, (event) => {
      event.preventDefault();
      console.log(this.sqlForm);
    });
  }
}

new Client();

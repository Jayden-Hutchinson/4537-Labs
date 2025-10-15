import { HTML } from "./util/constants.js";
import ElementFactory from "./ElementFactory.js";

class Client {
  constructor() {
    this.element = document.getElementById(HTML.ID.ROOT);

    this.sqlForm = ElementFactory.createSqlForm();
    this.dataButton = ElementFactory.createDataButton();
    this.message = ElementFactory.createMessage();

    this.element.appendChild(this.dataButton);
    this.element.appendChild(this.sqlForm);
    this.element.appendChild(this.message);

    this.dataButton.addEventListener(HTML.EVENT.CLICK, (event) => {});

    this.sqlForm.addEventListener(HTML.EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      console.log("Submit Event");

      const json = await fetch("http://localhost:3000/api/db/select").then(
        (res) => res.json()
      );

      this.message.textContent = json;
    });
  }
}

new Client();

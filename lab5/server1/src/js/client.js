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

    this.dataButton.addEventListener(HTML.EVENT.CLICK, async (event) => {
      //send a post request to the server
      event.preventDefault();
      try {
        const res = await fetch("http://localhost:3000/api/db/insert", {
          method: "POST"
        });
        
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${text}`);
        }
        
        const result = await res.json();
        this.message.textContent = result.message;

      } catch (err) {
        console.error("Error:", err);
        this.message.textContent = `Error: ${err.message}`;
      }
    });

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

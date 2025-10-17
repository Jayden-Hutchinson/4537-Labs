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
        const res = await fetch("http://localhost:3000/api/db/predef", {
          method: "POST"
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${text}`);
        }

        const result = await res.text();
        this.message.textContent = result;

      } catch (err) {
        console.error("Error:", err);
        this.message.textContent = `Error: ${err.message}`;
      }
    });

    this.sqlForm.addEventListener(HTML.EVENT.SUBMIT, async (event) => {

      event.preventDefault();
      console.log("Submit Event");
      //pasrse thje nipt
      const input = this.sqlForm.textArea.value
      console.log(input)
      // if insert do insert logic
      if (input.includes("INSERT")) {
        console.log("INSERT")

        try {
          const res = await fetch("http://localhost:3000/api/db/insert", {
            method: "POST",
            headers: { "Content-Type": "application/text" },
            body: input
          });

          const result = await res.text();
          this.message.textContent = result;
        } catch (err) {
          console.error("Error:", err);
          this.message.textContent = `Error: ${err.message}`;
        }
      } else if (input.includes("SELECT")) {
        console.log("SELECT")

        try {
          const res = await fetch("http://localhost:3000/api/db/select", {
            method: "GET"
          });

          const result = await res.text();
          this.message.textContent = result;
        } catch (err) {
          console.error("Error:", err);
          this.message.textContent = `Error: ${err.message}`;
        }
      } else {
        console.log("you cant do that bro bro")
      }

    });
  }
}

new Client();

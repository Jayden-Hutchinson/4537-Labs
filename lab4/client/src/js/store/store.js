import StoreForm from "./storeForm.js";
import { ID } from "../util/constants.js";
import ClientApi from "../api/clientApi.js";

class Store {
  run() {
    this.root = document.getElementById(ID.ROOT);
    this.storeForm = new StoreForm();
    this.root.appendChild(this.storeForm.element);

    this.storeForm.element.addEventListener("submit", async (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const values = this.storeForm.getInputValues();
    const res = await ClientApi.store(values.word, values.definition);
    if (res) {
      console.log("Store results:", res);
      this.storeForm.displayMessage(res.message);
    }
  }
}

new Store().run();

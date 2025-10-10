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
    const word = this.storeForm.wordInput; 
    const definition = this.storeForm.definitionInput;
    const res = await ClientApi.store(word, definition);
    if (res) {
      console.log('Store results:', res);
    }
  }
}

new Store().run();

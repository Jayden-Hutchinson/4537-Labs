import StoreForm from "./storeForm.js";
import { ID } from "../util/constants.js";

class Store {
  run() {
    const root = document.getElementById(ID.ROOT);
    const storeForm = new StoreForm();
    root.appendChild(storeForm.element);
  }
}

new Store().run();

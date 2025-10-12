import StoreForm from "./storeForm.js";
import { EVENT, ID } from "../util/constants.js";
import ClientApi from "../api/clientApi.js";
import { MESSAGE } from "../../lang/en/user.js";

class Store {
  run() {
    this.root = document.getElementById(ID.ROOT);
    this.storeForm = new StoreForm();
    this.root.appendChild(this.storeForm.element);

    this.storeForm.element.addEventListener(EVENT.SUBMIT, async (event) => {
      event.preventDefault();
      const values = this.storeForm.getInputValues();

      if (!values) {
        this.storeForm.displayMessage(MESSAGE.STORE_FORM.NO_VALUES)
        return;
      }

      this.handleSubmit(values);
    });
  }

  async handleSubmit(values) {
    try {
      const res = await ClientApi.store(values.word, values.definition);
      this.storeForm.displayMessage(res.message);
    } catch (err) {
      this.storeForm.displayMessage(err.message);
    }
  }
}

new Store().run();

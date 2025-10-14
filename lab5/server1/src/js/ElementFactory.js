import { UI_TEXT } from "../lang/en/user.js";
import { ELEMENT, CLASS_NAME, TYPE, METHOD } from "./constants.js";

class ElementFactory {
  static createSqlForm() {
    const form = document.createElement(ELEMENT.form);
    form.className = CLASS_NAME.sqlForm;
    form.method = METHOD.post;

    const textArea = document.createElement(ELEMENT.textArea);
    textArea.placeHolder = UI_TEXT.textAreaPlaceholder;

    const submitButton = document.createElement(ELEMENT.button);
    submitButton.textContent = UI_TEXT.submitButton;
    submitButton.type = TYPE.submit;

    form.appendChild(textArea);
    form.appendChild(submitButton);
    return form;
  }

  static createDataButton() {
    const element = document.createElement(ELEMENT.button);
    element.className = CLASS_NAME.dataButton;
    element.textContent = UI_TEXT.dataButton;
    return element;
  }

  static createMessage() {
    const element = document.createElement(ELEMENT.div);
    element.className = CLASS_NAME.message;
    element.textContent = "Messages";
    return element;
  }
}

export default ElementFactory;

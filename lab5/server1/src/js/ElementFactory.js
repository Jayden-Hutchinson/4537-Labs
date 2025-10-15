import { UI_TEXT } from "../lang/en/user.js";
import { ELEMENT, REQUEST_TYPE } from "./util/constants.js";

class ElementFactory {
  static createSqlForm() {
    const form = document.createElement(ELEMENT.TAG.FORM);
    form.className = ELEMENT.CLASS_NAME.SQL_FORM;
    form.method = REQUEST_TYPE.POST;

    const textArea = document.createElement(ELEMENT.TAG.TEXT_AREA);
    textArea.placeHolder = UI_TEXT.textAreaPlaceholder;

    const submitButton = document.createElement(ELEMENT.TAG.BUTTON);
    submitButton.textContent = UI_TEXT.submitButton;
    submitButton.type = ELEMENT.TYPE.SUBMIT;

    form.appendChild(textArea);
    form.appendChild(submitButton);
    return form;
  }

  static createDataButton() {
    const element = document.createElement(ELEMENT.button);
    element.className = ELEMENT.CLASS_NAME.DATA_BUTTON;
    element.textContent = UI_TEXT.dataButton;
    return element;
  }

  static createMessage() {
    const element = document.createElement(ELEMENT.div);
    element.className = ELEMENT.CLASS_NAME.MESSAGE;
    return element;
  }
}

export default ElementFactory;

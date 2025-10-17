import { UI_TEXT } from "../lang/en/user.js";
import { HTML, HTTP } from "./util/constants.js";

class ElementFactory {
  static createSqlForm() {
    const form = document.createElement(HTML.TAG.FORM);
    form.className = HTML.CLASS_NAME.SQL_FORM;
    form.method = HTTP.REQUEST_TYPE.POST;

    form.textArea = document.createElement(HTML.TAG.TEXT_AREA);
    form.textArea.placeHolder = UI_TEXT.textAreaPlaceholder;

    const submitButton = document.createElement(HTML.TAG.BUTTON);
    submitButton.textContent = UI_TEXT.submitButton;
    submitButton.type = HTML.TYPE.SUBMIT;

    form.appendChild(form.textArea);
    form.appendChild(submitButton);
    return form;
  }

  static createDataButton() {
    const element = document.createElement(HTML.TAG.BUTTON);
    element.className = HTML.CLASS_NAME.DATA_BUTTON;
    element.textContent = UI_TEXT.dataButton;
    return element;
  }

  static createMessage() {
    const element = document.createElement(HTML.TAG.DIV);
    element.className = HTML.CLASS_NAME.MESSAGE;
    return element;
  }
}

export default ElementFactory;

import { ELEMENT, CLASS_NAME } from "./constants";

class ElementFactory {
  static createSqlTextArea() {
    const element = document.createElement(ELEMENT.textArea);
    element.className = CLASS_NAME.sqlTextArea;
    return element;
  }

  static createDataButton() {}
}

export default ElementFactory;

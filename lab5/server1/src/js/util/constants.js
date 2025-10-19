export const HTML = {
  TAG: {
    TEXT_AREA: "textarea",
    BUTTON: "button",
    FORM: "form",
    DIV: "div",
  },

  EVENT: {
    SUBMIT: "submit",
    CLICK: "click",
  },

  TYPE: {
    SUBMIT: "submit",
  },

  ID: {
    ROOT: "root",
  },

  CLASS_NAME: {
    SQL_FORM: "sql-form",
    DATA_BUTTON: "data-button",
    MESSAGE: "message",
  },
};

export const SQL = {
  KEYWORD: {
    INSERT: "INSERT",
    SELECT: "SELECT",
  },
};

export const HTTP = {
  REQUEST_TYPE: {
    GET: "GET",
    POST: "POST",
  },
};

const BASE_URL = "https://j-hutchinson.com/COMP4537/labs/5";
export const SERVER_ROUTE = {
  SELECT: `${BASE_URL}/api/db/select`,
  INSERT: `${BASE_URL}/api/db/insert`,
  INSERT_DATA: `${BASE_URL}/api/db/insert/data`,
};

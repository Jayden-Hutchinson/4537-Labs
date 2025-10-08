import { BASE_URL } from "./routes.js";
import { PARAM } from "../util/constants.js";

class ClientApi {
  static async search(word) {
    const url = new URL(BASE_URL);
    url.searchParams.append(PARAM.WORD, word);

    console.log(url);
    // const res = await this.fetch(url);
  }

  static async store(word, definition) {}
}
export default ClientApi;

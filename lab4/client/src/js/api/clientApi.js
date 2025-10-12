import { FULL_URL } from "./routes.js";
import POSTRequest from "./POSTRequest.js";

class ClientApi {
  static async search(word) {
    const url = `${FULL_URL}/?word=${encodeURIComponent(word)}`;
    console.log("Searching for", { word, url });

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async store(word, definition) {
    const url = FULL_URL;
    console.log("Storing", { word, definition, url });
    try {
      const response = await fetch(url, new POSTRequest(word, definition));

      if (!response.ok) {
        const responseText = await response.text();
        return { success: false, message: responseText };
      }

      const result = await response.text();
      return { success: true, message: result };
    } catch (error) {
      throw error;
    }
  }
}
export default ClientApi;

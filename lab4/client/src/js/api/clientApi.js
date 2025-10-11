import { FULL_URL } from "./routes.js";
import POSTRequest from "./POSTRequest.js";

class ClientApi {
  static async search(word) {
    const url = `${FULL_URL}/?name=${encodeURIComponent(word)}`;

    console.log("Searching for:", word);
    console.log("URL:", url);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  static async store(word, definition) {
    const url = FULL_URL;
    console.log("Storing:", { word, definition });
    try {
      const response = await fetch(url, new POSTRequest(word, definition));

      console.log(response);

      const responseText = await response.text();

      if (response.ok) {
        return { success: true, message: responseText };
      }
    } catch (error) {
      console.error("Store error:", error);
      throw error;
    }
  }
}
export default ClientApi;

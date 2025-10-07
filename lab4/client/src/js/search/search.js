

import { ID } from "../constants.js";
import SearchForm from "./searchForm.js"

class Search {
    run() {
        const root = document.getElementById(ID.ROOT)
        const searchForm = new SearchForm();
        root.appendChild(searchForm.element)
    }
}

new Search().run();

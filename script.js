let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(result) {
    let ResultsContainerEl = document.createElement("div");
    ResultsContainerEl.classList.add("result-item");

    let {
        link,
        title,
        description
    } = result;

    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    ResultsContainerEl.appendChild(titleEl);

    let brEl = document.createElement("br");
    ResultsContainerEl.appendChild(brEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    ResultsContainerEl.appendChild(urlEl);

    let descEl = document.createElement("p");
    descEl.classList.add("link-description");
    descEl.textContent = description;
    ResultsContainerEl.appendChild(descEl);

    searchResultsEl.appendChild(ResultsContainerEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent="";
        let searchText = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchText;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
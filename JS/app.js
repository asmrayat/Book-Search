const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);

    searchField.value = '';

    // url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
    fetch(url)
        .then(res => res.json())
        .then(data => displayTotalSearch(data.numFound));
}
// Finding the Book Publish year
const yearSort = (yearList = 0) => {
    if (yearList === 0) {
        return 'Not Found'
    }
    else {
        const minYear = Math.min(...yearList);
        //console.log(minYear);
        return minYear
    }

}
const publisherVerify = (publisherList = 'Not Found') => {
    return publisherList;
}
// Total search result number
const displayTotalSearch = results => {
    const totalSearchResult = document.getElementById('totalSearch');
    totalSearchResult.innerHTML = '';
    const div = document.createElement('div');
    if (results == 0) {
        div.innerHTML = `
        <h1 class="text-center mt-5 text-secondary">!!!Result Not Found Try Again!!!</h1>
        `
    }
    else {
        div.innerHTML = `
    <h4 class="text-center my-5">Total Result Found = ${results}</h4>
    `
    }
    totalSearchResult.appendChild(div);
}
// display Total search result
const displaySearchResult = booksName => {
    //console.log(booksName);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    booksName.forEach(bookName => {
        //console.log(bookName);
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
             <div class="card h-100 border border-4">
                    <img class=" w-100 h-50 mb-4"  src="https://covers.openlibrary.org/b/id/${bookName.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title"><span class="fw-bold">Book Name: </span>${bookName.title}</h4>
                        <h5><span class="fw-bold ">Author Name: </span>${publisherVerify(bookName.author_name)}</h5>
                        <p class="card-text">
                        <span class="fw-bold">Publisher: </span>${publisherVerify(bookName.publisher)}
                        </p>
                        <p class="card-text">
                        <span class="fw-bold">Publish Year: </span>${yearSort(bookName.publish_year)}
                        </p>
                    </div>
             </div>
        `
        searchResult.appendChild(div);
    })
}
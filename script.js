// search events
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.search-btn');
searchInput.addEventListener('keydown', async event => {
    if (event.key === 'Enter' && event.target.value !== ''){
        try{
            const searchResults = await getSearchResults(event.target.value);
            displayResults(searchResults); 

        }
        catch(error){
            console.log(error);
        };
    }
});
searchBtn.addEventListener('click', async event => {
    if (searchInput.value !== ''){
        try{
            const searchResults = await getSearchResults(searchInput.value);
            displayResults(searchResults); 

        }
        catch(error){
            console.log(error);
        };
    }
})

async function getSearchResults(searchTerm){
    try{
        const response = await fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchTerm}&limit=10&namespace=0&format=json`)
        const data = await response.json()
        // reformat data
        const numResults = data[1].length;
        const arrayOfObjects = [];
        for (let i = 0; i < numResults; i++){
            arrayOfObjects.push({
                title: data[1][i],
                link: data[3][i],
            })
        }
        console.log(arrayOfObjects);
        return arrayOfObjects;

    } catch(error){
        console.log(error);
    }
}

function displayResults(searchResults){
    const listOfResults = document.querySelector('.search-results');
    while(listOfResults.querySelectorAll('.search-result').length !== 0){
        listOfResults.removeChild(listOfResults.lastChild);
    }
    console.log(searchResults)
    searchResults.forEach(searchResult => {
        console.log(searchResult)
        const result = document.createElement('li');
        result.classList.add('search-result');
        result.textContent = searchResult.title;
        result.addEventListener('click', event => {
            window.location.href = searchResult.link;
        })
        listOfResults.appendChild(result);
    })
}
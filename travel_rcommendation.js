
function clearSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchResultsDiv = document.getElementById('searchResults');

    searchInput.value = '';
    searchResultsDiv.innerHTML = '';
    searchResultsDiv.style.display = 'none'; // Hide the results div
}


function loadSuggestions() {
    const searchInput = document.querySelector('.search-bar input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchResultsDiv = document.getElementById('searchResults');

    if (searchTerm) {
        const url = `travel_recommendation_api.json`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Clear previous results
                searchResultsDiv.innerHTML = '';
                //console.log(data);

                if( searchTerm in data || (data['countries'].find( (country) => country.name.toLowerCase() === searchTerm ) != undefined) ) 
                {
                    const suggestions = (searchTerm in data)? data[searchTerm] : (data['countries'].find( (country) => country.name.toLowerCase() === searchTerm )).cities;
                    //console.log(suggestions);
                    
                    // Create suggestion items based on the data
                    suggestions.forEach(item => {
                        //console.log(item);
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'suggestion-item';

                        suggestionItem.innerHTML = `
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <div class="content">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <a href="#" class="visit-button">Visit</a>
                            </div>
                        `;
                        searchResultsDiv.appendChild(suggestionItem);
                    });

                } else {
                    searchResultsDiv.innerHTML = "<h3>Sorry, no results found</h3>";
                    searchResultsDiv.style.display = 'flex';
                }

                // Show the results div
                searchResultsDiv.style.display = 'flex';
            })
            .catch(error => {
                console.error('Fetch error:', error);
                searchResultsDiv.innerHTML = "<h3>An error occurred while fetching the data.</h3>";
                searchResultsDiv.style.display = 'flex';
            });
    } else {
        searchResultsDiv.innerHTML = "<h3>Please enter a search term.</h3>";
        searchResultsDiv.style.display = 'flex';
    }
}
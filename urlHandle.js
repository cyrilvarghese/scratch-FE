// urlHandler.js

// Array to store web URLs
let webURLs = [];

// Function to add a URL to the list
export function addURL(url) {
    if (url && isValidURL(url)) {
        webURLs.push(url);
        //  updateList();
    } else {
        console.error('Invalid URL format');
    }
}

// Function to remove a URL from the list
export function removeURL(index) {
    if (index >= 0 && index < webURLs.length) {
        webURLs.splice(index, 1);
        // updateList();
    }
}

// Function to get the current list of web URLs
export function getWebURLs() {
    return webURLs;
}

// Function to update the displayed list on the HTML page
function updateList() {
    const urlListContainer = document.getElementById('urlListContainer');
    urlListContainer.innerHTML = '';

    webURLs.forEach((url, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
           
            <a href="${url}"  target="_blank">${url}</a>
            
            <a href="#" class="removeLink" data-index="${index}">Remove</a>
        `;
        urlListContainer.appendChild(listItem);
    });

    // Attach event listener for remove links
    const removeLinks = document.querySelectorAll('.removeLink');
    removeLinks.forEach((removeLink) => {
        removeLink.addEventListener('click', (event) => {
            event.preventDefault();
            const indexToRemove = parseInt(event.target.dataset.index, 10);
            removeURL(indexToRemove);
        });
    });
}

// Function to check if a string is a valid URL
function isValidURL(inputURL) {
    const urlPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+$/;
    return urlPattern.test(inputURL);
}

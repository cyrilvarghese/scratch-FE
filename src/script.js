// scripts.js
import { openModal, closeModal } from './modal.js';
import { addURL, getWebURLs } from './urlHandle.js';
import { extractFileInfo } from './extractFileInfo.js'
import { showFormattedJsonPopup } from './jsonFormatterModule.js';
import './styles.css';

// Array to store selected files
let selectedFiles = [];
// Array to store selected items in the selectable list
let selectedItems = [];
let selectedItemsContent = [];
// Array to store currently selected options
let selectedOptions = [];





function createFileItem(file, index, elementId, countElementId) {
    const listItem = document.createElement('li');
    listItem.className = elementId === 'fileList' ? 'fileItem' : 'serverFileItem';

    const fileNameSpan = document.createElement('a');
    fileNameSpan.textContent = `${file.name}`;
    fileNameSpan.classList.add('truncate-text');
    fileNameSpan.href = file.path;
    fileNameSpan.target = '_blank';
    listItem.appendChild(fileNameSpan);

    if (listItem.className !== 'serverFileItem') {
        const pageInputsDiv = document.createElement('div');
        pageInputsDiv.className = 'pageInputs';

        const fromPageInput = document.createElement('input');
        fromPageInput.type = 'number';
        fromPageInput.placeholder = 'Page From';
        fromPageInput.className = 'pageInput';
        pageInputsDiv.appendChild(fromPageInput);

        const toPageInput = document.createElement('input');
        toPageInput.type = 'number';
        toPageInput.placeholder = 'Page To';
        toPageInput.className = 'pageInput';
        pageInputsDiv.appendChild(toPageInput);

        listItem.appendChild(pageInputsDiv);
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'removeButtonLink';
    removeButton.addEventListener('click', () => {
        if (elementId === 'fileList') {
            // Assuming selectedFiles and updateFileList are defined elsewhere
            selectedFiles.splice(index, 1);
            updateFileList(selectedFiles, 'fileList', 'fileListCount');
        } else {
            console.log('Remove button clicked for server file:', file.name);
            // Assume deleteFile is defined elsewhere
            deleteFile(file.name);
        }
    });

    listItem.appendChild(removeButton);
    return listItem;
}


async function deleteFile(filename) {
    try {
        const response = await fetch(`http://localhost:8000/api/files/delete?filename=${encodeURIComponent(filename)}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log(`File ${filename} deleted successfully.`);
            // Remove the corresponding list item from the UI
            const listItem = [...document.querySelectorAll('.serverFileItem')].find(li => li.querySelector('a').textContent.includes(filename));
            listItem.remove();
            //fetchFileList();
        } else {
            console.error(`Failed to delete file ${filename}.`);
        }
    } catch (error) {
        console.error('Error deleting file:', error.message);
    }
}

// Function to update the file list on the UI
function updateFileList(fileList, elementId, countElementId) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = '';

    fileList.forEach((file, index) => {
        const listItem = createFileItem(file, index, elementId, countElementId);
        listElement.appendChild(listItem);
    });

    updateCount(fileList.length, countElementId);
    console.log('File list changed:', fileList);
}

// Function to update the file count on the UI
function updateCount(count, elementId) {
    // document.getElementById(elementId).textContent = `Count: ${count}`;
}

function clearSelection() {
    selectedItems = [];
    selectedItemsContent = [];
    createSelectableList()
}

// Function to update the selectable list on the UI
function updateSelectableList() {
    const listItems = document.querySelectorAll('.selectableItem');
    listItems.forEach((item, index) => {
        if (selectedItems.includes(index)) {
            item.classList.add('selected');
            selectedItemsContent.push(item.dataset.content)
        } else {
            item.classList.remove('selected');
            selectedItemsContent[index] = "";

        }
    });

    // Log the current selection
    logSelection();
}

// Function to log the current selection
function logSelection() {
    document.getElementById('selectionLog').textContent = `Selection Log: ${JSON.stringify(selectedItems)}`;
}
function createSelectableList(data) {
    const container = document.getElementById('selectableList');
    container.innerHTML = "";
    data.forEach(item => {
        // Create list item container
        const listItem = document.createElement('div');
        listItem.classList.add('selectable-item');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.classList.add('scale-125');
        listItem.appendChild(checkbox);

        // Create item text
        const itemText = document.createElement('p');
        itemText.classList.add('item-text');
        itemText.textContent = item.page_content // Displaying the first 100 characters
        listItem.appendChild(itemText);

        // Create "Read More" link
        const readMoreLink = document.createElement('a');
        readMoreLink.href = '#';
        readMoreLink.classList.add('read-more-link');
        readMoreLink.textContent = 'Read More';
        listItem.appendChild(readMoreLink);

        // Attach click event listener to "Read More" link
        readMoreLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Display the full text content in a popup/modal
            openModal(item); // Replace this with your popup/modal display logic
        });

        // Attach click event listener to item text
        itemText.addEventListener('click', function () {
            // Toggle checkbox state
            checkbox.checked = !checkbox.checked;

            // Toggle item highlight based on checkbox state
            toggleHighlight(listItem, checkbox.checked);
        });

        // Attach change event listener to checkbox
        checkbox.addEventListener('change', function () {
            // Toggle item highlight based on checkbox state
            toggleHighlight(listItem, checkbox.checked);
        });

        // Append list item to container
        container.appendChild(listItem);
    });
}
function toggleHighlight(selectedItem, isChecked) {
    // Toggle highlight based on checkbox state
    if (isChecked) {
        selectedItem.classList.add('selected');
    } else {
        selectedItem.classList.remove('selected');
    }

    // Get the index of the selected item
    const index = Array.from(selectedItem.parentElement.children).indexOf(selectedItem);

    // Toggle selection state
    toggleSelection(index);
}


function toggleSelection(index) {
    const selectedItem = document.querySelectorAll('.selectable-item')[index];
    const itemTextElement = selectedItem.querySelector('.item-text');
    const textContent = itemTextElement.textContent.trim();
    const checkbox = selectedItem.querySelector('.checkbox');

    // Toggle selection state
    if (checkbox.checked) {
        selectedOptions.push({ index: index, text: textContent });
        selectedItem.classList.add('selected');
    } else {
        selectedOptions = selectedOptions.filter(item => item.index !== index);
        selectedItem.classList.remove('selected');
    }

    console.log('Selected options:', selectedOptions);
}


// function to load web url s
export async function loadUrls() {
    try {
        const urls = getWebURLs();
        const response = await fetch('http://localhost:8000/api/load-urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ urls: urls })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
        fetchFileList();
    } catch (error) {
        console.error('Error occurred while posting data to API:', error.message);
    }
}



let openAIResponse = {};
// Function to capture current values and log to console
export async function captureValues() {
    const creativityValue = document.getElementById('creativitySlider').value;
    const typeValue = document.getElementById('templateTypeDropdown').value;
    const queryInput = document.getElementById('queryInput');
    const additionalPrompt = document.getElementById('additionalPrompt');
    const queryText = queryInput.value + "\n" + additionalPrompt.value;
    // Log values to console
    console.log('Creativity:', creativityValue);
    console.log('Type:', typeValue);
    console.log('retrival docs', selectedOptions.map((item) => {
        return item.text
    }));

    try {
        const response = await fetch('http://localhost:8000/api/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texts: selectedOptions.map((item) => {
                    return item.text
                }),
                topic: queryText,
                type: typeValue,
                creativity: creativityValue
            }),

        });

        if (response.ok) {
            const result = await response.json();
            const jsonResponseTextarea = document.getElementById('jsonResponse');
            openAIResponse = JSON.parse(result);
            jsonResponseTextarea.value = JSON.stringify(JSON.parse(result))

            console.log(JSON.parse(result))

        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const urlInput = document.getElementById('urlInput');
const addURLButton = document.getElementById('addUrlButton');

// Add event listener to the "Add URL" button
addURLButton.addEventListener('click', () => {
    const urlToAdd = urlInput.value.trim();
    addURL(urlToAdd);
    urlInput.value = ''; // Clear the input field
    loadUrls();

});


//evemt fpr close button=
document.getElementById('closeButton').addEventListener('click', closeModal);

// Add a click event listener to the upload button
document.getElementById('uploadButton').addEventListener('click', uploadFiles);

// Event listener for the slider
const creativitySlider = document.getElementById('creativitySlider');
const sliderValue = document.getElementById('sliderValue');

creativitySlider.addEventListener('change', (event) => {
    const value = event.target.value;
    sliderValue.textContent = `Creativity Value: ${value}`;
});
// Event listener for selectable list items
document.getElementById('selectableList').addEventListener('click', (event) => {
    const listItem = event.target;

    // Check if the clicked element has the class "selectableItem"
    if (listItem.classList.contains('selectableItem')) {
        // Get the parent div of the listItem
        const parentDiv = listItem.parentElement;

        // Get the index of the parent div within the selectableList
        const index = Array.from(parentDiv.parentElement.children).indexOf(parentDiv);


        // Toggle selection state
        if (selectedItems.includes(index)) {
            selectedItems = selectedItems.filter(item => item !== index);
        } else {
            selectedItems.push(index);
        }

        // Update the selectable list on the UI
        updateSelectableList();
        console.log('Selected Index:', index);
        // console.log(listItem.dataset.content);


        // Add or remove the "selected" class based on the selection state
        listItem.classList.toggle('selected', selectedItems.includes(index));
    }
});

// Log when the selection changes
console.log('Initial selection:', selectedItems);

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', (event) => {
    const inputFiles = event.target.files;

    // Add the selected files to the array
    for (let i = 0; i < inputFiles.length; i++) {
        selectedFiles.push(inputFiles[i]);
    }

    // Update the file list on the UI
    updateFileList(selectedFiles, 'fileList', 'fileListCount');

    // Log when the file list changes
});

// Fetch file list from the server and update the UI
export async function fetchFileList() {
    try {
        const response = await fetch('http://localhost:8000/api/files');
        const data = await response.json();

        // Update the file list on the UI
        updateFileList(data.files, 'serverFileList', 'serverFileListCount');
    } catch (error) {
        console.error('Error fetching file list:', error);
    }
}

// Fetch the initial file list when the page loads
fetchFileList();

// Function to send a query to the server
export async function sendQuery() {
    selectedOptions = []//clear

    const queryInput = document.getElementById('queryInput');
    const queryText = queryInput.value;

    // Get the numeric input element
    var numericInput = document.getElementById("numericInput");

    // Get the value of the numeric input
    var numericValue = numericInput.value;
    if (queryText.trim() === '') {
        console.log('Please enter a query text.');
        return;
    }

    try {
        // Assume your API endpoint for fetching JSON data is 'http://example.com/api/query'
        const response = await fetch('http://localhost:8000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: queryText, results: numericValue }),
        }); const jsonData = await response.json();

        // Update the selectable list with the new data
        console.log(jsonData);
        createSelectableList(jsonData);

        //renderSelectableList(jsonData);
    } catch (error) {
        console.error('Error sending query:', error);

    }
}

// Function to upload files to the server
export async function uploadFiles() {
    if (selectedFiles.length > 0) {
        const form = document.getElementById('uploadForm');
        const formData = new FormData();

        // Append each selected file to the FormData object
        Array.from(selectedFiles).forEach(file => {
            formData.append('pdf_files', file);
        });

        const fileItems = document.querySelectorAll('.fileItem');
        const filesInfo = extractFileInfo(fileItems);
        // const filesInfo = [

        //     { "filename": "forms.pdf", "from_page": 7, "to_page": 178 }
        // ]
        formData.append('files_data', JSON.stringify(filesInfo))
        // Handle the form data as needed (e.g., post it to the server)
        // Replace the placeholder URL with your actual server endpoint
        fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                fetchFileList();

                // Handle the success response as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors as needed
            });
    }
    else {
        alert("Select A file")
    }

}


document.getElementById('showJsonPopup').addEventListener('click', () => {
    const jsonData = {
        name: "John Doe",
        age: 30,
        isStudent: false,
        courses: ["Math", "Science"],
        details: { major: "Physics", minor: "Math" }
    };
    showFormattedJsonPopup(openAIResponse);
});

// Example: Call captureValues on button click
document.getElementById('captureValuesButton').addEventListener('click', () => {
    captureValues()
});

// Example: Call sendQuery on another button click
document.getElementById('sendQueryButton').addEventListener('click', sendQuery);


function showLoader(apiName) {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loaderText').textContent = `Loading ${apiName}...`;
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loaderText').textContent = '';
}

// Intercept Fetch API calls
const originalFetch = window.fetch;
window.fetch = async function (url, options = {}) {
    const apiName = options.headers && options.headers['X-Api-Name']; // Example: 'X-Api-Name' header
    showLoader(apiName || 'API');
    try {
        const response = await originalFetch(url, options);
        return response;
    } finally {
        hideLoader();
    }
};
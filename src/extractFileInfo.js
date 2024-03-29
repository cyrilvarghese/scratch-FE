// extractFileInfo.js

// Function to extract file information
export function extractFileInfo(fileItems) {
    var fileInfos = [];

    // Loop through each file item
    for (var i = 0; i < fileItems.length; i++) {
        var fileItem = fileItems[i];
        var fileName = fileItem.querySelector('a').textContent;
        var fromPage = parseInt(fileItem.querySelector('input[type="number"]:nth-child(1)').value);
        var toPage = parseInt(fileItem.querySelector('input[type="number"]:nth-child(2)').value);

        // Check if both fromPage and toPage are valid numbers
        if (!isNaN(fromPage) && !isNaN(toPage)) {
            fileInfos.push({
                filename: fileName,
                from_page: fromPage,
                to_page: toPage
            });
        }
    }

    return fileInfos;
}




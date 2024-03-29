// jsonFormatterModule.js
export function showFormattedJsonPopup(jsonData) {
    const formatJsonValue = (value) => {
        if (typeof value === 'string') {
            return `<span class="json-string">"${value}"</span>`;
        } else if (typeof value === 'number') {
            return `<span class="json-number">${value}</span>`;
        } else if (typeof value === 'boolean') {
            return `<span class="json-boolean">${value}</span>`;
        } else if (Array.isArray(value)) {
            return `[${value.map(formatJsonValue).join(', ')}]`;
        } else if (value && typeof value === 'object') {
            return `{<div class="json-value">${Object.keys(value).map(key => `<div><span class="json-key">${key}:</span> ${formatJsonValue(value[key])}</div>`).join('')}</div>}`;
        }
        return value;
    };

    const popupWindow = window.open('', 'JsonPopup', 'width=600,height=400');
    popupWindow.document.write(`
      <html>
        <head>
          <title>Formatted JSON Data</title>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .json-key { font-weight: bold; }
            .json-value { margin-left: 20px; }
            .json-string { color: green; }
            .json-number { color: blue; }
            .json-boolean { color: red; }
          </style>
        </head>
        <body>
          <div id="jsonOutput" class="json-container">${formatJsonValue(jsonData)}</div>
        </body>
      </html>
    `);
    popupWindow.document.close();
}

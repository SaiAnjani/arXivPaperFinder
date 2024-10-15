# arXiv Paper Finder Chrome Extension

## Overview

The arXiv Keyword Finder is a Chrome extension that allows users to fetch recent arXiv articles based on custom keyword sets. It provides an easy-to-use interface for searching and displaying articles from the past week that match user-defined keywords.

## Features

- Add multiple sets of keywords for searching
- Remove keyword sets
- Save keyword sets between sessions
- Fetch recent arXiv articles (from the past week) based on keyword sets
- Display article titles, authors, and abstracts
- Link directly to arXiv pages for each article

## Files

- `manifest.json`: Defines the extension's properties and permissions
- `popup.html`: The HTML structure for the extension's popup interface
- `popup.js`: Contains the main logic for the extension's functionality
- `background.js`: Handles background tasks (currently just opens the popup in a new tab)
- `content.js`: Placeholder for potential future content script functionality

## Installation

1. Clone or download this repository
2. Open Google Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now appear in your Chrome toolbar

## Usage

1. Click the extension icon in the Chrome toolbar to open the popup
2. Enter keywords into the input fields (comma-separated for multiple keywords in a set)
3. Add or remove keyword sets as needed
4. Click "Fetch Articles" to retrieve recent arXiv articles matching your keywords
5. Scroll through the list of articles in the popup
6. Click on an article title to open its arXiv page in a new tab

## Development

To modify or extend the extension:

1. Edit the relevant files (`popup.html`, `popup.js`, etc.)
2. Save your changes
3. Go to `chrome://extensions` in Chrome
4. Find the arXiv Keyword Finder extension and click "Reload"
5. Test your changes by using the extension

## Notes

- The extension uses the arXiv API to fetch articles
- Keyword sets are saved using Chrome's storage API for persistence between sessions
- The extension fetches a maximum of 50 articles per request to avoid overloading the arXiv API

## Future Improvements

- Implement pagination for fetching more than 50 articles
- Add options for sorting and filtering results
- Integrate with other academic databases or search engines
- Implement a more advanced search query builder

## License

[NOT APPLICABLE]

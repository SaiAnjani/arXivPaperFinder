document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addKeywordSet').addEventListener('click', addKeywordSet);
  document.getElementById('fetchArticles').addEventListener('click', fetchArticles);
  document.getElementById('keywordSets').addEventListener('click', handleRemoveSet);

  // Load saved keyword sets
  chrome.storage.local.get(['keywordSets'], function(result) {
    if (result.keywordSets) {
      result.keywordSets.forEach(keywords => addKeywordSet(keywords));
    }
  });
});

function addKeywordSet(keywords = '') {
  const keywordSets = document.getElementById('keywordSets');
  const newSet = document.createElement('div');
  newSet.className = 'keywordSet';
  newSet.innerHTML = `
    <input type="text" class="keywordInput" placeholder="Enter keywords (comma-separated)" value="${keywords}">
    <button class="removeSet">Remove</button>
  `;
  keywordSets.appendChild(newSet);
  saveKeywordSets();
}

function handleRemoveSet(event) {
  if (event.target.className === 'removeSet') {
    event.target.parentElement.remove();
    saveKeywordSets();
  }
}

function saveKeywordSets() {
  const keywordInputs = document.querySelectorAll('.keywordInput');
  const keywordSets = Array.from(keywordInputs).map(input => input.value);
  chrome.storage.local.set({keywordSets: keywordSets});
}

function fetchArticles() {
  const articleList = document.getElementById('articleList');
  articleList.innerHTML = 'Loading...';

  const keywordInputs = document.querySelectorAll('.keywordInput');
  const keywordSets = Array.from(keywordInputs).map(input => input.value.split(',').map(k => k.trim()).filter(k => k));

  if (keywordSets.length === 0 || keywordSets.every(set => set.length === 0)) {
    articleList.innerHTML = 'Please enter at least one keyword set.';
    return;
  }

  const query = keywordSets.map(set => `(${set.map(k => `all:${k}`).join('+AND+')})`).join('+OR+');
  const apiUrl = `http://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=50`;

  fetch(apiUrl)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const entries = data.getElementsByTagName('entry');
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      articleList.innerHTML = '';

      for (let entry of entries) {
        const published = new Date(entry.getElementsByTagName('published')[0].textContent);
        if (published >= oneWeekAgo) {
          const title = entry.getElementsByTagName('title')[0].textContent;
          const authors = Array.from(entry.getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent).join(', ');
          const abstract = entry.getElementsByTagName('summary')[0].textContent;
          const link = entry.getElementsByTagName('id')[0].textContent;

          const articleDiv = document.createElement('div');
          articleDiv.className = 'article';
          articleDiv.innerHTML = `
            <div class="title"><a href="${link}" target="_blank">${title}</a></div>
            <div class="authors">${authors}</div>
            <div class="abstract">${abstract.substring(0, 200)}...</div>
          `;
          articleList.appendChild(articleDiv);
        }
      }

      if (articleList.children.length === 0) {
        articleList.innerHTML = 'No articles found in the past week matching your keywords.';
      }
    })
    .catch(error => {
      articleList.innerHTML = 'Error fetching articles. Please try again.';
      console.error('Error:', error);
    });
}

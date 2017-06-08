'use strict';

$('#checkPage').on('click', () => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        document.getElementById('result').innerHTML = tabs[0].url;
  });
});

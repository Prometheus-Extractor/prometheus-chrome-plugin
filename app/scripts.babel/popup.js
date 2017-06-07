'use strict';

console.log('\'Allo \'Allo! Popup');

document.getElementById('checkPage').addEventListener('click', () => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        document.getElementById('result').innerHTML = tabs[0].url;
  });
});

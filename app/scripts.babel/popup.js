'use strict';

function queryPrometheus(url) {
  $.ajax({
    method: 'POST',
    url: 'localhost:8080/check',
    data: { url: url}
  })
  .done((msg) => {
    document.getElementById('result').innerHTML = 'Got answer ' + msg;
  })
  .fail((msg) => {
    document.getElementById('result').innerHTML = 'Got answer ' + msg;
  });
}

$('#checkPage').on('click', () => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    document.getElementById('result').innerHTML = 'Checking... ' + tabs[0].url;
    queryPrometheus(tabs[0].url);
  });
});

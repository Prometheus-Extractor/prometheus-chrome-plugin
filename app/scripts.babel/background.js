'use strict';

factCache = {};

function queryPrometheus(url, port) {
  if(factCache.hasOwnProperty(url)) {
    if(port){
        port.postMessage({url: url, data: factCache[url]});
    }
    return;
  }

  console.log('Querying Prometheus for: ' + url);
  $.ajax({
    method: 'POST',
    url: 'http://prometheus-checker.duckdns.org:8081/check',
    data: {url: url}
  })
  .done((msg) => {
    factCache[url] = msg;
    console.log(msg);
    if(port){
        port.postMessage({url: url, data: factCache[url]});
    }
  })
  .fail((msg) => {
    factCache[url] = false;
    console.log(msg);
    if(port){
        port.postMessage({url: url, data: factCache[url]});
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active) {
    queryPrometheus(tab.url, null);
    chrome.browserAction.setBadgeText({'text': '!!!', 'tabId': tabId});
  }
})

chrome.extension.onConnect.addListener((port) => {
  console.log('Connected to popup.');
  port.onMessage.addListener(function(msg) {
    queryPrometheus(msg, port);
  });
})

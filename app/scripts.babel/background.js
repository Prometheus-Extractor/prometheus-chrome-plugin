'use strict';

factCache = {};

function queryPrometheus(url, port, tabId) {
  if(factCache.hasOwnProperty(url)) {
    if(port){
        var fact = factCache[url];
        if(fact === true) {
          setTimeout(function(){
            queryPrometheus(url, port, tabId);
          }, 500);
        }else{
          port.postMessage({url: url, data: factCache[url]});
        }
    }
    return;
  }

  factCache[url] = true; // Signal that the fact is currently being checked.
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
    if(tabId) {
        chrome.browserAction.setBadgeText({'text': '!', 'tabId': tabId});
    }
  })
  .fail((msg) => {
    delete factCache[url];
    console.log(msg);
    if(port){
        port.postMessage({url: url, data: factCache[url]});
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active) {
      queryPrometheus(tab.url, null, tabId);
  }
})

chrome.extension.onConnect.addListener((port) => {
    console.log('Connected to popup.');
    port.onMessage.addListener(function(msg) {
        queryPrometheus(msg, port, null);
    });
})

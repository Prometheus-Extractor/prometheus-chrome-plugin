'use strict';

function showResult(data) {

  if(data === undefined || data == null || data === false) {
    var errorMsg = '<div class="ui error message">' +
  '<div class="header">' +
    'Error while checking with Prometheus' +
  '</div>' +
  '<ul class="list">' +
    '<li>Check your internet</li>' +
    '<li>Wait 5 min</li>' +
    '<li>Try again</li>' +
    '</ul>' +
  '</div>';
    $('#result').html(errorMsg);
    return;
  }

  var items = '';
  for(var item of data) {

    items += '<div class="item">' +
              '<div class="content">';

    if(item.type == 'verified') {
      items +=   '<span class="header"><i class="icon green checkmark"></i>';
    } else if(item.type == 'conflicting') {
      items +=   '<span class="header"><i class="icon red remove"></i>';
    } else {
      items +=   '<span class="header"><i class="icon orange help"></i>';
    }

    items +=       '<a target="_blank" href="' + item.subject.link + '">' + item.subject.name + '</a> ' +
                  '<a target="_blank" href="' + item.predicate.link + '">' + item.predicate.name + '</a> ' +
                  '<a target="_blank" href="' + item.object.link + '">' + item.object.name + '</a> ' +
                '</span>' +
            //    '<div class="meta">' +
            //      '<span></span>' +
            //    '</div>' +
                '<div class="description">' +
                  '<div class="ui fluid accordion">' +
                    '<div class="title"><i class="dropdown icon"></i>Mentions</div>' +
                      '<div class="content">' +
                        '<ul>';
    for(var sentence of item.sentences){
      items += '<li>' + sentence + '</li>';
    }
    items +=  '</ul>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '<div class="extra">' +
              '<p>Sources: ';
    for(var e of item.evidence){
      items += '<a href="' + e.link + '" target="_blank">' + e.source + ' (' + Math.round(e.probability * 100) / 100 + '): ' + e.object + '</a> ';
    }
      items += '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
  }

  $('#result').html(items);
  $('.ui.accordion').accordion();
}

var port = chrome.extension.connect({
     name: 'Prometheus Fact-Checker'
});

port.onMessage.addListener(function(msg) {
     console.log('Message recieved', msg);
     showResult(msg['data']);
});

chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
  port.postMessage(tabs[0].url);
});

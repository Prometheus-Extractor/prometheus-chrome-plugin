'use strict';

function queryPrometheus(url) {
  $.ajax({
    method: 'POST',
    url: 'localhost:8080/check',
    data: { url: url}
  })
  .done((msg) => {
    document.getElementById('result').innerHTML = 'Got answer ' + msg;
    console.log(msg);
  })
  .fail((msg) => {
    document.getElementById('result').innerHTML = 'Got answer ' + msg;
    console.log(msg);
  });
}

function showResult(data) {
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
      items += '<a href="' + e.link + '" target="_blank">' + e.source + '</a> ';
    }
      items += '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
  }
  $('#result').html(items);
  $('.ui.accordion').accordion();
}

showResult([
  {
    'subject': {
      'name': 'Barack Obama',
      'link': 'https://www.wikidata.org/wiki/Q76'
    },
    'predicate': {
      'name': 'Married',
      'link': 'https://www.wikidata.org/wiki/Property:P26'
    },
    'object': {
      'name': 'Michelle Obama',
      'link': 'https://www.wikidata.org/wiki/Q13133'
    },
    'sentences': [
      'Barack married his wife Michelle'
    ],
    'type': 'verified',
    'evidence': [{
      'source': 'Wikipedia',
      'link': 'http://en.wikipedia.org/wiki/Obama',
      'snippet': 'Obama married Michelle.'
    }]
  },
  {
    'subject': {
      'name': 'Barack Obama',
      'link': 'https://www.wikidata.org/wiki/Q76'
    },
    'predicate': {
      'name': 'Married',
      'link': 'https://www.wikidata.org/wiki/Property:P26'
    },
    'object': {
      'name': 'Donald Trump',
      'link': 'https://www.wikidata.org/wiki/Q13133'
    },
    'sentences': [
      'Barack married his wife Michelle'
    ],
    'type': 'conflicting',
    'evidence': [{
      'source': 'Wikipedia',
      'link': 'http://en.wikipedia.org/wiki/Obama',
      'snippet': 'Obama married Michelle.'
    }]
  }
]);

$('#checkPage').on('click', () => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    document.getElementById('result').innerHTML = 'Checking... ' + tabs[0].url;
    queryPrometheus(tabs[0].url);
  });
});

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes

    // YOUR CODE GOES HERE!

    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
        'api-key': "4d2e91d1d55846dab43106a15782c381",
        'q': cityStr,
        'sort': "newest",
        
    });
    $.ajax({
        url: nytimesUrl,
        method: 'GET', //from NYT we 'get' JSON data. 
    }).done(function (data) { //when NYT API request succeed, then it works.
        $nytHeaderElem.text('New York Times articles about ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];

            $nytElem.append('<li class = "article">' + '<a href = "' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        };

    })
    return false;
};

$('#form-container').submit(loadData);

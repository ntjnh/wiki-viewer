// Search form
$("#search").submit(function(event) {
  event.preventDefault();
  var $results = $("#results");
  $results.empty();
  $results.hide();
  var searchedFor = $("#searchTerm").val();
  
  //make link using value from form
  var searchResults = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchedFor;
  
  //get data from api
  $.ajax(searchResults, {
    dataType: "JSON",
    data: {
      origin: "*"
    },
    type: "GET",
    success: function(article) {
      //print results 
      for (var i = 0; i < 10; i++) {
        //make elements
        var $title = $("<h3>", {"class": "result-title"});
        var $snip = $("<p>", {"class": "result-snip"});
        var $link = $("<a>", {"target": "_blank", "class": "open-page"});
        
        $title.text(article[1][i]);
        $snip.html(article[2][i]);
        $link.attr("href", article[3][i]);
        $link.append($title, $snip);
        $results.append($link);
        
        $results.fadeIn(1500);
      }
    }
  });
  $('#searchTerm').val("");
  
});
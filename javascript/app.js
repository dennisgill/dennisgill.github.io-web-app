$(document).ready(function() {
var topics = [];
 	function displaySimpson() {
        console.log(this);
        var input = this;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=OO26rsrtPVS5t1VYc0OjnG7MC7sHkKbp&limit=10";
        console.log(queryURL);
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {

                    var showDiv = $("<div class='column'>");
                    var source = results[i].source;
                    var defaultAnimatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var showImage = $("<img>");
                    var aref = $("<a href=\""+source+"\" target=\"_blank\">Source</a>")

                    showImage.attr("src", staticSrc);
                    showImage.addClass("userGiphy");
                    showImage.attr("data-state", "still");
                    showImage.attr("data-still", staticSrc);
                    showImage.attr("data-animate", defaultAnimatedSrc);
                    showDiv.empty().append(aref);
                    showDiv.append(showImage);
                    $("#gifArea").prepend(showDiv);

            }
        });
    }

    // "Go" button click event
    $("#addShow").on("click", function(event) {
        event.preventDefault();
        var newShow = $("#userInput").val().trim();
        // Make sure user inputs a value
        if (newShow == "")
        {
            alert("Please input a Value");
            return false;
        }
        else{
            $("#userInput").val('');
            displaySimpson.call(newShow);
            console.log(newShow);
        }
      });

  //Click event 
  $(document).on("click", ".userGiphy", pausePlayGifs);

  //Change gifs from still to animate and vice versa
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});
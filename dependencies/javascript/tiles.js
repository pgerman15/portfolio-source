$(document).ready(function(){
	$('#newTileButton').click(function(){
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
	});
	alert('load player');
	console.log("LOADING PLAYER");
	 // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '200',
          width: '200',
          videoId: 'OgDhAWRf0Ek',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          //setTimeout(stopVideo, 6000);
          //done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

	$('#tileText').keypress(function (e) {
	  if (e.which == 13) {
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
		$('#myModal').modal('hide');
		return false;    //<---- Add this line
	  }
	});
	//substring() and substr() are NOT interchangable
	$('#search').keypress(function (e) {
	  if (e.which == 13) {
		$.get( "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + $('#search').val() + "&key=AIzaSyDyk41ENXaIZ7uaM9YhXA7qN6afNDoSkBc&maxResults=10" ).then(
		  function(data) {
			alert( "$.get succeeded with data: " + JSON.stringify(data));
			data = JSON.stringify(data);
			var counter = 0;
			while(data.indexOf('videoId') > -1){
				var title = data.substring(data.indexOf('\"title\"') + 9, data.indexOf('thumbnails') - 3);
				var shortTitle = title;
				if(title.length > 15){
					shortTitle = title.substr(0, 15) + "...";
				}
				document.getElementById('vid' + counter).innerHTML =  "<span title='" + title + "'>" + shortTitle + "</span><button id='button" + counter + "' onclick='document.getElementById(\"player\").src = \"http://www.youtube.com/embed/" + data.substr(data.indexOf('videoId') + 10, 11) + 
				"?enablejsapi=1&origin=http://example.com" + "\"'>Add</button>";
				data = data.substring(data.indexOf('thumbnails') + 13);
				counter += 1;
			}			
		  }, function() {
			alert( "$.get failed!" );
		  }
		);
		return false;    //<---- Add this line
	  }
	});
	
	
});
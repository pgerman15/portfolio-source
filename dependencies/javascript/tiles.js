//alert('load player');
	var tileCounter = 0;
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
		 console.log("api ready");
        player = new YT.Player('player', {
          height: '200',
          width: '200',
          videoId: '8tPnX7OPo0Q',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
		console.log('player ready');
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


$(document).ready(function(){
	$('#newTileButton').click(function(){
		var x = Math.floor(Math.random() * 10);
		console.log(tileCounter + ', ' + x);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a onclick="changeVideo(\'#tile' + tileCounter + '\')" id="tile' + tileCounter + '" class="thumbnail tile-color-' + x + '" data-video-id="' + $('#myModal').data('video-id') + '">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
		tileCounter++;
	});
	
	$('#tileText').keypress(function (e) {
	  if (e.which == 13) {
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a onclick="changeVideo(\'#tile' + tileCounter + '\')" id="tile' + tileCounter + '" class="thumbnail tile-color-' + x + '" data-video-id="' + $('#myModal').data('video-id') + '">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
		tileCounter++;
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
				document.getElementById('vid' + counter).innerHTML =  "<span title='" + title + "'>" + shortTitle + "</span><i class='fa-save fa-2x fa' id='button" + counter + 
				"' onclick=\"saveId('" + data.substr(data.indexOf('videoId') + 10, 11) + "')\"></i><i class='fa-play-circle-o fa fa-2x sample' style='margin-left: 10px;'" + 
					 "onclick=\"player.cueVideoById('" + data.substr(data.indexOf('videoId') + 10, 11) + "'); player.playVideo();\"" + "></i>";
				data = data.substring(data.indexOf('thumbnails') + 13);
				counter += 1;
			}			
			//"' onclick=\"player.cueVideoById('" + data.substr(data.indexOf('videoId') + 10, 11) + "'); player.playVideo();\">Add</button>"
		  }, function() {
			alert( "$.get failed!" );
		  }
		);
		return false;    //<---- Add this line
	  }
	});
});

function saveId(id){
	$('#myModal').data('video-id', id);
}

function changeVideo(id){
	console.log(id);
	console.log($(id).text());
	player.cueVideoById($(id).data('video-id'));
	player.playVideo();
}
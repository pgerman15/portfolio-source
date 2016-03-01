$(document).ready(function(){
	$('#newTileButton').click(function(){
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
	});
	

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
				if(title.length > 15){
					title = title.substr(0, 15);
				}
				document.getElementById('vid' + counter).innerHTML =  title + "<button id='button" + counter + "' onclick='document.getElementById(\"player\").src = \"http://www.youtube.com/embed/" + data.substr(data.indexOf('videoId') + 10, 11) + 
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
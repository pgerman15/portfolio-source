$(document).ready(function(){
	$('#newTileButton').click(function(){
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
	});
	

	$('input').keypress(function (e) {
	  if (e.which == 13) {
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
		$('#myModal').modal('hide');
		return false;    //<---- Add this line
	  }
	});
	
	/*$.get( "https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&key=AIzaSyDyk41ENXaIZ7uaM9YhXA7qN6afNDoSkBc&maxResults=10" ).then(
	  function(data) {
		alert( "$.get succeeded with data: " + JSON.stringify(data));
	  }, function() {
		alert( "$.get failed!" );
	  }
	);*/
});
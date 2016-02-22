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
	
	$('#search').keypress(function (e) {
	  if (e.which == 13) {
		$.get( "https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&key=AIzaSyDyk41ENXaIZ7uaM9YhXA7qN6afNDoSkBc&maxResults=10" ).then(
		  function(data) {
			alert( "$.get succeeded with data: " + JSON.stringify(data));
			
			while($scope.resp.indexOf('videoId') > -1){
				document.getElementById('vid' + $scope.counter).innerHTML = ($scope.resp.substring($scope.resp.indexOf('\"title\"') + 9, $scope.resp.indexOf('thumbnails') - 3)) + 
				"<button id='button" + $scope.counter + "' onclick='document.getElementById(\"player\").src = \"" + $scope.urlPrefix + ($scope.resp.substr($scope.resp.indexOf('videoId') + 10, 11)) + 
				$scope.urlSuffix + "\"'>Add</button>";
				$scope.resp = $scope.resp.substring($scope.resp.indexOf('thumbnails') + 13);
				$scope.counter += 1;
			}
						
		  }, function() {
			alert( "$.get failed!" );
		  }
		);
		return false;    //<---- Add this line
	  }
	});
	
	
});
$(document).ready(function(){
	$('#newTileButton').click(function(){
		var x = Math.floor(Math.random() * 10);
		$tile = $('<div class="col-xs-6 col-sm-3 col-lg-2"><div class="dummy"></div><a id="tile' + x + '" class="thumbnail">' + $('#tileText').val() + '</a></div>');
		$('#mainRow').append($tile);
		count += 1;
	});
});

function createTile(tileLabel){
	var newtile = document.createElement("div");
	newtile.className = "col-xs-6 col-sm-3 col-lg-2";
	newtile.innerHTML="<div class='dummy'></div><a id='tile1' class='thumbnail'>" + tileLabel + "</a>"
	document.getElementById("mainRow").appendChild(newtile);
}
function createTile(tileLabel){
	var newtile = document.createElement("div");
	newtile.className = "col-xs-6 col-sm-3 col-lg-2";
	newtile.innerHTML="<div class='dummy'></div><a id='tile1' class='thumbnail'>" + tileLabel + "</a>"
	document.getElementById("mainRow").appendChild(newtile);
}
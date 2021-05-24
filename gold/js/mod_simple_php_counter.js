//mod_simple_php_counter.js

var xhr = new XMLHttpRequest();
	xhr.open("GET", "php/simplephpcounter/count.php?folder=labirint");
	xhr.onload = function()
	{
				
		console.log("#4 " + xhr.response);
				
		if((""+xhr.response).indexOf("error")!=-1)
		{
			alert("was error on server");
		}
		else
		{
		//	constructAndShowBBCode( xhr.responseText );
			console.log("#4-1 " + xhr.response);
			
		}
				
	}
    xhr.send();
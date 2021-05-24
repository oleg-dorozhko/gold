function whenSaveImageOnServerButtonClicked(pswd, folder_name, name, canvas, callback)
{
	
	var imageStr = canvas.toDataURL(); //  = "data:image/png...."
			
	var formData = new FormData();
	
    formData.append( "password", pswd );	
	formData.append( "folder_name", folder_name );
	formData.append( "image_name", name );
	formData.append( "img0", imageStr );
	
	// отослать
			
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "php/save_image_on_server.php");
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
			
			callback();
				
		}
				
	}
    xhr.send(formData);
			
	
	
}



function make_gif_php_call(pswd, folder_name,  frequence, author, callback)
{
	
	
			
	var formData = new FormData();
	
    formData.append( "password", pswd );	
	formData.append( "folder_name", folder_name );
	formData.append( "frequence", frequence );
	formData.append( "author", author );
	// отослать
			
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "php/make_gif.php");
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
			
			callback(xhr.responseText);
				
		}
				
	}
    xhr.send(formData);
			
	
	
}






















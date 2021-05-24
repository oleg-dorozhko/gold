function create_new_base( pswd, filename, folder_name, canvas, onsuccess, onerror  )
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'php/check_errors.php?folder_name='+folder_name+'&name='+filename);
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('mod_base:create_new_base(...): unknown error ' + xhr.status + ': ' + xhr.statusText);
			console.log('mod_base:create_new_base(...): unknown error ' + xhr.status + ': ' + xhr.statusText);
			if( onerror)  onerror();
		}
		else
		{
			
			
				var imageStr = canvas.toDataURL(); //  = "data:image/png...."
			
				var formData = new FormData();
	
				formData.append( "password", pswd );	
				formData.append( "folder_name", folder_name );
				formData.append( "filename", filename );
				formData.append( "img0", imageStr );
				
				// отослать
						
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "php/create_new_base.php");
				xhr.onload = function()
				{
							
					console.log("#4 " + xhr.response);
							
					if((""+xhr.response).indexOf("error")!=-1)
					{
						alert("was error on server");
						console.log('mod_base:create_new_base(...): unknown error ' + xhr.status + ': ' + xhr.statusText);
					}
					else
					{
					
						console.log("ok\n " + xhr.response);
						
						onsuccess(xhr.responseText);
							
					}
							
				}
				xhr.send(formData);
			
			
		}
	}
	
	xhr.send();
	
	
}
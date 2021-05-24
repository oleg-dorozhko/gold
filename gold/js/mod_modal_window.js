function modal_window(filename, id, oncreate )
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'html/'+filename);
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('modal_window(): unknown error ' + xhr.status + ': ' + xhr.statusText)
		}
		else
		{
			var div = document.createElement("div");
			div.id="modal_window_"+id;
			div.innerHTML = xhr.responseText;
			
			document.body.appendChild(div);
	
			var clmw = document.getElementById("close_modal_window");
			if(clmw != null)
			{
				clmw.id="close_modal_window_"+id;
				
				clmw.onclick = function() 	{
					
					document.body.removeChild(document.getElementById("modal_window_"+id));
					
				}
			}
			
			
			
			if ( oncreate ) ( oncreate ( "modal_window_"+id ));
				
			
			
		}
	}
	xhr.send();
	
}

function simple_modal_window( filename, onload )
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'html/'+filename);
	xhr.onload = function ()
	{
		if (xhr.status != 200) 
		{
			alert('simple_modal_window(): unknown error ' + xhr.status + ': ' + xhr.statusText)
		}
		else
		{
			if ( onload )  onload( xhr.responseText);
			
		}
	}
	xhr.send();
	
}
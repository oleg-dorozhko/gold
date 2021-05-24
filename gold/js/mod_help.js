function show_help()
{
	simple_modal_window( 'help_div.html',   function(data) 
	{
		if(document.getElementById("modal_window_help_window")==null) 
		{
			var div = document.createElement("div");
			div.id = "modal_window_help_window";
			document.body.appendChild(div);
		}
			
		
		document.getElementById("modal_window_help_window").innerHTML = data;
		
		document.getElementById("modal_window_help_window_close").onclick = function(){
			if(document.getElementById("modal_window_help_window"))
			document.body.removeChild(document.getElementById("modal_window_help_window"));
		}
		
		
		
		
	});
	
	
	
}
	
	
	
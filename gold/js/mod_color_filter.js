var global_seed_size = 17;
var glob_allowed_copy_center = false;
var global_max_seed_size = 71;
var global_selected_seed = null;
var global_arr_objects = null;
var glob_colors = null;
var global_first_seed_image_data = null;
var glob_allowed_copy_right = false;
var global_bottom_selected = null;
var global_red_ghost = null;
var global_galerka_selected = null;
var first_click = false;
var second_click = false;
var global_inverse_mode=false;
var glob_colored_adding_counter=0;
var global_color_fields_array = [];
var global_last_selected_object=null;
var global_mapped_colors = null;
var global_loading_new = true;
var glob_canvas_selected = null;
var glob_sound_off = false;
var global_selected_awaiting_magik_line = null;
var glob_float_mode = true;
var global_game_finished = false;
var glob_koloda = null;
var global_hint_switch = false;
var glob_selected_kard=-1;
var glob_colored_special_arr = null;
var glob_koloda_checkbox = false;
var glob_plus_button = null;

function call_f777( url, callback )
{
	var e = document.createElement("script");
	e.type="text/javascript";
	e.id = "jinn"; 
	e.src = url;
	e.onload = function()
    {
		// alert('loaded');
		callback();
    }
	e.onerror = function()
	{
		alert('erorr');	
	}
	
	document.getElementsByTagName("head")[0].appendChild(e); 
	
}



function re()
{
	var gen = document.getElementById("jinn");
	if(gen != null) document.getElementsByTagName("head")[0].removeChild(gen);
	
	call_f777( 'js/mod_color_filter2.js', function(){ console.log('loaded');} );
	
}

function ajax_server_call( param1, param2, success )
{
	var formData = new FormData();
	formData.append( "param1", param1 );
	formData.append( "param2", param2 );
	var xhr = new XMLHttpRequest();
	xhr.onload = function()
	{
		var s = ""+xhr.response;
		if(s.indexOf("server:get_html():error:")!=-1)
		{
			alert("was error on server \n" + s);
		}
		else
		{
			var html = s;
			var div = document.createElement("div");
			div.id = param1;
			
			document.body.appendChild(div);
			if(document.getElementById(param1)!=null)
			{
				console.log('loaded');
				div.innerHTML = html;
				success();
			}
			else alert('not loaded');
				
		}		
	}
    xhr.open("POST", "php/get_html.php");
    xhr.send(formData);
}

function loadHTML( password0, callback )
{
	ajax_server_call("root_content", password0, function() {  callback(); } );
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


window.onload = function()
{
	
	var err = localStorage.getItem('was exit');
	if(err!=null)
	{
		localStorage.removeItem('was exit');
		var msg=localStorage.getItem('err_msg');
		localStorage.removeItem('err_msg');
		
		if(err=="1000")
		{			
			document.write(msg);
			return;
		}
	}
	
	var cmd = localStorage.getItem("to_portal");
	if(cmd!=null)
	{
		if(cmd=="true")
		{
			localStorage.removeItem("to_portal"); 
			var path = "html/_index2.html";
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function()
			{
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						document.body.innerHTML = xhr.responseText;
						 setTimeout( init_pazzl, 200);
							//success(JSON.parse(xhr.responseText));
						
					} else {
						if (error)
							error(xhr);
					}
				}
			};
			xhr.open("GET", path, true);
			xhr.send();
			
			
			
			
			
			
			
			// loadJSON('security/fi77leNo2469.json', function(data) { console.log(data); 
			
	// loadHTML( data.password_level, function() { call_f777( 'js/mod_color_filter2.js', function(){ setInterval(agni, 3000); initGame(); } ); } );
	
	// }, function(xhr) { console.error(xhr); 
	
	// var password_level = prompt("Enter your password (for level)");
	// if(password_level == null) return;
	
	// loadHTML( password_level, function() { call_f777( 'js/mod_color_filter2.js', function(){ initGame(); } ); } );
	
	// } );

			
			
			
			return;
		}
	}
	
	
	loadJSON('security/fileN_h7o2469.json', function(data) { console.log(data); 
	
	loadHTML( data.password_level, function() { call_f777( 'js/mod_color_filter2.js', function(){ setInterval(agni, 3000); initGame(); } ); } );
	
	}, function(xhr) { console.error(xhr); 
	
	var password_level = prompt("Enter your password (for level)");
	if(password_level == null) return;
	
	loadHTML( password_level, function() { call_f777( 'js/mod_color_filter2.js', function(){ initGame(); } ); } );
	
	} );

	
}

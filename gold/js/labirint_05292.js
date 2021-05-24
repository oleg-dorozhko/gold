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
//window.onload = init_pazzl;
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


function loadEngine( url, callback )
{
	var e = document.createElement("script");
	e.type="text/javascript";
	e.id = "engine"; 
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

function reloadEngine()
{
	var engine = document.getElementById("engine");
	if(engine != null) document.getElementsByTagName("head")[0].removeChild(engine);
	
	loadEngine( 'js/mod_v3578.js', function(){ console.log('loaded');} );
	
}

function init_pazzl()
{
	loadEngine( 'js/mod_v3578.js', function(){ initGame(); } );
	
	document.getElementById("reload_engine").onclick = reloadEngine;
	
}



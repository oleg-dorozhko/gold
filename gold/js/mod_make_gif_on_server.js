var global_password=null;
var global_folder_name=null;
var global_login=null;
var global_email=null;
var global_make_gif_big_size_array=[];
var glob_make_gif_delay=200;
function save_game_on_server() {
	
	var lst = document.getElementById("canvases").childNodes;
	for(var i=0;i<lst.length;i++)
	{
		if(lst[i].id.indexOf("save_canvas_")===0){
			var im = lst[i];//.getContext("2d").getImageData(0,0,lst[i].width,lst[i].height);
			global_make_gif_big_size_array.push({name:lst[i].id,im:im});
		}
	}
	global_password="1";
	global_folder_name="aaa777vvv";
	var gl = prompt('Enter your folder name',global_folder_name);
	if(gl==null) return;
	global_folder_name=gl;
	setTimeout( function() { 
		save_global_make_gif_big_size_array( when_all_images_saved );
	}, glob_make_gif_delay );
}

function when_all_images_saved()
{
								
	
		
		// var frequence=400;//Number(document.getElementById('frequence_of_gif').value);
		// var author="Unknown";//document.getElementById('author_of_gif').value;
		// make_gif_php_call(global_password, global_folder_name, frequence, author, function(url_gif)
		// {
			// change_save_mode_for_insane_rotate_off();
			// var gif_wnd = window.open('GIF','This is your gif','width=400,height=400');
			// gif_wnd.document.write("<img src='"+global_url_to_images+"/"+url_gif+"/animation.gif'>");
			
			// document.getElementById('image_button22').classList.toggle('image_button_selected');
			// document.getElementById('image_button22').classList.toggle('image_button_mode_gif');
			// document.getElementById('image_button22').classList.toggle('image_button_unselected');
			
		// });
		
	
				
}


function save_global_make_gif_big_size_array(callback)
{
	if(global_make_gif_big_size_array.length==0) { callback(); return;}
	
	
	var tCanvas =  global_make_gif_big_size_array[0].im;//document.createElement("canvas");
	// tCanvas.width = global_make_gif_big_size_array[0].width ;
	// tCanvas.height = global_make_gif_big_size_array[0].height;
	// var tContext = tCanvas.getContext("2d");
	// tContext.putImageData(global_make_gif_big_size_array[0].im,0,0);	
	var name = global_make_gif_big_size_array[0].name;
	global_make_gif_big_size_array.splice(0,1);
	
	
	
	whenSaveImageOnServerButtonClicked( global_password, global_folder_name, name, tCanvas, function(){
											
																						
			
	setTimeout( function() { save_global_make_gif_big_size_array( callback) } , glob_make_gif_delay	);
	
	
				
		
	});
		
}
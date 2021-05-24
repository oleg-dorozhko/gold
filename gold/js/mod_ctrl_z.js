function inv ( a )
{
	return (255 - a);
}


function getinversion(imgData)
{
	
	var w = imgData.width;
	var h = imgData.height;
	
	
	var im0 = imgData;
			
		var canvas2 = document.createElement("canvas");
		canvas2.width = w;
		canvas2.height = h;
		var context2 = canvas2.getContext("2d");
		
		var im = context2.getImageData(0,0,canvas2.width,canvas2.height);

				
			

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var new_idx = idx;
					
					im.data[new_idx] =   inv ( im0.data[idx] );
					im.data[new_idx+1] =  inv ( im0.data[idx+1] );
					im.data[new_idx+2] =  inv ( im0.data[idx+2] );
					im.data[new_idx+3] =  255;
					
					
					
					
				}
			}

			
			return im;
			

}

function setbuffer(imgData)
{
	var canvas2 = document.getElementById("buffer_canvas1");
	canvas2.width = imgData.width;
	canvas2.height = imgData.height;
	var context2 = canvas2.getContext("2d");
	context2.putImageData(imgData,0,0);
}

function getbuffer()
{
	var canvas2 = document.getElementById("buffer_canvas1");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	return imgData2;
}

function getcopy()
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	return imgData2;
}

function copyback(imgData)
{
	var imgdata4 = getcopy();
	var canvas2 = document.getElementById("canvas0");
	canvas2.width = imgData.width;
	canvas2.height = imgData.height;
	var context2 = canvas2.getContext("2d");
	context2.putImageData(imgData,0,0);
	setbuffer(getinversion(imgdata4));
}

function repeat()
{
	setbuffer(getinversion(getcopy()));
}

function call_control_z_function() {
	
	var imgData = getcopy();
	var canvas2 = document.getElementById("ctrlz_canvas_id");
	canvas2.width = imgData.width;
	canvas2.height = imgData.height;
	var context2 = canvas2.getContext("2d");
	context2.putImageData(imgData,0,0);
	
	canvas2.setAttribute("xs",glob_x_left_top);
	canvas2.setAttribute("ys",glob_y_left_top);

}

function call_re_control_z_function() {
	
	var canvas2 = document.getElementById("ctrlz_canvas_id");
	var context2 = canvas2.getContext("2d");
	var imgData = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var canvas = document.getElementById("canvas0");
	canvas.width = imgData.width;
	canvas.height = imgData.height;
	var context = canvas.getContext("2d");
	context.putImageData(imgData,0,0);
	
	glob_x_left_top = Number(canvas2.getAttribute("xs"));
	glob_y_left_top = Number(canvas2.getAttribute("ys"));
		
			refresh_map();
		f_send_to_server_changed_canvas( function(){
																
			f_labirint(glob_x_left_top,glob_y_left_top);
			launch_robot();
			call_control_z_function();
		//	save_key_point_canvas();
		//  save_micro_for_gif();
		    refresh_map();
			global_do_work=false;	
	});
			
	

}

function _ctrlz()
{
	copyback(getinversion(getbuffer()));
}
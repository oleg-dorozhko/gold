var global_state=null;
var PAUSED=7;
var PAUSE_INTERVAL=200;
var MOTION_ANIMATING=9;
var MOTION_ANIMATING_PAUSE_INTERVAL=1000;
var global_right_mouse_initiated=false;
var glob_takes_counter=0;

function i_found_gold()
{
	console.log('I found gold!!');
}

function wizardry()
{
	//alert('OMG! I found a magik stone! \nOk. I\'ll put it in my pocket.\nmove_to on stone now!');
	//addStone();
}
function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}

function og(s)
{
	console.log(s);
}

function addStone(wh, callback)
{
	//var wh=3;
	//wh=0;
			var x=glob_x_left_top;
			var y=glob_y_left_top;
			var scale_koeficient=2;
			var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			glob_x_left_top=x;
			glob_y_left_top=y;
			
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/add_boh_pixel', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
				
					newImg.onload = function() {	
					
					// showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					getChaosedLabirint(function(){
					
						
						callback();
					
					}
					);
					
					
					
					
					
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);	
				
}

function free_prev_labirint( callback )
{
	//reinitialization server-side stones
	// var params='md5='+glob_session_id;
	// var xhr = new XMLHttpRequest();
	// xhr.open('POST', global_url_to_glab+'/clear_stones', true);
	// xhr.onload = function(e) {  

		// if (xhr.readyState != 4) return;
	
		// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
		
		
		callback();
		
		
	// }

	// xhr.send(params);
	
	
	
	
	
}



function motion_animate(x,y)
{
	global_state=MOTION_ANIMATING;
			
			global_dummy_fast_thread_imgData=fillRectangleFast(global_dummy_fast_thread_imgData,x,y,1,1,[255,0,0,255]);
			//global_fill_color);
			var canvas7 = document.getElementById("canvas0");
			var context7 = canvas7.getContext("2d");
					
			context7.putImageData(global_dummy_fast_thread_imgData,0,0);	
		
	
	setTimeout( function(){
		
		
		
			global_dummy_fast_thread_imgData=fillRectangleFast(global_dummy_fast_thread_imgData,x,y,1,1,getWhiteSpaceColor());//global_fill_color);
			var canvas7 = document.getElementById("canvas0");
			var context7 = canvas7.getContext("2d");
					
			context7.putImageData(global_dummy_fast_thread_imgData,0,0);	
		
			global_state=null;
		
	},MOTION_ANIMATING_PAUSE_INTERVAL/2|0);
	
	
		// var arr=getWHDNeighbors(x,y,1,1);//global_dummy_fast_thread_imgData
		// for(var j=0;j<arr.length;j++)
		// {
			// var x2=arr[j][0];
			// var y2=arr[j][1];
			// global_dummy_fast_thread_imgData=fillRectangleFast(global_dummy_fast_thread_imgData,x2,y2,1,1,[0,255,255,255]);//global_fill_color);
			// var canvas7 = document.getElementById("canvas0");
			// var context7 = canvas7.getContext("2d");
					
			// context7.putImageData(global_dummy_fast_thread_imgData,0,0);	
		// }
	
	// setTimeout( function(){
		
		
		// var arr=getWHDNeighbors(x,y,1,1);//global_dummy_fast_thread_imgData
		// for(var j=0;j<arr.length;j++)
		// {
			// var x2=arr[j][0];
			// var y2=arr[j][1];
			// global_dummy_fast_thread_imgData=fillRectangleFast(global_dummy_fast_thread_imgData,x2,y2,1,1,getWhiteSpaceColor());//global_fill_color);
			// var canvas7 = document.getElementById("canvas0");
			// var context7 = canvas7.getContext("2d");
					
			// context7.putImageData(global_dummy_fast_thread_imgData,0,0);	
		// }
		
		// global_state=null;
		
	// },200);
}

//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_x_left_top = 1;
var glob_y_left_top = 1;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

function whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_x_left_top = x;
		glob_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		showScaleDiv(e.target,x,y);
		redrawPixels_main(context, x,y);
		
	}
			
}	
	
function setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas0").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		pcnv.oncontextmenu = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					//e = (e) ? e : event;   
					//if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main_right(document.getElementById("canvas0").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	//scale_div.style.visibility = 'hidden'; //visible
	setEventListenersOnMap();	
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
}		
		
function showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').style.display="none";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas0').width+" x "+document.getElementById('canvas0').height+ " ";
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').style.display="none";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
	// var el = document.getElementById('btn_pixels_clean');
	// el.style.border = "";
    // el.style.visibility='visible';
	// el.style.display="inline-block";
	
	
	
	setEventListenersOnTri_Btns()
}



function setEventListenersOnTri_Btns()
{
		// var btn = document.getElementById("btn_lt");
		// btn.onclick = function()
		// {
			
			// server_crop(glob_x_left_top,glob_y_left_top,1);
			// //document.getElementById("scale_div").style.border = '';
			// document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		// }
		
		// btn = document.getElementById("btn_rb");
		// btn.onclick = function()
		// {
			
			// server_crop(glob_x_left_top,glob_y_left_top,2);
			// //document.getElementById("scale_div").style.border = '';
			// document.getElementById("scale_div").style.visibility = 'hidden';
			
		// }
		
		// var btn = document.getElementById("btn_catch_it");
		// btn.onclick = function()
		// {
			// //document.getElementById("scale_div").style.border = '';
			
			// gcombo_catch_it(glob_x_left_top,glob_y_left_top);
			// redrawPixels_main(document.getElementById("canvas0").getContext("2d"), glob_x_left_top,glob_y_left_top);
			// //document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			// s_gcombo();
		// }
		
		var btn = document.getElementById("btn_pixels_close");
		btn.onclick = function()
		{
			// //document.getElementById("scale_div").style.border = '';
			
			// _ctrlz();
			document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
			
			
			var el = document.getElementById('btn_pixels_clean');
			el.style.border = "";
		//	el.style.visibility='hidden';
			//el.style.display="none";
		//	document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			//document.getElementById("scale_div").style.display = 'none'; //visible
			global_do_work=false;
			
			
			
			
		}
		var btn = document.getElementById("btn_pixels_save");
		btn.onclick = function()
		{
			save();
			
			
		}
		var btn = document.getElementById("btn_pixels_wiz");
		btn.onclick = function()
		{
			wizardry();
			
			
		}
		
		 

}


 function btn_pixels_clean()
		{
			//glob_little_belly_pressed=false;
			
			// var num_dif_colors =0;
			// //var num_dif_colors = countDifferColorsOn();
			
			// //if((num_dif_colors>0)||(document.getElementById("collected_div").childNodes.length<3))
			// {
				// //alert('Collect all magik stones before. ...and wiz');
				// ////alert('Collect all plutonium before. Beware!\n...and tickle my little belly. Do not forget.');
				// //return;
			// }
			
		
			
			
			
			
			 // get_neighbours(glob_x_left_top,glob_y_left_top, function( colors ) {
			
				
			
						// console.log('glob_x_left_top='+glob_x_left_top);
						// console.log('glob_y_left_top='+glob_y_left_top);
						// console.log('colors='+colors);
						// alert('Solve my puzzle before! It will be opened in new tab.');
						// //var session_number_seed=(new Data()).getTime();
						
					// //	_ctrlz();
					// if(colors.length==0)
					// {						
					// var canvas7 = document.getElementById("canvas0");
					// var context7 = canvas7.getContext("2d");
					// var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);
					// var bgcolor = getColorArrayFromImageData(imgData7, glob_x_left_top, glob_y_left_top);
						// console.log(bgcolor);
						
					// imgData7=fillRectangleFast(imgData7,glob_x_left_top,glob_y_left_top,1,1,getWhiteSpaceColor());
					// context7.putImageData(imgData7,0,0);
						
						
						
					// // context7.strokeStyle='rgba(255,0,0,1.0)';
					// // context7.strokeRect(glob_x_left_top-1,glob_y_left_top-1,3,3);
					// //context7.beginPath();
					// //context7.arc(glob_x_left_top,glob_y_left_top,.5,0,2*Math.PI);
					// //context7.stroke();
					// }
						
						
						
						// document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
						// var el = document.getElementById('btn_pixels_clean');
						// el.style.border = "";
						// //el.style.visibility='hidden';
						// //el.style.display="none";
						// //document.getElementById("scale_div").style.visibility = 'hidden';
						
						// //window.open("http://s954447o.bget.ru/labirint");
						// //location.href='http://s954447o.bget.ru/labirint';//?url_for_winner=http://localhost/colors555?session='+md5(session_number_seed);
						
						// doLeftClick(glob_x_left_top,glob_y_left_top, function() {
							
							// var arr = dummy_pixells(x,y);
							
							// post_bubabu(arr[0],[0,0,255,120]); 
							var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
							call_non_salamandra(arr[1][0][0],arr[1][0][1]);
							
							if(glob_all_generated_stones.length==1)
							{
							
							console.log(glob_all_generated_stones);
							
							// prepare_clean_single_pixels(  function(  ) { 
							
								// clean_single_pixels( function(  ) { 		
							
									
									var x =glob_all_generated_stones[0].x;
									var y = glob_all_generated_stones[0].y;
									
									
									
									
									// var x = e.offsetX==undefined?e.layerX:e.offsetX;
					// var y = e.offsetY==undefined?e.layerY:e.offsetY;
					// var n = (x/10|0)-7;
					// var m = (y/10|0)-7;
					
					// glob_x_left_top += n;
					// glob_y_left_top += m;
									
									
									
									
									
									
									
									
									
									
									
						//		call_non_salamandra((x+7)*10,(y+7)*10);
									
									
									
									
									
								}		
									// send_to_server_changed_canvas( function(){//and collected stones to treasure
													
										// // free_prev_labirint( function() {
						//		else	 location.reload();					
											// // get_last_version_of_pattern( function() { reload_pixels(); global_do_work=false; 	} );	
																
																// // //global_do_work=false;
															// // //setTimeout(	processing_click, 100);
										// // });
								
									// });
						//		});
									
									
						//	});
						// });
				// });
			
			
			
		 }


//var global_url_to_glab='https://patterns-editor.herokuapp.com';
//var global_url_to_ws='wss://patterns-editor.herokuapp.com/';

var global_url_to_glab='http://localhost:5000';
var global_url_to_ws='ws://localhost:5000';

var glob_all_collected_stones=[];
var glob_all_generated_stones=[];
var glob_session_id=null;
var glob_pattern_id=null;
var glob_player_settings_id=null;
//var glob_little_belly_pressed=false;
var glob_x_left_top_last=1;
var glob_y_left_top_last=1;

var glob_moves_counter=0;
var glob_gold_counter=0;

function get_center_point()
{var canvas = document.getElementById('canvas0');
	var w = canvas.width;
	var h = canvas.height;
	var x =(w/2|0);
	var y =(h/2|0);
	glob_x_left_top=x;
	glob_y_left_top=y;
	if( is_white_xy(x,y)) {
		avtomatik_move_to();
		return [glob_x_left_top,glob_y_left_top];
	}
	
	// if(is_gold_xy(x,y))
	// {
		
	// }
	// else
	// {
		var arr = dummy_fast(x,y);
		for(var i=0;i<arr[1].length;i++)
		{
			if(is_gold_xy(arr[1][i][0],arr[1][i][1])) continue;
			if(tr_black_xy(arr[1][i][0],arr[1][i][1])) continue;
			if(is_white_xy(arr[1][i][0],arr[1][i][1])) continue;
			
			if(arr[1][i][0]<1) continue;
			if(arr[1][i][0]>w-2) continue;
			if(arr[1][i][1]<1) continue;
			if(arr[1][i][1]>h-2) continue;
		
			return arr[1][i];
		}
	//}
	
	return [];
	
}

function set_gold()
{
	var pasted = localStorage.getItem("pasted");
	if(pasted==null || pasted=="false")
	{
		localStorage.clear();
		
		var canvas = document.getElementById('canvas0');
	var w = canvas.width;
	var h = canvas.height;
		var p = get_center_point();
		
		glob_x_left_top=p[0];
		glob_y_left_top=p[1];
		 
		var ctx = canvas.getContext("2d");
		
		for(var i=0;i<10;i++)
		{	
			var xr = -1; 
			var yr = -1;
			do
			{
				xr = getRandomInt(1,canvas.width-1);
				yr = getRandomInt(1,canvas.height-1);
				if(is_gold_xy(xr,yr)) continue;
				if(is_gold_near(xr,yr)) continue;
				if((xr==glob_x_left_top)&&(yr==glob_y_left_top)) continue;
				break;
			}
			while(true);
			ctx.fillStyle="gold";
			ctx.fillRect(xr,yr,1,1);
		} 
		
		localStorage.setItem("pasted","false");
	}	
	
	 //	refresh_map();
		
	// save_for_gif();
	
}


function pattern2canvas( session_id)
{
	glob_session_id = session_id;
	
	

	
	
	getChaosedLabirint(  function() { 
	
	
	if(check_all_white()) {clean();}
	
	
	// save();
						
	var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top;		
	
				var xhr = new XMLHttpRequest();
				xhr.open('POST', global_url_to_glab+'/get_xy_labirint', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					
					//avtomatik_move_to();
					
					// var canvas0 = document.getElementById("canvas0");
					// var context0 = canvas0.getContext("2d");
					// var color = get_near_first_non_white(context0,glob_x_left_top,glob_y_left_top);
					
					
					// if(color==null)
					// {
						// //
						// glob_x_left_top=document.getElementById("canvas0").width/2|0;//Number(obj.x);
					    // glob_y_left_top=document.getElementById("canvas0").height/2|0;//Number(obj.y);
						
					
						
					// }
					document.getElementById("pixels").style.display='block';
						
					var cmd = localStorage.getItem("from_portal");
	if(cmd!=null)
	{
		if(cmd=="true")
		{
			var x = Number(localStorage.getItem("xs"));
			var y = Number(localStorage.getItem("ys"));
			localStorage.removeItem("xs");
			localStorage.removeItem("ys");
			localStorage.removeItem("from_portal");
			refresh_map();
			call_non_salamandra(x,y);
			return;
		}
			
	}		


	// glob_game_only_start=localStorage.getItem("glob_game_only_start");
	// if(glob_game_only_start==null) {
		// glob_game_only_start=true;
		// localStorage.setItem("glob_game_only_start","true");
	// }
	// else {
		// glob_game_only_start=false;
		// localStorage.setItem("glob_game_only_start","false");
	// }
	
	
	
	// if(glob_game_only_start)  
	// {
							
		// glob_game_only_start=false;
	

	glob_moves_counter = localStorage.getItem("glob_moves_counter");	
	if(glob_moves_counter==null) {
		glob_moves_counter=0;
		localStorage.setItem("glob_moves_counter","0");																		
	}
	else {
		glob_moves_counter = Number(glob_moves_counter);
		localStorage.setItem("glob_moves_counter",""+glob_moves_counter);	
	}
	
	document.getElementById("moves_span_id").innerHTML = "MOVES: "+glob_moves_counter;

	
	glob_gold_counter = localStorage.getItem("glob_gold_counter");	
	if(glob_gold_counter==null) {
		glob_gold_counter=0;
		localStorage.setItem("glob_gold_counter","0");																		
	}
	else {
		glob_gold_counter = Number(glob_gold_counter);
		localStorage.setItem("glob_gold_counter",""+glob_gold_counter);	
	}
	
	document.getElementById("gold_span_id").innerHTML = "GOLD: "+glob_gold_counter;

	if (( exist_any_gold() == false ) && glob_gold_counter == 0 ) 
	{	
		set_gold();
		
		//remove_first_for_gif();
		//save_for_gif();
		//show_hide_make_gif_div();
		//white_square();
		set_xy_w2h2(
		
		function(){
			
			
			refresh_map();
		send_to_server_changed_canvas( function(){
																
			labirint(glob_x_left_top,glob_y_left_top);
			launch_robot();
			save_key_point_canvas();
		//save_micro_for_gif();
		show_hide_map();
			global_do_work=false;	
	});
			
			
			
			
		}
		
		
		
		
		);
		//set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
	}
	else{
		
		
		var pasted = localStorage.getItem("pasted");
	if(pasted=="true")
	{
		var p = get_center_point();
		if(p.length==2){
		glob_x_left_top=p[0];
		glob_y_left_top=p[1];
		}
		
		
	}
	
	localStorage.setItem("pasted","false");
		
		
		
	refresh_map();
		send_to_server_changed_canvas( function(){
																
			labirint(glob_x_left_top,glob_y_left_top);
			launch_robot();
			global_do_work=false;	
	});
	}
					}
				xhr.send(params);
	
	
	});
	
}

function set_xy_w2h2(callback)
{
	var canvas = document.getElementById('canvas0');
	var w = canvas.width;
	var h = canvas.height;
	
	var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top;		
//	glob_x_left_top=(w/2|0);
//	glob_y_left_top=(h/2|0);
	
		var xhr22 = new XMLHttpRequest();
		xhr22.open('POST', global_url_to_glab+'/set_xy_labirint', true);
		xhr22.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr22.responseType = "blob";
		xhr22.onload = function() {  
			
			if (xhr22.readyState != 4) return;

			if (xhr22.status != 200) {  var error = xhr22.status + ': ' + xhr22.statusText+': '+xhr22.response; onerror(error); return; }
			
			// var newImg = document.createElement("img");
								
				// var urlCreator = window.URL || window.webkitURL;
				
				// var imageUrl = urlCreator.createObjectURL(xhr22.response);
					
				// newImg.onload = function() {	
					
					// var canvas = document.getElementById('canvas0');
					
					// canvas.width = newImg.width;
					// canvas.height = newImg.height;
					// var context = canvas.getContext("2d");
					// context.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					if(callback) callback();
					
			
				// }
				// newImg.src=imageUrl;	
				
						
		}				
		xhr22.send(params);
		
}

function white_square()
{
	var canvas = document.getElementById('canvas0');
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	context.putImageData(fillRectangleFast(imageData, 0, canvas.height-2, 2, 2, getWhiteSpaceColor() ),0,0);
}



window.addEventListener('error', function (e) {
	og('in my error handler:');
    var stack = e.error.stack;
    var message = e.error.toString();
    if (stack) {
        message += '\n' + stack;
    }
	og(message);
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', '/log', true);
    // xhr.send(message);
});

// function onerror(error)
// {
	// console.log(error);
	
// }

function get_session_id(callback)
{
	//yet, here, we need check free localStorage access yet
	var last_session_md5 = localStorage.getItem('last_session_md5');
	var params='md5=new';
	if( last_session_md5 != null ) params='md5='+last_session_md5;
	
params+='&rnd_pattern_schema=4';
	try
	{
		var xhr = new XMLHttpRequest();
		
		xhr.open('POST', global_url_to_glab+'/get_labirint_id', true);
		
		xhr.onload = function(e) {  

			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
				
			localStorage.setItem('last_session_md5', xhr.responseText);
				
			callback(xhr.responseText);
			
			
		}
		
		xhr.send(params);
		
	}
	catch(err)
	{
		onerror(err);
	}
	
}

function get_url_to_ws(callback)
{
	var params='md5=new';
	var xhr = new XMLHttpRequest();
	xhr.open('POST', global_url_to_glab+'/get_url_to_ws', true);
	xhr.onload = function(e) {  

		if (xhr.readyState != 4) return;
	
		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
		var obj=JSON.parse(xhr.responseText);
		//if(obj.url=="::") obj.url='127.0.0.1'
		//global_url_to_ws=global_url_to_glab+':'+obj.port;
		//global_url_to_ws=global_url_to_ws.replace(/^https/, 'ws');
		//console.log('ws_url=['+xhr.responseText+']');
		//callback(xhr.responseText);
		callback();
		
	}

	xhr.send(params);
}


function is_server_buzzy(callback)
{
	
	var params='md5='+glob_session_id;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/is_buzzy', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror) onerror(error); return; }
			
			console.log(xhr.responseText);
			
			callback(xhr.responseText);
			
		}
		xhr.send(params);
	
	
}
var glob_game_only_start=false;
function get_last_version_of_pattern(  callback )
{
	var params='md5='+glob_session_id;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/blob_from_server', true);
		xhr.responseType='blob';
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror) onerror(error); return; }
			
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr.response);
					
				newImg.onload = function() {	
					
					
					
					callback();
			
				}
				newImg.src=imageUrl;
			
		}
		xhr.send(params);
			
			
}


function stopProgress()
{
	// var progressBar = document.getElementById("progress");
	// progressBar.hidden = true;
	// clearInterval(glob_intervalID); 
}

function textToServerAndReturnText(txt, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(txt);
}

function textToServerAndReturnBlob(txt, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; if(onerror) { onerror(error); return; } else throw new Error(error); }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(txt);
}

function colorNearBlack(color)
{
	if((color[0] > 127) && (color[1] > 127) && (color[2]>127)) return false;
	return true;
}

function blobToServerAndReturnText(blob, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

function sendImageToUrlGetText(canvas_id, url, callback)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
	blobToServerAndReturnText( blob, url, function( msg_from_server ) {
		
				stopProgress();
				if (callback) callback(msg_from_server);
				
				
			}, function(msg) {
			
				stopProgress();
				console.log("sendImageToUrlGetText(): Was error: "+msg);
				throw new Error(msg);
			
		}); 
	});
}

function transform(canvas_id, action, callback)
{
	startProgress();
	getImageFromCanvas( canvas_id, function(blob) { 
		blobToServer(blob, action, function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				imageToCanvas(img, canvas_id, function() { 
					stopProgress();
					if (callback) callback();
				});	
				
			});	
		}, function(msg) {
			
			stopProgress();
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	});
	 
}


function blobToServerForMD5(blob, url, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

function ident(canvas_id, action, callback)
{
	
	getImageFromCanvas( canvas_id, function(blob) { 
	
		blobToServerForMD5(blob, action, function( data ) {
			if (callback) callback(data);
				}
				
				, function(msg) {
			
			
			console.log("ident(): Was error: "+msg);
			throw new Error(msg);
			
		}
				
				
				);	
				
			
		}); 
	
	 
}


function ident2(im, action, callback)
{
	
	getImageFromImageData( im, function(blob) { 
	
		blobToServerForMD5(blob, action, function( data ) {
			if (callback) callback(data);
				}
				
				, function(msg) {
			
			
			console.log("ident2(): Was error: "+msg);
			throw new Error(msg);
			
		}
				
				
				);	
				
			
		}); 
	
	 
}

function avtomatik_move_to_wrapper(x,y){
	
	
											
	// setTimeout( 	function(x,y){
												// return function(){
													
	// glob_x_left_top=x;
	// glob_y_left_top=y;							
						// avtomatik_move_to();
					// mod_salamander_pro_processing_avto_click()
												// }
					// }(x,y), 100);
}
	
function right_click_near_last_xy(x_left_top,x_left_top_prev,y_left_top,y_left_top_prev)
{
	if((x_left_top==x_left_top_prev)&&(y_left_top==y_left_top_prev)) return false;
	
	if( Math.abs(y_left_top-y_left_top_prev)==Math.abs(x_left_top-x_left_top_prev)) 
				if(	Math.abs(y_left_top-y_left_top_prev)==1) return true;
		
	if( Math.abs(x_left_top-x_left_top_prev)>1)return false;
							
	if( Math.abs(y_left_top-y_left_top_prev)>1) return false;
	
	
	//if(	(Math.abs(glob_x_left_top-glob_x_left_top_last)<=1) && (Math.abs(glob_y_left_top-glob_y_left_top_last)<=1) )
	//	return true;
	
	return true;
}
			

function send_to_server_changed_canvas( callback )
{
		mod_salamander_stop	();
		global_state=ALL_PROCESSES_SLEEP_FOR_SERVER;
		filtering_tiles();
	//	localStorage.removeItem('last_session_md5');
	//arrayBufferFromCanvasToServer('canvas0', global_url_to_glab+'/blob_to_server_and_echo_from_server', callback, onerror);
	//arrayBufferFromCanvasToServer('canvas0', global_url_to_glab+'/test245', callback, onerror);
	var canvas = document.getElementById('canvas0');
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	for(var i=0;i<imageData.data.length;i++)buf8[i]=imageData.data[i];
		
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/array_buffer_to_server', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var data_id = ''+xhr.responseText;
			// works 
			console.log('data_id='+data_id);
			
			
			var params='md5='+glob_session_id+'&data_id='+data_id;
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/commit_labirints_changes', true);
			xhr2.onload = function() {  
				
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) { 	var error = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; if(onerror) onerror(error); return; }
				
				if((xhr2.responseText.indexOf('get_chaosed_labirint:error: may be white')===0)||
				(xhr2.responseText.indexOf('changes commited. png is white')===0))
				{
					if(check_all_white())
					{
					//alert('png is white');
					localStorage.removeItem("last_session_md5");
					localStorage.removeItem("glob_game_only_start");
					location.reload();
					}
					else callback();
					// var params='md5='+glob_session_id;
					// var xhr = new XMLHttpRequest();
		
					// xhr.open('POST', global_url_to_glab+'/get_labirint_id', true);
					
					// xhr.onload = function(e) {  

						// if (xhr.readyState != 4) return;
						
						// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
						
						// glob_session_id = xhr.responseText;
	
						// getChaosedLabirint(  function() { 
						// var canvas0 = document.getElementById("canvas0");
		// var context0 = canvas0.getContext("2d");
		// mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);

							// global_state=null;
							
						// });	
											
						
						
						
					// }
					
					// xhr.send(params);
				}
					
					
					
					
					
					
					
					
					
					
					
					//o( function(){ pattern2canvas(  callback ); } );
					
				
				else
				//is_server_buzzy(function(){
					callback();
				//	});
				
				
				
			}
			xhr2.send(params);
			
		}
		xhr.send(buf);
		
	
	
			
}


function get_max_near_point2( points, point )
{
	var maxx = 0;
	var maxy = 0;
	var max_x_ind = -1;
	var canvas0 = document.getElementById("canvas0");
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {max_x_ind=i;}
	}
	
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {continue;}
		
		var vx = Math.abs(points[i][0]-point[0]);
		var vy = Math.abs(points[i][1]-point[1]);
		if(vx==0 && vy!=1){ 
			vx = canvas0.width;
			if(vy==0) vy=canvas0.height;
		}
		else if(vy==0 && vx !=1 ){ 
			vy=canvas0.height;
			if(vx==0) vx = canvas0.width;
		}
		var vz = vx*vx+vy*vy; //vx*vx+vy+vy;
		if(vz > maxx) {maxx=vz;max_x_ind=i;}
		
		
	}
	
	
	return max_x_ind;
	
	
	
}





function get_max_near_point( points, point )
{
	var maxx = 0;
	var maxy = 0;
	var max_x_ind = -1;
	
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {max_x_ind=i;}
	}
	
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {continue;}
		
		var vx = Math.abs(points[i][0]-point[0]);
		var vy = Math.abs(points[i][1]-point[1]);
		var vz = vx*vx+vy*vy; //vx*vx+vy+vy;
		if(vz > maxx) {maxx=vz;max_x_ind=i;}
		
		
	}
	var arr=[];
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {continue;}
		
		var vx = Math.abs(points[i][0]-point[0]);
		var vy = Math.abs(points[i][1]-point[1]);
		var vz = vx*vx+vy*vy; //vx*vx+vy+vy;
		if(vz == maxx) { arr.push(points[i])}
		
		
	}
	shuffle(arr);
	return arr[0];
	
	
	
}




var glab_labirint_params={};

function labirint(x1,y1)
{
	//document.getElementById('history_div').removeChild(findButton('labirint'));
	// Удаление всех дочерних элементов
var element = document.getElementById("collected_div");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}

 glob_all_collected_stones=[];
 glob_all_generated_stones=[];
 
 
 
	document.getElementById('canvas0').onclick = function(ev) {
		
// //document.getElementById("scale_div").style.border = '';
			return;
			// _ctrlz();
			document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
			
			
			var el = document.getElementById('btn_pixels_clean');
			el.style.border = "";
		//	el.style.visibility='hidden';
		//	el.style.display="none";
		//	document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			global_do_work=false;
		
	} 
	
	

 
		var params='md5='+glob_session_id+'&rnd_pattern_schema=4';
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/init_pixels', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			glob_session_id = ''+xhr.responseText;
			// works 
			console.log('glob_session_id='+glob_session_id);
			//  return;
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;
			// }
			
			
			//var s = 0;//prompt("enter number",'500');
		
			//var wh = Number(s.trim());
			
			var wh=0;
			var x=x1;
			var y=y1;
			var scale_koeficient=2;
			var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			glob_x_left_top=x;
			glob_y_left_top=y;
			
			obj={}
			obj.glob_session_id=glob_session_id;
			obj.x=x;
			obj.y=y;
			obj.scale_koeficient=scale_koeficient;
			obj.wh=wh;
			
			
			glab_labirint_params=obj;
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/init_labirint_settings', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
					
				newImg.onload = function() {	
					
					showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					
					//getPassColor();
				
		
					var pcnv = document.getElementById("pixels");
					pcnv.onclick = function(e)
					{
						
							e = (e) ? e : event;   
							if(e.button == 2) return;
													
							
							var x = e.offsetX==undefined?e.layerX:e.offsetX;
							var y = e.offsetY==undefined?e.layerY:e.offsetY;
							
							
							whenUserLeftClickOnPixels(x,y);
					}
							
							
					


	var pcnv = document.getElementById("pixels");
					pcnv.oncontextmenu = function(e)
					{
						
						//return;
						
						
						e.preventDefault();
						
						
							if(glob_do_not_double_context) { 
			glob_do_not_double_context=false;
			
			return;}
			
			glob_do_not_double_context=true; 
			
			
						var x = e.offsetX==undefined?e.layerX:e.offsetX;
							var y = e.offsetY==undefined?e.layerY:e.offsetY;
							
							
							setTimeout(
				
				 function(x,y){
					
				return	function(){		
			glob_do_not_double_context=false;
			
						
						global_state=null;
						var params = 'md5='+glob_session_id;
							
							var xhr = new XMLHttpRequest();
							xhr.open('POST', global_url_to_glab+'/get_xy_labirint', true);
							xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
							xhr.onload = function(e) {  
						
								if (xhr.readyState != 4) return;
							
								if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
								
								var obj = JSON.parse(xhr.responseText);
								var f_glob_x_left_top=Number(obj.x);
								var f_glob_y_left_top=Number(obj.y);
								var nn = Number(obj.nn);
								var n = (x/(10*nn)|0)-7;
								var m = (y/(10*nn)|0)-7;
								
								f_glob_x_left_top += (n);
								f_glob_y_left_top += (m);
								
								
			var canvas = document.getElementById("canvas0");
			var ctx = canvas.getContext("2d");
			var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			var color2 =  getColorArrayFromImageData(im, f_glob_x_left_top, f_glob_y_left_top);	
								
								
			if(tr_black(color2)) return;
			if(is_white(color2)) return;
			//if(is_gold(color2)) {
				// set_pixel("canvas0",f_glob_x_left_top, f_glob_y_left_top,getWhiteSpaceColor());
				// send_to_server_changed_canvas(()=>{
							
							// samson(); //
				// refresh_map(); //
				// return;
				// });
				//return;
			//}
						
								if((is_gold(color2)==false) && (only_center(ctx,f_glob_x_left_top,f_glob_y_left_top,color2)))
								{
									call_non_salamandra(f_glob_x_left_top,f_glob_y_left_top);
									return;
								}
								
								if(is_gold_inside(f_glob_x_left_top,f_glob_y_left_top)) {
									
									if(is_gold(color2)==true)
									{
										
										var arr = get_white_arround(ctx,f_glob_x_left_top,f_glob_y_left_top);
										if(arr.length==8)
										{
											take_gold(f_glob_x_left_top,f_glob_y_left_top);
											return;
										}
										return;
									}
									
									// if(is_gold_inside(glob_x_left_top,glob_y_left_top))
									// {
										// i_found_gold();
									// }
									
								//	if(is_gold(color2)==false) 
									{
										// set_pixel("canvas0",f_glob_x_left_top, f_glob_y_left_top,getWhiteSpaceColor());
				// send_to_server_changed_canvas(()=>{
							
							// samson(); //
				// refresh_map(); //
				// moves_counter_incr();
				
				// return;
				// });
				
				
				var diff = get_diff_direct(glob_x_left_top,glob_y_left_top,glob_x_left_top+n,glob_y_left_top+m,color,color2);
						if(diff.length==0) return;
						
							
							
						//set_pixel("canvas0",glob_x_left_top+n+diff[0],glob_y_left_top+m+diff[1],color2);
						set_pixel("canvas0",glob_x_left_top+n,glob_y_left_top+m,getWhiteSpaceColor()); 
						set_pixel("canvas0",diff[0],diff[1],color2);
						send_to_server_changed_canvas(()=>{
							
							samson(); //
							refresh_map(); //
							
							// setTimeout( function(x,y) {
								// return function(){
								// var canvas = document.getElementById("canvas0");
			// var ctx = canvas.getContext("2d");
			// var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			// var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			// var color2 =  getColorArrayFromImageData(im, x,y);	
								
								
								// if(is_gold_inside(x,y)) {
									
									// // if(is_gold_inside(glob_x_left_top,glob_y_left_top))
									// // {
										// // i_found_gold();
									// // }
									
									// if(is_gold(color2)==false) return;
									
								// }
								// else
								// {
									// oncontext_menu_pixels(x,y);
								// }
							
								// }}(diff[0],diff[1]),100); 
							
							
							return;
							
						});
				
				
				
				
				
				
				
				
				
										return;
									}
									
								}
								
								//if(is_near_grey(f_glob_x_left_top,f_glob_y_left_top)) return;
								
								if(right_click_near_last_xy(glob_x_left_top,f_glob_x_left_top,glob_y_left_top,f_glob_y_left_top)==false)

								{

						{
										// set_pixel("canvas0",f_glob_x_left_top, f_glob_y_left_top,getWhiteSpaceColor());
				// send_to_server_changed_canvas(()=>{
							
							// samson(); //
				// refresh_map(); //
				// moves_counter_incr();
				
				// return;
				// });
				
				
				var diff = get_diff_direct(glob_x_left_top,glob_y_left_top,glob_x_left_top+n,glob_y_left_top+m,color,color2);
						if(diff.length==0) return;
						//set_pixel("canvas0",glob_x_left_top+n+diff[0],glob_y_left_top+m+diff[1],color2);
						set_pixel("canvas0",glob_x_left_top+n,glob_y_left_top+m,getWhiteSpaceColor()); 
						set_pixel("canvas0",diff[0],diff[1],color2);
						send_to_server_changed_canvas(()=>{
							
							samson(); //
							refresh_map(); //
							
							// setTimeout( function(x,y) {
								// return function(){
								// var canvas = document.getElementById("canvas0");
			// var ctx = canvas.getContext("2d");
			// var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			// var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			// var color2 =  getColorArrayFromImageData(im, x,y);	
								
								
								// if(is_gold_inside(x,y)) {
									
									// // if(is_gold_inside(glob_x_left_top,glob_y_left_top))
									// // {
										// // i_found_gold();
									// // }
									
									// if(is_gold(color2)==false) return;
									
								// }
								// else
								// {
									// oncontext_menu_pixels(x,y);
								// }
							
								// }}(diff[0],diff[1]),100); 
							
							
							return;
							
						});
				
				
				
				
				
				
				
				
				
										return;
									}



									return;  
						
								}
								   		
						if(is_white(color)&&is_white(color2)) return;
						if(is_gold(color2)) gold_counter_incr();
						
						
								
				
					
	// var params = 'md5='+glob_session_id+'&x='+f_glob_x_left_top+'&y='+f_glob_y_left_top;		
	
		// //send to server
		// var xhr22 = new XMLHttpRequest();
		// xhr22.open('POST', global_url_to_glab+'/set_xy_labirint', true);
		// xhr22.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// xhr22.responseType = "blob";
		// xhr22.onload = function() {  
			
			// if (xhr22.readyState != 4) return;

			// if (xhr22.status != 200) {  var error = xhr22.status + ': ' + xhr22.statusText+': '+xhr22.response; onerror(error); return; }
			
				
				
				
					// glob_x_left_top=f_glob_x_left_top;
					// glob_y_left_top=f_glob_y_left_top;
								
					// var i=getRandomInt(0,100);				
					// if( i<0) call_pazzl_portal();
						
					//////////////////////////////////////////////				
					//else 
						call_non_salamandra(f_glob_x_left_top,f_glob_y_left_top);
					////////////////////////////
						
		// }				
		// xhr22.send(params);
		
						}
						xhr.send(params);
						
						
						
						
						
			
			
			
			
			
			
			
			
			
				}
					
					
				}(x,y)
				
				, 500);

						
						
						
					
						
						
						
						return;
						
								e = (e) ? e : event;   
						//	if(e.button == 2) return;
								
								
							
							var x = e.offsetX==undefined?e.layerX:e.offsetX;
							var y = e.offsetY==undefined?e.layerY:e.offsetY;
							
							whenUserLeftClickOnPixels(x,y,"open");
							return;
							
							var x = e.offsetX==undefined?e.layerX:e.offsetX;
							var y = e.offsetY==undefined?e.layerY:e.offsetY;
							var params = 'md5='+glob_session_id;
							
							var xhr = new XMLHttpRequest();
							xhr.open('POST', global_url_to_glab+'/get_xy_labirint', true);
							xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
							xhr.onload = function(e) {  
						
								if (xhr.readyState != 4) return;
							
								if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
								
								var obj = JSON.parse(xhr.responseText);
								glob_x_left_top=Number(obj.x);
								glob_y_left_top=Number(obj.y);
								var nn = Number(obj.nn);
								var n = (x/(10*nn)|0)-7;
								var m = (y/(10*nn)|0)-7;
								
								glob_x_left_top += n;
								glob_y_left_top += m;
								
								
		   var canvas = document.getElementById("canvas0");
			var ctx = canvas.getContext("2d");
			var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			var color2 =  getColorArrayFromImageData(im, Number(obj.x), Number(obj.y));

								
								
								
								
								
								
															// var id = getIDFirstCollectedSelected();
								// if(id!=null)
								// {
									// pixelsPro_whenClickedOnCollected(document.getElementById(id),glob_x_left_top,glob_y_left_top);
								// }
								
								// else 
									
					if(compareColors(color,color2)==false)
						if(is_stone_point(glob_x_left_top,glob_y_left_top)==false)
						pixelsPro_whenRightClickedOnLabirint(glob_x_left_top,glob_y_left_top);
								
								
								
							}

							xhr.send(params);
							
							
							
					
					}
					
					

				//  pixelsPro_whenClickedOnLabirint(glob_x_left_top,glob_y_left_top);
								
					
			//		addStone(1, function()	{  getChaosedLabirint( function() { } ) } );
								
					show_map();
					//show_make_gif_div();
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);		
			glab_labirint_params=''+params;
		}
		
		xhr.send(params);
		
	
	

}



function f_whenUserLeftClickOnPixels(x,y,key)
{
								console.log("Before we here:");
								 console.log('glob_x_left_top='+glob_x_left_top);
						 console.log('glob_y_left_top='+glob_y_left_top);
						 console.log("We want to mo move to:");
								 console.log('x='+x);
						 console.log('y='+y);
						 
						  if(global_right_mouse_initiated==true) {
									global_right_mouse_initiated=false;
									f_whenRightClick_part2(x,y);
									return;
						  }
						 
						 
								var nn = 2;
									var n = (x/(10*nn)|0)-7; //n is x in canvas0
									var m = (y/(10*nn)|0)-7; //m is y in canvas0
									 console.log('n='+n);
						 console.log('m='+m);
						 
						 var f_glob_x_left_top = glob_x_left_top+n;
						 var f_glob_y_left_top = glob_y_left_top+m;
						 
						 moves_counter_incr();
						 
						  var canvas = document.getElementById("canvas0");
			var ctx = canvas.getContext("2d");
			var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			var color2 =  getColorArrayFromImageData(im, glob_x_left_top+n, glob_y_left_top+m);
			
			if(all_white_arround_pro(ctx, f_glob_x_left_top,f_glob_y_left_top)) return;
			if(only_one_color_center(ctx, f_glob_x_left_top,f_glob_y_left_top,color2)) {
				
				//return;
			}
			
			
						 if(n==0 && m==0)
						 {
							 global_state=null;
							 if(all_white_arround(ctx, glob_x_left_top,glob_y_left_top)) {
								 
								 if(is_gold(color2)) {
				set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
				f_send_to_server_changed_canvas(()=>{
							
							f_samson(); //
				refresh_map(); //
				return;
				});
				return;
			}	

								 
								 call_non_salamandra(glob_x_left_top,glob_y_left_top);
							 }
							 else{
							 
							 if(global_right_mouse_initiated==false)
											global_right_mouse_initiated=true;
							 //f_whenRightClick_part2(x,y);
							 
							 }
							 return;
						 }
						
			if(tr_black(color2)) return;
			if(is_one_tr_black_arround(ctx, glob_x_left_top+n, glob_y_left_top+m)) return;
			if(is_white(color2)) return;
			if(is_gold(color2)) {
				// set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
				// send_to_server_changed_canvas(()=>{
							
							// samson(); //
				// refresh_map(); //
				// return;
				// });
				return;
			}	





							
						 if(is_near_non_grey(glob_x_left_top,glob_y_left_top)==false)  {
							 robot_home();
							 return;  
						 }
						 if(click_near_last_xy(glob_x_left_top,f_glob_x_left_top,glob_y_left_top,f_glob_y_left_top)==false)
						 {
							 robot_home();
							 return;  
						 }
							 
						// if(Math.abs(glob_x_left_top-f_glob_x_left_top)>1) return;
						// if(Math.abs(glob_y_left_top-f_glob_y_left_top)>1) return;
						 
						 
						 
						 													
		  
			
			
				if(key=="open")
				{
					
					
					
									
					if(compareColors(color,color2)==false)
					{
						
							
								
						get_neighbours_points(glob_x_left_top+n,glob_y_left_top+m,function(points,colors){
									
									console.log("points: "+points);
									console.log("colors: "+colors);
								
								
								
									if(colors.length==7) return;
									if(colors.length==8) return;
								
								
								
								
								console.log("This is not 8 empty space -->>"+colors.length);
								
								//glob_x_left_top=f_glob_x_left_top;
								//glob_y_left_top=f_glob_y_left_top;
								
								//pixelsPro_whenClickedOnLabirint(x,y);
								
								doLeftClickOnPixelCanvas(x,y);
								
								
								
						});
								
									
					}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
else
{	
								
					if(compareColors(color,color2)==true)
					{
						
							
								
						get_neighbours_points(f_glob_x_left_top,f_glob_y_left_top,function(points,colors){
									
							//		console.log("points: "+points);
							//		console.log("colors: "+colors);
								
								
								
									// if(colors.length==7) {
										// if(n==0)return;
										// if(m==0)return; 
									// }
									
									if(colors.length==8) return;
								
								
								
								
								console.log("This is not 8 empty space -->>"+colors.length);
								
								//glob_x_left_top=f_glob_x_left_top;
								//glob_y_left_top=f_glob_y_left_top;
								
								//pixelsPro_whenClickedOnLabirint(x,y);
								
								f_doLeftClickOnPixelCanvas(x,y);
								
								
								
						});
								
									
					}
					else 
					{						
						
						var diff = get_diff_direct(glob_x_left_top,glob_y_left_top,glob_x_left_top+n,glob_y_left_top+m,color,color2);
						if(diff.length==0)
						{
							diff = use_magnito_power(glob_x_left_top,glob_y_left_top,glob_x_left_top+n,glob_y_left_top+m, color,color2);
							 if(diff.length==0) 
								{
									return;
								}
								else{
									var color4 =  getColorArrayFromImageData(im, diff[0],diff[1]);
									if(is_gold(color4)) return;
									set_pixel("canvas0",glob_x_left_top+n,glob_y_left_top+m,color4); 
									set_pixel("canvas0",diff[0],diff[1],color2);
								}
						}
						else{
								set_pixel("canvas0",glob_x_left_top+n,glob_y_left_top+m,getWhiteSpaceColor()); 
						set_pixel("canvas0",diff[0],diff[1],color2);
						}
						//set_pixel("canvas0",glob_x_left_top+n+diff[0],glob_y_left_top+m+diff[1],color2);
					
						f_send_to_server_changed_canvas(()=>{
							
							f_samson(); //
							refresh_map(); //
							
							// setTimeout( function(x,y) {
								// return function(){
								// var canvas = document.getElementById("canvas0");
			// var ctx = canvas.getContext("2d");
			// var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			// var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			// var color2 =  getColorArrayFromImageData(im, x,y);	
								
								
								// if(is_gold_inside(x,y)) {
									
									// // if(is_gold_inside(glob_x_left_top,glob_y_left_top))
									// // {
										// // i_found_gold();
									// // }
									
									// if(is_gold(color2)==false) return;
									
								// }
								// else
								// {
									// oncontext_menu_pixels(x,y);
								// }
							
								// }}(diff[0],diff[1]),100); 
							
							
							
							
						});
						//avtomatik_move_to();
						//samson();
						//location.reload();	
						//if(is_stone_point(glob_x_left_top,glob_y_left_top)==true)	
						//                doLeftClickOnPixelCanvas(x,y);
					}	
					
						
}
							
}

function call_pazzl_portal()
{
	localStorage.removeItem("to_portal"); 
	localStorage.removeItem("xs"); 
	localStorage.removeItem("ys");
	localStorage.removeItem('last_session_md5');
	localStorage.setItem("xs",glob_x_left_top);
	localStorage.setItem("ys",glob_y_left_top);
	localStorage.setItem('last_session_md5', glob_session_id);
	localStorage.setItem('to_portal', "true");
	location.reload();
}


function save_all_settings_on_server(callback)
{
	global_state=ALL_PROCESSES_SLEEP_FOR_SERVER;
	localStorage.setItem('last_session_md5', glob_session_id);
	setTimeout( function() {filtering_tiles();
	send_to_server_changed_canvas(function(){
		console.log('settings saved');
		global_state=null;
		if(callback) callback();
	});},200);
}

function find_neighbours_by_ulitka(xx,yy)
{
	// var canvas2 = document.getElementById("canvas0");
	// var context2 = canvas2.getContext("2d");
	// var mi=context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var numbers = get_ulitka(xx,yy);
	
	numbers.sort( function(a, b) { return a[2] - b[2]; } );
		
	return numbers;
	
		// var arr=[];
		
		// for(var i=0;i<numbers.length;i++)
		// {
			// var x=numbers[i][0];
			// var y=numbers[i][1];
			
			// // var color = getColorArrayFromImageData(mi,x+glob_x_left_top,y+glob_y_left_top);
			
			
			// // var canvas = document.getElementById("canvas0");
			// // var ctx = canvas.getContext("2d");
			// // var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			// // var color =  [255,0,0,255];//getColorArrayFromImageData(imgData0, x, y);

			
			
			// // im=fillRectangleFast(im,x+glob_x_left_top,y+glob_y_left_top,1,1,color);
			// // ctx.putImageData( im,0,0);
			
			
			// // if(get_near_not_stones(x+glob_x_left_top,y+glob_y_left_top).length>0) {
				
				// // glob_x_left_top=x+glob_x_left_top;
				// // glob_y_left_top=y+glob_y_left_top;
				
				// // return true; 
			// // }
			// arr.push([glob_x_left_top+x,glob_y_left_top+y]);
		// }
		
		// return arr;
}

// https://renkport.ru/java/primer/zapolnenie-dvumernogo-massiva-po-spirali/
function get_ulitka(m,n) {
        //Заполним массив, количество строк мы обозначим m, а столбцов - n.
       // var m = 5;
      //  var n = 5;

        //С помощью переменной s задаются числа внутри массива,
        //начиная с 25 в данном случае.
        var s = m*n;

        //Объявляем и инициализируем массив.
        var arr = [];// new var[m][n];
		for(var i=0;i<m;i++) 
		{
			var arr2=[];
			for(var j=0;j<n;j++) arr2.push(0);
			arr.push(arr2);
		}	
			
			
        //Заполняем периметр массива по часовой стрелке.
        //Не забудьте поменять инкремент на декремент у переменной s.
        for (var y = 0; y < n; y++) {
            arr[0][y] = s;
            s--;
        }
        for (var x = 1; x < m; x++) {
            arr[x][n - 1] = s;
            s--;
        }
        for (var y = n - 2; y >= 0; y--) {
            arr[m - 1][y] = s;
            s--;
        }
        for (var x = m - 2; x > 0; x--) {
            arr[x][0] = s;
            s--;
        }

        //Периметр заполнен. Продолжаем заполнять массив и задаём
        //координаты ячейки, которую необходимо заполнить следующей.
        var c = 1;
        var d = 1;
        
        
        while (s > 1) {
            //В Java инициализированный интовый массив заполняется нулями.
            //Периметр мы заполнили числами, отличными от нулей.
            //Следующие циклы поочерёдно работают, заполняя ячейки.
            //Вложенный цикл останавливается, если следующая ячейка имеет 
            //значение, отличное от ноля. Ячейка, на которой остановился 
            //цикл, не заполняется. Из-за этого условие для выхода из внешнего
            //цикла - (s>1). Если Вы поставите 0, получится вечный цикл. 
            
            
            //Движемся вправо.
            while (arr[c][d + 1] == 0) {
                arr[c][d] = s;
                s--;
                d++;
            }

            //Движемся вниз.
            while (arr[c + 1][d] == 0) {
                arr[c][d] = s;
                s--;
                c++;
            }

            //Движемся влево.
            while (arr[c][d - 1] == 0) {
                arr[c][d] = s;
                s--;
                d--;
            }

            //Движемся вверх.
            while (arr[c - 1][d] == 0) {
                arr[c][d] = s;
                s--;
                c--;
            }
        }

        //При данном решении в центре всегда остаётся незаполненная ячейка.
        //Убираем её при помощи следующего цикла.
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
                if (arr[x][y] == 0) {
                    arr[x][y] = s;
                }
            }
        }
		var arr3=[];
		var xx=m/2|0;
		var yy=n/2|0;
        //Выводим массив в консоль.
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
				
				arr3.push([(x-xx),(y-yy),arr[x][y]]);
                if (arr[x][y] < 10) {
                    //Два пробела, чтобы в консоли столбцы были ровные.
                   // console.log(arr[x][y] + "["+(x-xx)+","+(y-yy)+"],  ");
                } else {
                    // console.log(arr[x][y] + "["+(x-xx)+","+(y-yy)+"], ");
                }
            }
             //console.log("");
        }
		//console.log(""+arr3);
		return arr3;
 }
function click_near_last_xy(x_left_top,x_left_top_prev,y_left_top,y_left_top_prev)
{
	if((x_left_top==x_left_top_prev)&&(y_left_top==y_left_top_prev)) return false;
	
	if( Math.abs(y_left_top-y_left_top_prev)==Math.abs(x_left_top-x_left_top_prev)) 
		return true;
		
	if( Math.abs(x_left_top-x_left_top_prev)>1)
	{
		
		if( Math.abs(y_left_top-y_left_top_prev)>0) return false;
		
		
			
		
	
	}
								
	if( Math.abs(y_left_top-y_left_top_prev)>1) 
	{
		
		
		if( Math.abs(x_left_top-x_left_top_prev)>0) return false;
		
		
	
	}
	
	//if(	(Math.abs(glob_x_left_top-glob_x_left_top_last)<=1) && (Math.abs(glob_y_left_top-glob_y_left_top_last)<=1) )
	//	return true;
	
	return true;
}
							



function doLeftClickOnPixelCanvas(x,y){
	
	
	var params = 'md5='+glob_session_id;
	
							var xhr = new XMLHttpRequest();
							xhr.open('POST', global_url_to_glab+'/get_xy_labirint', true);
							xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
							xhr.onload = function(e) {  
						
								if (xhr.readyState != 4) return;
							
								if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
								
								var obj = JSON.parse(xhr.responseText);
								glob_x_left_top=Number(obj.x);
								glob_y_left_top=Number(obj.y);
								var nn = Number(obj.nn);
								var n = (x/(10*nn)|0)-7;
								var m = (y/(10*nn)|0)-7;
							
								glob_x_left_top += n;
								glob_y_left_top += m;
								
								
								pixelsPro_whenClickedOnLabirint(glob_x_left_top,glob_y_left_top);
								
								//getPassColor();
								
							}

							xhr.send(params);
							
							}
							
	var global_url_to_server='https://patterns-editor.herokuapp.com/';
function do_server_query(n,callback)
{
	if(n==undefined) n=0;
	//var query = (''+document.getElementById("query_for_server").value).trim();
	var txt = "commands=generate random seed 9 5, mirror right, mirror down, axes minus, axes minus, mirror right, mirror down, axes minus, plus,plus,plus,median,rotate plus 45,median,plus";
	//var txt = "commands="+query;
	var url = global_url_to_server+'execute_script';
	
	 textToServerAndReturnBlob(txt, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				console.log('do_server_query: img.height='+img.height);
				whenPastingFinished(img);
				
	//canvas_for_filtering
	
	// var tex=document.createElement("canvas");
			// tex.width=img.width;
		// tex.height=img.height;
		// tex.getContext("2d").drawImage(img,0,0);
		// var tim = tex.getContext("2d").getImageData(0,0,tex.width,tex.height);
				
	
	// global_ish_colors = getColors(tim);
	
	// var r2canvas = document.getElementById("myCanvas79");
	// r2canvas.width = tim.width;
	// r2canvas.height = tim.height;
	
	
				// imageToCanvas(img, "canvas0", function() { 
					
				
					// //var canvas45=document.getElementById("myCanvas4");
					// canvas45.width=document.getElementById("canvas0").width;
					// canvas45.height=document.getElementById("canvas0").height;
					
					
					// var imgData=document.getElementById("canvas0").getContext("2d").getImageData(0,0,document.getElementById("canvas0").width,document.getElementById("canvas0").height);
					
					
					// canvas45.getContext("2d").putImageData(imgData,0,0);
				
				
				if	(callback	) callback(img);
				
				// });	
				
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
	
	
	
}



function do_server_command4(im,s,callback)
{
	ident2(im, global_url_to_server+'ident', function(data2){
					
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	var md5=data2;

	 textToServerAndReturnBlob(txt+'&md5='+data2, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				
						if	(callback	) callback(img);
							
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
});	

}


function do_server_command2(im,s,callback)
{
	ident2(im, global_url_to_server+'ident', function(data2){
					
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	var md5=data2;

	 textToServerAndReturnBlob(txt+'&md5='+data2, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				imageToCanvas(img, "canvas0", function() { 
				prepare_yellow();
						if	(callback	) callback(img);
							});
				//whenPastingFinished(img);
				
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
});				
					

}

function do_server_command(s)
{
	
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	
	 textToServerAndReturnBlob(txt, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				
				whenPastingFinished(img);
				
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
	
	
	
}
	

		
// function getPassColor()
// {
		// var xhr = new XMLHttpRequest();
		// xhr.open('GET', global_url_to_glab+'/get_color_for_pass', true);
		// xhr.onload = function() {  
			
			// if (xhr.readyState != 4) return;

			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			// if(document.getElementById("pcolor")) document.getElementById("pixels_buttons").removeChild(document.getElementById("pcolor"));
					// var arr=null;
					// if(xhr.responseText==',,,') arr=getWhiteSpaceColor();
					// else arr=xhr.responseText.split(",");		
					// console.log(arr);
					// var canvas = document.createElement("canvas");
					// var ctx = canvas.getContext("2d");
					// canvas.id='pcolor';
					// canvas.width = 20;
					// canvas.height = 20;
					// canvas.style.margin="5px";
					// ctx.fillStyle='rgba('+arr[0]+','+arr[1]+','+arr[2]+','+arr[3]/255+')';
					// ctx.fillRect(0, 0, canvas.width, canvas.height);
					// document.getElementById("pixels_buttons").appendChild(canvas);
					
		// }		
				
		
		
		// xhr.send();
// }	

function getChaosedLabirint(callback)
{
	var params = 'md5='+glob_session_id;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/get_chaosed_labirint', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
								
			var urlCreator = window.URL || window.webkitURL;
				
			var imageUrl = urlCreator.createObjectURL(xhr.response);
					
			newImg.onload = function() {	
					
							
					var canvas = document.getElementById("canvas0");
					if(canvas == null) throw new Error("Canvas  not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					// ctx.fillStyle='white';
					// ctx.fillRect(0,0,5,canvas.height);
					// ctx.fillRect(0,0,canvas.width,5);
					// ctx.fillRect(canvas.width-5,0,5,canvas.height);
					// ctx.fillRect(0,canvas.height-5,canvas.width,5);
					
					
					
						
					
					
					get_array_of_all_generated_stones( function() { if(callback) callback(); }	);
					
					//getPassColor();
			}		
			newImg.src = imageUrl;			
		}
		
		xhr.send(params);
}	

function get_array_of_all_generated_stones(callback)
{
	var params = 'md5='+glob_session_id;
	var xhr = new XMLHttpRequest();
				xhr.open('POST', global_url_to_glab+'/get_array_of_all_generated_stones', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var arr = JSON.parse(xhr.responseText);
					glob_all_generated_stones=(arr);
					callback();
				}
				xhr.send(params);
}	

function get_near_stones(x0,y0)
{	
var colors=[];
		var canvas = document.getElementById("canvas0");
		var ctx = canvas.getContext("2d");
		var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		var arr = getWHDNeighbors(x0, y0, 1, 1);
		
		
					for(var i=0;i<arr.length;i++)
					{
						var x = arr[i][0];
						var y = arr[i][1];
						
						if((x>=0) && (x<im.width)&&(y>=0)&&(y<im.height) )
						{
						
							//var color2 = getColorArrayFromImageData( im, x, y );
							var color =  getColorArrayFromImageData(im, x, y)
							
							if(is_stone(x,y,color))
							{
								colors.push([x,y]);
							} 
								
						}
					}
			return colors;					
								
}
function tr_black(color2)
{
	var color=[0,0,0,0];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function is_near_non_grey(x,y)
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(x-1,y-1,3,3);
	
	for(var i=0;i<im.data.length;i+=4)
	{
		var color = [ im.data[i],im.data[i+1],im.data[i+2],im.data[i+3] ]
		if(tr_black(color)) continue;
		// if(is_white(color)) continue;
		return true;
	}
							
	return false
}

function is_gold_near (x,y)
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(x-1,y-1,3,3);
	for(var i=0;i<im.data.length;i+=4)
	{
		var color = [ im.data[i],im.data[i+1],im.data[i+2],im.data[i+3] ]
		if(is_gold(color)) return true;
	}
							
	return false
}

function is_near_grey(x,y)
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(x-1,y-1,3,3);
	for(var i=0;i<im.data.length;i+=4)
	{
		var color = [ im.data[i],im.data[i+1],im.data[i+2],im.data[i+3] ]
		if(tr_black(color)) return true;
	}
							
	return false
}

function is_neighbour_food( arr_i )
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		
		var color =  getColorArrayFromImageData(im, arr_i[0], arr_i[1]);
		if(white(color)) return false;
		if(red(color)) return false;
		if(grey(color)) return false;
		
	//message here
				
	return true;
	
}

function is_white(color2)
{
	var color = getWhiteSpaceColor();
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}

function very_old__get_near_not_stones(x0,y0)
{	
	//glob_x_left_top=x0;
	//glob_y_left_top=y0;
	
	var r=false;	
	var xx=0;
	var yy=0;
	do 
	{
							
		var arr = get_ulitka(++xx,++yy);
		for(var i=0;i<arr.length;i++)
		{
			var arr2=[arr[i][0]+x0,arr[i][1]+y0];
			if(is_neighbour_food(arr2)) return arr2;	
		}	
		
	//	if(	check_all_white()	) throw new Exception("error: all white");
		
	}
	while(true);
	
	/***
		var colors=[];
		var canvas = document.getElementById("canvas0");
		var ctx = canvas.getContext("2d");
		var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		var arr = getWHDNeighbors(x0, y0, 1, 1);
		
		
					for(var i=0;i<arr.length;i++)
					{
						var x = arr[i][0];
						var y = arr[i][1];
						
						if((x>=0) && (x<im.width)&&(y>=0)&&(y<im.height) )
						{
						
							//var color2 = getColorArrayFromImageData( im, x, y );
							var color =  getColorArrayFromImageData(im, x, y)
							
							if((is_stone(x,y,color)==false)&&(white(color)==false)&&(red(color)==false)&&(grey(color)==false))
							{
								colors.push([x,y]);
							} 
								
						}
					}
			return colors;	
				****/
								
}			
	
function get_neighbours(x,y,callback)
{
	var params = 'md5='+glob_session_id+'&x='+x+'&y='+y;
	var xhr = new XMLHttpRequest();
				xhr.open('POST', global_url_to_glab+'/get_qty_neighbours', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var colors = JSON.parse(xhr.responseText);
					
					var grey_color = [null,null,null,null];
				
				do
				{
					var found=false;
					for(var i=0;i<colors.length;i++)
					{
						if(mod_labirint_compareColors(colors[i],grey_color)) { colors.splice(i,1); found=true;  break; }
					}
				}
				while(found);
				
					var grey_color = getWhiteSpaceColor();
					do
				{
					var found=false;
					for(var i=0;i<colors.length;i++)
					{
						if(mod_labirint_compareColors(colors[i],grey_color)) { colors.splice(i,1); found=true;  break; }
					}
				}
				while(found);
				
					
					
					
				
					
					
					console.log('neighbours:');
					console.log(colors);
					if(callback)callback(colors);
				}
				xhr.send(params);
}	

	
function get_neighbours_points(x0,y0,callback)
{
	var colors=[]; var points=[];
		var canvas = document.getElementById("canvas0");
		var ctx = canvas.getContext("2d");
		var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		var arr = getWHDNeighbors(x0, y0, 1, 1);
		var color2 = getColorArrayFromImageData( im, x0, y0 );
		
					for(var i=0;i<arr.length;i++)
					{
						var x = arr[i][0];
						var y = arr[i][1];
						
						if((x>=0) && (x<im.width)&&(y>=0)&&(y<im.height) )
						{
						
							
							var color =  getColorArrayFromImageData(im, x, y);
							
							if(compareColors(color2,color))
							{
								colors.push(color);
								points.push([x,y]);
							} 
								
						}
					}
			 
					if(callback) callback(points, colors);
				
}	

function fake_whenBrakabakaEventOccurs(e)
{

		e.preventDefault();
		if(global_state==ALL_PROCESSES_SLEEP_FOR_SERVER) return;
		// if(isExistAnyNotRemovedClusters()==false)
		// {
			// //do_server_query();
			// location.reload();
		// }
		
	//if(global_cliked_points_array.length>MAX_CHARGE) return;
	
		//get x y
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
	//	global_was_user_click=[x,y];
	//	global_number_of_user_clicks_from_last_tick++;
		
		// if(global_state==null)
		// {
			// mod_salamander_setXY(x,y);
		// }
		
		
		
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
	//	var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		// var _color= getColorArrayFromImageData(imgData0, x, y);
		
		// if(is_white(_color)) 
		// {
			// context0.fillStyle=getStrColorFromRGBAArray(getRndColor());
			// context0.beginPath();
			// context0.arc(x,y,3,0,2*Math.PI);
			// context0.fill();
		// }
			// mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);
			// return;
		// }
		
		
		mod_salamander_stop();
		
		// context0.fillStyle='#ffffff';
			// context0.beginPath();
			// context0.arc(mod_salamandra_x,mod_salamandra_y,1,0,2*Math.PI);
			// context0.fill();
			mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);
		
		
		//mod_salamander_setXY(x,y);
		global_state=null;
		
		
}
		
			
	
		
function mod_labirint_compareColors(color,color2)
{
	if(
			(color2[0]==color[0]) && 
			(color2[1]==color[1]) && 
			(color2[2]==color[2]) && 
			(color2[3]==color[3]) 
							
						
		)
		{
			return true;
			
		}	
		
		return false;
}

function findButton(id)
{
	var lst = document.getElementById('history_div').childNodes;
	for(var i=0;i<lst.length;i++){
		if(lst[i].innerHTML==id) return lst[i];
	}
	return null;
}

function is_exist_collected_stones_in_pocket()
{
	var lst = document.getElementById('collected_div').childNodes;
	for(var i=0;i<lst.length;i++)
	{
		//if(lst[i].classList.contains('collected_selected')) 
			return true;
	}
	return false;
}


function pixelsPro_whenClickedOnLabirint(x,y)
{
		var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	var color =  getColorArrayFromImageData(imgData0, x, y)
	
	if(is_stone(x,y,color))
	{
		pixelsPro_whenRightClickedOnLabirint(x,y);
		return;
	} 
	
	//get_neighbours(x,y);
			
	
	var params = 'md5='+glob_session_id+'&x='+x+'&y='+y;		
	
		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
					var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				
			//	var params = 'x='+x+'&y='+y;		
	var params = 'md5='+glob_session_id;
		//send to server
		var xhr4 = new XMLHttpRequest();
		xhr4.open('POST', global_url_to_glab+'/get_error_message', true);
		xhr4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr4.responseType = "text";
		xhr4.onload = function() {  
			
			if (xhr4.readyState != 4) return;

			if (xhr4.status != 200) {  var error = xhr4.status + ': ' + xhr4.statusText+': '+xhr4.response; onerror(error); return; }
			
			
			
			
			console.log(''+xhr4.responseText);
			
			if((xhr4.responseText=='6.1.27 stone_neighbours_of not ok')||(xhr4.responseText=='6.1.25 labirint not ok')||(xhr4.responseText=='none'))
			
				//if(comparePrevStateAndNowState(newImg)==0)
				{
					if(is_exist_collected_stones_in_pocket())
					{
						pixelsPro_whenRightClickedOnLabirint(x,y);
						return;
					}
					
					
				}
				
				
				
				
				
				
					
	var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top;		
	
		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/set_xy_labirint', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
				
				
				
				
				
				
				
			
							 getChaosedLabirint( function()	 {
										
				
				refresh_map();
				
				
							//	if(glob_little_belly_pressed)
								{
							//		glob_little_belly_pressed=false;
							//		btn_pixels_clean();
								
								}
								
								//glob_x_left_top=x;
								//glob_y_left_top=y;
								
				// here Jerard
				samson();
				
							});
			
			}
		xhr.send(params);	
			
			
		}
		xhr4.send(params);		
				
			
				
				// getChaosedLabirint(function(){
					
					
					
					
				
				
				// var xhr = new XMLHttpRequest();
				// xhr.open('GET', global_url_to_glab+'/get_xy_labirint', true);
				// xhr.onload = function(e) {  
			
					// if (xhr.readyState != 4) return;
				
					// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					// var obj = JSON.parse(xhr.responseText);
					// glob_x_left_top=Number(obj.x);
					// glob_y_left_top=Number(obj.y);
					// document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				// }
				// xhr.send();
				
					
				// });
				
				
				
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

		
}
//global_state=
var ALL_PROCESSES_SLEEP_FOR_SERVER=501;

function entering_to_magik_world()
{
	glob_x_left_top=getRandomInt(0,document.getElementById("canvas0").width);
	glob_y_left_top=getRandomInt(0,document.getElementById("canvas0").height);
	
	mod_salamandra_x=document.getElementById('canvas0').width/2;
	mod_salamandra_y=document.getElementById('canvas0').height/2;
	
	// if this will be commented error of initialization occurs
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);
	mod_salamander_global_dummy_fast_thread_imgData = imgData7;
	/////////////////////////////////////////
	
	glob_tg_id = setInterval( 	zala_mander17, 500 );
	// glob_tg_id2 = setInterval( 	save_all_settings_on_server, 1000*60*1 );
}

// var glob_tg_id=null;
// function hearth()
// {
	
	//glob_tg_id=setInterval(function(){	hfhfbhr44(undefined,undefined,zala_mander17);	},2000);
	//glob_tg_id2=setInterval(function(){},4000);
	//glob_tg_id4=setInterval(free_creatures,7000);
	
// }
// function fryday()
// {
	// if(glob_tg_id!=null)  clearInterval(glob_tg_id);
	// setTimeout(do_work,500);
// }
function comparePrevStateAndNowState(newImg)
{

				var canvas = document.getElementById("pixels");
				var ctx = canvas.getContext("2d");
				var im = ctx.getImageData(0,0,canvas.width,canvas.height);
				
				var canvas2 = document.createElement("canvas");
				var w = canvas.width;
				var h = canvas.height;
				canvas2.width = w;
				canvas2.height = h;
				var ctx2 = canvas2.getContext("2d");
				ctx2.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				
				var im2 = ctx2.getImageData(0,0,w,h);
			
		
				
				for (var y = 0; y < im2.data.length; y++) {
				
				if(im.data[y]!=im2.data[y]) return 1;
				}
				
				
				
				return 0;
				
}


function newg()
{
	location.reload();
	
}


function is_little_belly(x,y,color)
{
	var canvas = document.getElementById("pixels");
	var ctx = canvas.getContext("2d");
	var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	var color =  getColorArrayFromImageData(imgData0, x, y);
	//ctx.putImageData( fillRectangleFast(imgData0, x-1, y-1, 1, 1, [0,0,0,255] ),0,0)
	//ctx.putImageData( fillRectangleFast(imgData0, x, y, 1, 1, [0,0,0,255] ),0,0)
	
	
	var f=false;
	
	{
		if( rt_compareColors(color,[255,0,0,255],0)==true )
		{ f=true;}
	}
	return f;
}

function initGame()
{
	initModPixels();
	var CLIPBOARD = new CLIPBOARD_CLASS("canvas0", true);
	document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
	document.getElementById("canvas0").oncontextmenu = ctrlz;
	

	
	loadJSON('security/fileN_h7o2469.json', function(data) { 
		console.log(data); 
		global_url_to_glab = data.global_url_to_glab;
		global_url_to_ws = data.global_url_to_ws;
		//get_session_id( pattern2canvas );
		f_get_session_id( f_pattern2canvas );
	});

}
	
function rt_compareColors(arr,arr2,lim)
{
	for(var j=0;j<arr.length;j++)
	{
		var df = Math.abs(arr[j]-arr2[j]);
		if(df>lim)return false;
	}
	return true;
}

function is_stone_was_collected(color)
{
	var f=false;
	for(var i=0;i<glob_all_collected_stones.length;i++)
	{
		if( rt_compareColors(glob_all_collected_stones[i].color,color,0)==true )
		{ f=true;break;}
	}
	return f;
}

function get_coordinates_of_stone()
{
	if(glob_all_generated_stones.length>0)
	{
		var i=glob_all_generated_stones[0].x;
		var j=glob_all_generated_stones[0].y;
		if((i>=0)&&(j>=0))
		return [i,j];
	}
	return null;
}

function is_stone(rx,ry,color)
{
	var f=false;
	for(var n=0;n<glob_all_generated_stones.length;n++)
	{
		var i=glob_all_generated_stones[n].x;
		var j=glob_all_generated_stones[n].y;
		
		if((i==rx)&&(j==ry))
		{
				if( rt_compareColors(glob_all_generated_stones[n].color,color,0)==true )
		{ f=true;break;}
			
		}
	
	}
	return f;
}

function is_stone_point(rx,ry)
{
	var f=false;
	for(var n=0;n<glob_all_generated_stones.length;n++)
	{
		var i=glob_all_generated_stones[n].x;
		var j=glob_all_generated_stones[n].y;
		
		if((i==rx)&&(j==ry))
		{
				return true;
			
		}
	
	}
	return f;
}

function rem_stone(points, colors, callback)
{
	
	if(points.length()==0) { callback(); return;}
	var x= points[0][0];
	var y= points[0][1];
	var color = colors[0].join(",");
	
	var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&color='+color;		

	
//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/right_pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
				 getChaosedLabirint( function()
				 {
										
					
			//get_collected_stones_from_server_and_show();
				points.shift();
				colors.shift();
							 rem_stone(points, colors, callback);	
										
										
								});
				
				
				/*
				pixelsPro_whenClickedOnLabirint(-1,-1);
				
						
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_xy_labirint', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				}
				xhr.send();
				*/
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);
		
		
}

function pixelsPro_whenRightClickedOnLabirint(x,y)
{
	
	
	
	get_neighbours_points(x,y, function( points, colors ) {
											console.log("points colors.length="+colors.length);
										//	if(colors.length>
										
										var rnd = getRandomInt(0,points.length);
										//for(var i=0;i<rnd;i++)
										//{
										//	var rnd2 = getRandomInt(0,points.length);
										//	points.splice(rnd2,1);colors.splice(rnd2,1);
										//}
										
										
										var canvas = document.getElementById("canvas0");
										var ctx = canvas.getContext("2d");
										var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
										var color =  getColorArrayFromImageData(imgData0, x, y);
										
										
										
										
										
										
										
										
										createRasterPortalGates([[x,y]], [[color]], function(){
	
	// doLeftClick(glob_x_left_top,glob_y_left_top,function() { alert('ok'); 	});
	 pixelsPro_whenClickedOnLabirint(x,y);
	 
	 // setTimeout( function(  )  {
		 
		// // return function() {
		
		// // rem_stone(points, colors, function(){
		
			// // alert('ok');
			
		// // });

// var params='md5='+glob_session_id;
	// var xhr = new XMLHttpRequest();
	// xhr.open('POST', global_url_to_glab+'/clear_stones', true);
	// xhr.onload = function(e) {  

		// if (xhr.readyState != 4) return;
	
		// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
		
		
		// // callback();
		
		
	// }

	// xhr.send(params);




		
		// // }
		 
		 
	 // }(  points, colors ),2000);
		
	 
	 //pixelsPro_whenRightClickedOnLabirint(x,y);
	
	// var canvas = document.getElementById("pixels");
	// var ctx = canvas.getContext("2d");
	// var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	// var color =  getColorArrayFromImageData(imgData0, x, y)
	
	// // if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
	// // {
		// // window.open("http://s954447o.bget.ru/labirint");//location='http://s954447o.bget.ru/labirint/';
	// // }
	
	
	
	// var params = 'md5='+glob_session_id+'&x='+x+'&y='+y;	
	// var el = document.getElementById("collected_div").childNodes[0];
	// //if(el)
	// {
		// //if( el.classList.contains('collected_selected')==true )
		// {
			// params += '&color='+color.join(",");//el.getAttribute('attr_color');
		// }
	// }
	
	// // 
	
	

	});
	});	
}

function get_collected_stones_from_server_and_show()
{
		var params = 'md5='+glob_session_id;
				var xhr = new XMLHttpRequest();
				xhr.open('POST', global_url_to_glab+'/get_collected', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						//lst[i].onclick = selectCollected;
					}
					// if(lst[0])selectCollectedOn(lst[0]);
					
					
					// if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
					// {
						// glob_all_collected_stones.push(color);
					// }
					
				}
				xhr.send(params);
}

//returns id
function getIDFirstCollectedSelected()
{
	
		var lst = document.getElementById("collected_div").childNodes;
		
		for(var i=0;i< lst.length;i++)
		{
			var el = document.getElementById(lst[i].id);
			if(el.classList.contains('collected_selected')==true) return el.id;
			
		}
		
		return null;
}

function selectCollectedOn(el)
{
	if(el.classList.contains('collected_selected')==true)
	{
		var lst = document.getElementById("collected_div").childNodes;
		for(var i=0;i< lst.length;i++)
		{
			var el = document.getElementById(lst[i].id);
			el.classList.remove("collected_selected");
			
		}
		
		return;
	}
	
	var lst = document.getElementById("collected_div").childNodes;
	for(var i=0;i< lst.length;i++)
	{
		var el = document.getElementById(lst[i].id);
		el.classList.remove("collected_selected");
		
	}
	
		
	document.getElementById(el.id).classList.add("collected_selected");
	
	
}

function selectCollected()
{
	if(this.classList.contains('collected_selected')==true)
	{
		var lst = document.getElementById("collected_div").childNodes;
		for(var i=0;i< lst.length;i++)
		{
			var el = document.getElementById(lst[i].id);
			el.classList.remove("collected_selected");
			
		}
		
		return;
	}
	
	var lst = document.getElementById("collected_div").childNodes;
	for(var i=0;i< lst.length;i++)
	{
		var el = document.getElementById(lst[i].id);
		el.classList.remove("collected_selected");
		
	}
	
		
	document.getElementById(this.id).classList.add("collected_selected");
	
	
}

function getStrColorFromRGBAArray(data)
{
	return "rgba("+data[0]+','+data[1]+','+data[2]+','+data[3]/255+')';
}

function pixelsPro_whenClickedOnCollected(el,x,y)
{
	
	
	var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&color='+el.getAttribute('attr_color');		

		//send to server
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/set_collected_pixels', true);
		xhr.responseType = "blob";
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			var newImg = document.createElement("img");
							
			var urlCreator = window.URL || window.webkitURL;
			
			var imageUrl = urlCreator.createObjectURL(xhr.response);
				
			newImg.onload = function() {	
				
				var canvas = document.getElementById("pixels");
				if(canvas == null) throw new Error("Canvas pixels not found");
				
				var ctx = canvas.getContext("2d");
				canvas.width = newImg.width;
				canvas.height = newImg.height;
				ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
			
			var params = 'md5='+glob_session_id;
				var xhr = new XMLHttpRequest();
				xhr.open('POST', global_url_to_glab+'/get_collected', true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					document.getElementById('collected_div').innerHTML = xhr.responseText;
					var lst = document.getElementById('collected_div').childNodes;
					for(var i=0;i<lst.length;i++)
					{
						lst[i].onclick = selectCollected;
					}
					//if(lst[0])selectCollectedOn(lst[0]);
				}
				xhr.send(params);
				
				
				/*
				pixelsPro_whenClickedOnLabirint(-1,-1);
				
						
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/get_xy_labirint', true);
				xhr.onload = function(e) {  
			
					if (xhr.readyState != 4) return;
				
					if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var obj = JSON.parse(xhr.responseText);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					document.getElementById('selected_x_y').innerHTML = ""+glob_x_left_top+", "+glob_y_left_top;
				}
				xhr.send();
				*/
			}
						
			newImg.src = imageUrl;			
			
		}
		
		xhr.send(params);

}


function countDifferColorsOn()
{
	var count=0;

		var imgData7 = getinversion(getbuffer());
	var arr = getArrayOfAllColors(imgData7);
	
	var canvas7 = document.getElementById("pixels");
		var context7 = canvas7.getContext("2d");
		var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);
	var arr2 = getArrayOfAllColors(imgData7);
	
	for(var i=0;i<arr2.length;i++)
	{
		if(white(arr2[i])||red(arr2[i])||grey(arr2[i])) continue;
		if(!includesColor(arr, arr2[i])) count++;
			

	}
	
	return count;
	

}


function save_for_gif()
{
	var canvas2 = document.getElementById("canvas20");
	var w = canvas2.width;
	var h = canvas2.height;
	var context2 = canvas2.getContext("2d");
	
	var canvas = document.createElement("canvas");//document.getElementById("canvas0");
	canvas.id = 'save_canvas_'+document.getElementById("canvases").childElementCount;
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext("2d");
	

	context.drawImage(canvas2,0,0);
	canvas.classList.add("saved_canvas");
	
	canvas.onclick=function(){
		if( prompt("Are you sure for removing this frame? (y/n)","y")=="y" )
document.getElementById("canvases").removeChild(this);
			
		
	}
	
	//save_for_gif
	
	document.getElementById("canvases").appendChild(canvas);
	
	return canvas;
}





function f_pattern2canvas( session_id)
{
	glob_session_id = session_id;
	
	
	
	f_getChaosedLabirint(  function() { 
	
	
	if(check_all_white()) {clean();}
	
	
	// save();
						
	//var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top;		
	
				// var xhr = new XMLHttpRequest();
				// xhr.open('POST', global_url_to_glab+'/get_xy_labirint', true);
				// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				// xhr.onload = function(e) {  
			
					// if (xhr.readyState != 4) return;
				
					// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					var res = s_get_xy_labirint(glob_session_id);
					
					
					var obj = JSON.parse(res);
					glob_x_left_top=Number(obj.x);
					glob_y_left_top=Number(obj.y);
					
					//avtomatik_move_to();
					
					// var canvas0 = document.getElementById("canvas0");
					// var context0 = canvas0.getContext("2d");
					// var color = get_near_first_non_white(context0,glob_x_left_top,glob_y_left_top);
					
					
					// if(color==null)
					// {
						// //
						// glob_x_left_top=document.getElementById("canvas0").width/2|0;//Number(obj.x);
					    // glob_y_left_top=document.getElementById("canvas0").height/2|0;//Number(obj.y);
						
					
						
					// }
					document.getElementById("pixels").style.display='block';
						
					var cmd = localStorage.getItem("from_portal");
	if(cmd!=null)
	{
		if(cmd=="true")
		{
			var x = Number(localStorage.getItem("xs"));
			var y = Number(localStorage.getItem("ys"));
			localStorage.removeItem("xs");
			localStorage.removeItem("ys");
			localStorage.removeItem("from_portal");
			refresh_map();
			
		/////////////////////////////////	call_non_salamandra(x,y);
			return;
		}
			
	}		


	// glob_game_only_start=localStorage.getItem("glob_game_only_start");
	// if(glob_game_only_start==null) {
		// glob_game_only_start=true;
		// localStorage.setItem("glob_game_only_start","true");
	// }
	// else {
		// glob_game_only_start=false;
		// localStorage.setItem("glob_game_only_start","false");
	// }
	
	
	
	// if(glob_game_only_start)  
	// {
							
		// glob_game_only_start=false;
	

	glob_moves_counter = localStorage.getItem("glob_moves_counter");	
	if(glob_moves_counter==null) {
		glob_moves_counter=0;
		localStorage.setItem("glob_moves_counter","0");																		
	}
	else {
		glob_moves_counter = Number(glob_moves_counter);
		localStorage.setItem("glob_moves_counter",""+glob_moves_counter);	
	}
	
	document.getElementById("moves_span_id").innerHTML = "MOVES: "+glob_moves_counter;

	
	glob_gold_counter = localStorage.getItem("glob_gold_counter");	
	if(glob_gold_counter==null) {
		glob_gold_counter=0;
		localStorage.setItem("glob_gold_counter","0");																		
	}
	else {
		glob_gold_counter = Number(glob_gold_counter);
		localStorage.setItem("glob_gold_counter",""+glob_gold_counter);	
	}
	
	document.getElementById("gold_span_id").innerHTML = "GOLD: "+glob_gold_counter;

	
	
	if (( exist_any_gold() == false ) && glob_gold_counter == 0 ) 
	{	
		set_gold();
		
		//remove_first_for_gif();
		//save_for_gif();
		//show_hide_make_gif_div();
		//white_square();
		
		f_send_to_server_changed_canvas( function(){
														
		
		f_set_xy_w2h2(
		
		function(){
			
			
			refresh_map();
		f_send_to_server_changed_canvas( function(){
																
			f_labirint(glob_x_left_top,glob_y_left_top);
			launch_robot();
			call_control_z_function();
			save_key_point_canvas();
			refresh_map();
		//save_micro_for_gif();
		//show_hide_map();
			global_do_work=false;	
	});
			
			
			
			
		}
		
		
		
		
		);
		
		
		});
		
		
		
		
		
		
		
		
		//set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
	}
	else{
		
		
		var pasted = localStorage.getItem("pasted");
		if(pasted=="true")
		{
			var p = get_center_point();
			if(p.length==2){
			glob_x_left_top=p[0];
			glob_y_left_top=p[1];
			}
			
			
		}
		
		localStorage.setItem("pasted","false");
			
			
			
		refresh_map();
			f_send_to_server_changed_canvas( function(){
																	
				f_labirint(glob_x_left_top,glob_y_left_top);
				launch_robot();
				call_control_z_function();
				global_do_work=false;	
		});
	}
					
	});
}







function save_key_point_canvas()
{
	
	
	var canvas2 = document.getElementById("canvas0");
	var w = canvas2.width;
	var h = canvas2.height;
	var context2 = canvas2.getContext("2d");
	
	var canvas = document.createElement("canvas");//document.getElementById("canvas0");
	canvas.id = 'key_point_canvas_'+document.getElementById("key_point_canvases").childElementCount;
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext("2d");
	
	var tm = new Date().getTime();
	var save_name = "";
	if(canvas.id== "key_point_canvas_0") save_name=canvas.id+"_"+tm;
	else save_name = prompt("Enter name for this save",canvas.id+"_"+tm);
	
	if(save_name==null) return;

	context.drawImage(canvas2,0,0);
	canvas.classList.add("saved_canvas");
	canvas.setAttribute("save_name", ""+save_name);
	canvas.onclick = function() {
		if( prompt("Are you sure for removing this frame? (y/n)","y")=="y" )
		{
			document.getElementById("key_point_canvases").removeChild(this);
			localStorage.removeItem(""+save_name+"_canvas");
			localStorage.removeItem(""+save_name+"_xy");
			
		}
	}
	
	document.getElementById("key_point_canvases").appendChild(canvas);
	
	var dataUrl = canvas.toDataURL();
	localStorage.setItem(""+save_name+"_canvas",dataUrl);
	localStorage.setItem(""+save_name+"_xy",JSON.stringify([glob_x_left_top,glob_y_left_top]));
	
}

function save_micro_for_gif()
{
	var canvas2 = document.getElementById("canvas0");
	var w = canvas2.width;
	var h = canvas2.height;
	var context2 = canvas2.getContext("2d");
	
	var canvas = document.createElement("canvas");//document.getElementById("canvas0");
	canvas.id = 'key_point_canvas_'+document.getElementById("key_point_canvases").childElementCount;
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext("2d");
	

	context.drawImage(canvas2,0,0);
	canvas.classList.add("saved_canvas");
	
	canvas.onclick=function(){
		if( prompt("Are you sure for removing this frame? (y/n)","y")=="y" )
document.getElementById("key_point_canvases").removeChild(this);
			
		
	}
	
	//save_for_gif
	
	document.getElementById("key_point_canvases").appendChild(canvas);
	
	return canvas;
}





function f_get_session_id(callback)
{
	//yet, here, we need check free localStorage access yet
	var last_session_md5 = localStorage.getItem('last_session_md5');
	var params='md5=new';
	if( last_session_md5 != null ) params='md5='+last_session_md5;
	params+='&rnd_pattern_schema=4';
	
	var post = {};
	 post["rnd_pattern_schema"]=4;
	 post["md5"]=last_session_md5;
	
		if(post["md5"]==null) localStorage.clear();
		
			callback(init_pixels(post));
			
		
	// }
	// catch(err)
	// {
		// onerror(err);
	// }
	
}









var global_do_work=false;
var global_cliked_points_array=[];
var global_bgcolor=getWhiteSpaceColor();
var global_counter=0;
var MAX_CHARGE=10;
function processing_click()
{
	//if(global_do_work==true) return;
	// if(global_do_work==true) { 
		
		// global_counter++; 
		
		// if( global_counter>3)  {		global_counter=0;global_do_work=false;	}
	
		// return;
	 // }
								
	global_counter=0;
	
									 
		is_server_buzzy( function( data) {
		
				if(data=='false')
				{
					
						
						
						get_last_version_of_pattern( function() {  
								
								 
								if(global_cliked_points_array.length>0)
								{
										var x = global_cliked_points_array[0][0];
										var y = global_cliked_points_array[0][1];
										
										global_cliked_points_array.splice(0,1);
										
										
										var canvas1 = document.getElementById('move_'+x+'_'+y);
										if(canvas1!=null)
										{
											document.getElementById("moves").removeChild(canvas1);
											
											
										}
										
										if((filter_include(x,y) && filter_exclude(x,y))==false)
										{
											//avtomatik_move_to_wrapper(x,y);
											//mod_salamander_pro_processing_avto_click();
											global_do_work=false;	
											return;
										}
										
										
									if(click_on_white(x,y)==false)	sound();	
										
									
																		
										//console.log("colors.length=");
										get_neighbours(x,y, function( colors ) {
											console.log("colors.length="+colors.length);
										//	if(colors.length>
											
											// labirint(x,y);
												
												doLeftClick(x,y,function() {
													
													// var maxy=0;var mi=-1;
													// for(var i=0;i<global_dummy_fast_thread_border_cluster.length;i++)
													// {
														// if(global_dummy_fast_thread_border_cluster[i][1]>maxy) 
														// {maxy=global_dummy_fast_thread_border_cluster[i][1];
														// mi=i;}
													// }
													// glob_x_left_top=global_dummy_fast_thread_border_cluster[mi][0];
													// glob_y_left_top=global_dummy_fast_thread_border_cluster[mi][1]-1;
													
													/////////////// here we learn to fly /////////////////
													//avtomatik_move_to();
													
													////////////////////////////////////////////
													
												//	avtomatik_move_to();
												
												
													if(check_all_white()) clean();
																	
												
													
													
															send_to_server_changed_canvas( function(){
																
															//		labirint(glob_x_left_top,glob_y_left_top);
																	
																	
																	
																	// setTimeout(function(){
													
													// // var canvas2 = document.getElementById("canvas0");
													// // var w = canvas2.width;
													// // var h = canvas2.height;
													// // var context2 = canvas2.getContext("2d");
													// // context2.fillStyle="black";
													// // context2.fillRect(glob_x_left_top,glob_y_left_top,1,1);
													
													// // refresh_map();
													
													
													
													// }a0);
													
													
													
																	
																//avtomatik_move_to();	
																	
																	 samson();
																	
																	
																	// refresh_map();
																	
																
																	// 
																	
																	//labirint(glob_x_left_top,glob_y_left_top);
																	 setTimeout(	function(){
																		 avtomatik_move_to();
																		 samson();
																		// //labirint(glob_x_left_top,glob_y_left_top);
																		
																		 },500);
																	global_do_work=false;	
																	
																		
																	//setTimeout(	mod_salamander_pro_processing_avto_click, glob_thinking_time_delay);
															});
														
												});
											
											
										});
										
										
												
										
									
								}
								else
								{
									
									
								}
								
							} );
			
				}
				else  
				{
					
					console.log('Server is buzy');
					setTimeout( processing_click, 500 );
				}
	});
	
	
	
}
var glob_robot_interval_ID = null;
function grey_in_neighbours(arr){
	var res=[];
	console.log("in grey: "+arr);
	var w = document.getElementById("canvas0").width;
	var h = document.getElementById("canvas0").height;
	for(var i=0;i<arr.length;i++)
	{
		var x = arr[i][0];
		var y = arr[i][1];
		if(x<0) return res.push(arr[i]);
		if(x>w-1) return res.push(arr[i]);
		if(y<0) return res.push(arr[i]);
		if(y>h-1) return res.push(arr[i]);
		
		
			var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = getColorArrayFromImageData(imgData7, x, y);
		if(compareColors(bgcolor,[127,127,127,255])) res.push(arr[i]);
		
		
		
		
		
		
		
	}
	return res;
}

function not_grey_in_neighbours(arr){
	
	var res=[];
	//console.log("in not_grey: "+arr);
	var w = document.getElementById("canvas0").width;
	var h = document.getElementById("canvas0").height;
	for(var i=0;i<arr.length;i++)
	{
		var x = arr[i][0];
		var y = arr[i][1];
		
		//if(tr_black(color0)) continue;
	//	if(filter_include(x,y)==false) continue;
	//	if(filter_exclude(x,y)==false) continue;
		//if(is_white(color0)==true) continue;
		
		if(x<0) continue;
		if(x>w-1) continue;
		if(y<0) continue;
		if(y>h-1) continue;
		
		if(is_near_grey(x,y)==true) continue;
		
		 // var canvas7 = document.getElementById("canvas0");
	 // var context7 = canvas7.getContext("2d");
	 // var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	 // var bgcolor = getColorArrayFromImageData(imgData7, x, y);
	 // if(tr_black(bgcolor)) continue;
		
		// if(compareColors(bgcolor,[127,127,127,255])) continue;
		
		
		res.push(arr[i]);
		
		//break;
	}
	shuffle(res);
	
	return res;
}

function gold_counter_refresh()
{
	localStorage.setItem("glob_gold_counter",""+glob_gold_counter);	
	document.getElementById("gold_span_id").innerHTML = "GOLD: "+glob_gold_counter;

}

function gold_counter_incr()
{
	glob_gold_counter++;
	gold_counter_refresh();
}

function takes_counter_refresh()
{
	localStorage.setItem("glob_takes_counter",""+glob_takes_counter);	
	document.getElementById("takes_span_id").innerHTML = "TAKES: "+glob_takes_counter;

}

function takes_counter_incr()
{
	glob_takes_counter++;
	takes_counter_refresh();
}

function createRasterPortalGates(points, colors, callback)
{
	if(points.length==0) { callback(); 
	
	
	
	
	return; }
	
	
	
		var x=points[0][0];
		var y=points[0][1];
			
			var scale_koeficient=2;
			var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery=1';	
			
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/add_boh_pixel', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
			
			
			if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				// var newImg = document.createElement("img");
								
				// var urlCreator = window.URL || window.webkitURL;
				
				// var imageUrl = urlCreator.createObjectURL(xhr2.response);
				
					// newImg.onload = function() {	
					
					// // showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					// var canvas = document.getElementById("pixels");
					// if(canvas == null) throw new Error("Canvas pixels not found");
					
					// var ctx = canvas.getContext("2d");
					// canvas.width = newImg.width;
					// canvas.height = newImg.height;
					// ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					// getChaosedLabirint(function(){
					
						points.shift();
						colors.shift();
						
						createRasterPortalGates( points, colors, callback );
						
					//}	
					
					//);
					
					
			
			//}
			//newImg.src = imageUrl;	
			
			}
			
			
			xhr2.send(params);	
	}

function f_set_xy_w2h2(callback)
{
	var canvas = document.getElementById('canvas0');
	var w = canvas.width;
	var h = canvas.height;
	
	var post = {}
	post["md5"]=glob_session_id;
	post["x"]=glob_x_left_top;
	post["y"]=glob_y_left_top;
	s_set_xy_labirint(glob_session_id,glob_x_left_top,glob_y_left_top);
	
	// var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top;		
// //	glob_x_left_top=(w/2|0);
// //	glob_y_left_top=(h/2|0);
	
		// var xhr22 = new XMLHttpRequest();
		// xhr22.open('POST', global_url_to_glab+'/set_xy_labirint', true);
		// xhr22.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// xhr22.responseType = "blob";
		// xhr22.onload = function() {  
			
			// if (xhr22.readyState != 4) return;

			// if (xhr22.status != 200) {  var error = xhr22.status + ': ' + xhr22.statusText+': '+xhr22.response; onerror(error); return; }
			
			// var newImg = document.createElement("img");
								
				// var urlCreator = window.URL || window.webkitURL;
				
				// var imageUrl = urlCreator.createObjectURL(xhr22.response);
					
				// newImg.onload = function() {	
					
					// var canvas = document.getElementById('canvas0');
					
					// canvas.width = newImg.width;
					// canvas.height = newImg.height;
					// var context = canvas.getContext("2d");
					// context.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					if(callback) callback();
					
			
				// }
				// newImg.src=imageUrl;	
				
						
		// }				
		// xhr22.send(params);
		
}	

function update_main_image()
{
		if(global_do_work==true) return;
	get_last_version_of_pattern( function() {  	} );
}
var global_fill_color=null;
function doLeftClick(x,y,callback)
{
	 
	 if(global_state==PAUSED)
	 {
		 setTimeout(function(){global_state=null;
										doLeftClick(x,y,callback);
										},PAUSE_INTERVAL);
			return; 
	 }
	 
		// var r=prompt("conti?","1");
		// if(r!="1")
		// {
			// setTimeout(function(){ doLeftClick(x,y,callback);},10000);
			// return;
		// } 
	 
	 
	if(global_do_work==true) {

			global_state=PAUSED;  
			setTimeout(function(){
				global_state=null;
										doLeftClick(x,y,callback);
										},PAUSE_INTERVAL);
			return; 
	}
	
	//global_do_work=true;
	 

	 //get color from cnv7
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = getColorArrayFromImageData(imgData7, x, y);
		
		
		
		
	
		
					init_dummy_fast_thread();
						
					global_dummy_fast_thread_arr2_all = [[x,y,1]];

					
					global_dummy_fast_thread_imgData =imgData7;// imgData9;
					
					global_dummy_fast_thread_in_cluster = [];
					global_dummy_fast_thread_border_cluster = [];
					
					global_dummy_fast_thread_color = bgcolor;
					global_removed_x_y_obj = {};
					global_dummy_fast_thread_first_x=x;
					global_dummy_fast_thread_first_y=y;
					
					
					//var arr = getSameColorNeighbors0( global_dummy_fast_thread_imgData, global_dummy_fast_thread_color, x, y, 1, 1 );
							
					//if(arr[0].length==0) { callback(); return; }
					global_fill_color=getRndColor();

				
							
					dummy_fast_thread (   function()   {
							
							var canvas7 = document.getElementById("canvas0");
							var context7 = canvas7.getContext("2d");
							
							context7.putImageData(imgData7,0,0);
							global_dummy_fast_thread_border_cluster.push([x,y]);
							post_bubabu(global_dummy_fast_thread_border_cluster,getWhiteSpaceColor());//global_fill_color); 
							refresh_map();
							global_do_work=false;
						
							callback();
										
										
					} );
		
		
		
}

function f_send_to_server_changed_canvas( callback )
{
		mod_salamander_stop	();
		global_state=ALL_PROCESSES_SLEEP_FOR_SERVER;
		//filtering_tiles();
	//	localStorage.removeItem('last_session_md5');
	//arrayBufferFromCanvasToServer('canvas0', global_url_to_glab+'/blob_to_server_and_echo_from_server', callback, onerror);
	//arrayBufferFromCanvasToServer('canvas0', global_url_to_glab+'/test245', callback, onerror);
	var canvas = document.getElementById('canvas0');
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	
	var wi = imageData.width;
	var he = imageData.height;
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	for(var i=0;i<imageData.data.length;i++)buf8[i]=imageData.data[i];
		
		
		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', global_url_to_glab+'/array_buffer_to_server', true);
		// xhr.onload = function() {  
			
			// if (xhr.readyState != 4) return;

			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			//var data_id = ''+array_buffer_to_server(buf);
			// works 
			//console.log('data_id='+data_id);
			
			var post = {}
			post["md5"]=glob_session_id;
			//post["data_id"]=data_id;
			post["wi"]=wi;
			post["he"]=he;
			// var params='md5='+glob_session_id+'&data_id='+data_id;
			// var xhr2 = new XMLHttpRequest();
			// xhr2.open('POST', global_url_to_glab+'/commit_labirints_changes', true);
			// xhr2.onload = function() {  
				
				// if (xhr2.readyState != 4) return;

				// if (xhr2.status != 200) { 	var error = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; if(onerror) onerror(error); return; }
				xhr2_responseText = commit_labirints_changes(glob_session_id,imageData);
				
				if((xhr2_responseText.indexOf('get_chaosed_labirint:error: may be white')===0)||
				(xhr2_responseText.indexOf('changes commited. png is white')===0))
				{
					if(check_all_white())
					{
					//alert('png is white');
					localStorage.removeItem("last_session_md5");
					localStorage.removeItem("glob_game_only_start");
					location.reload();
					}
					else callback();
					// var params='md5='+glob_session_id;
					// var xhr = new XMLHttpRequest();
		
					// xhr.open('POST', global_url_to_glab+'/get_labirint_id', true);
					
					// xhr.onload = function(e) {  

						// if (xhr.readyState != 4) return;
						
						// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
						
						// glob_session_id = xhr.responseText;
	
						// getChaosedLabirint(  function() { 
						// var canvas0 = document.getElementById("canvas0");
		// var context0 = canvas0.getContext("2d");
		// mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);

							// global_state=null;
							
						// });	
											
						
						
						
					// }
					
					// xhr.send(params);
				}
					
					
					
					
					
					
					
					
					
					
					
					//o( function(){ pattern2canvas(  callback ); } );
					
				
				else
				//is_server_buzzy(function(){
					callback();
				//	});
				
				
		
	
	
			
}

function click_on_white(x,y)
{
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = getColorArrayFromImageData(imgData7, x, y);
	var f=false;
	
	{
		if( rt_compareColors(bgcolor,getWhiteSpaceColor(),0)==true )
		{ f=true;}
	}
	return f;
}

function ctrlz(e)
{
	if(global_state==ALL_PROCESSES_SLEEP_FOR_SERVER) return;
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
	var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= getColorArrayFromImageData(imgData0, x, y);
		
		if(is_white(_color)) 
		{
			
			return;
		}
		
		e.preventDefault();
	mod_salamander_set_global_fill_color();
	
	
	
	return;
	
		if(global_do_work==true) return;
	
		global_do_work=true;
		
		
		
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= getColorArrayFromImageData(imgData0, x, y);
		var bgcolor = getWhiteSpaceColor();
		
		
		if( (bgcolor[0]==_color[0]) && (bgcolor[1]==_color[1]) && (bgcolor[2]==_color[2]) && (bgcolor[3]==_color[3]) ) 
		{
			global_do_work=false;
			return;
		}
		
		
		
		
			repeat();
			labirint(x,y);
			
			return;
		
		
		
		
		
		
		return;
		
		global_do_work=true;
			var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= getColorArrayFromImageData(imgData0, x, y);
		var bgcolor = global_bgcolor;
		
		if( (bgcolor[0]==_color[0]) && (bgcolor[1]==_color[1]) && (bgcolor[2]==_color[2]) && (bgcolor[3]==_color[3]) ) 
		{
			
				e.preventDefault();
		
		
		
		
		//get color from cnv7
		var canvas7 = document.getElementById("canvas7");
		var context7 = canvas7.getContext("2d");
		var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

		var color = getColorArrayFromImageData(imgData7, x, y);
		//get cluster x y
		var ind = findRemovedClusterIndexByColor(color);
		if(ind==-1)
		{
			//alert('cluster not found');
			global_do_work=false;
			return;
		}
		//get points of cluster
		//var x1=global_table_of_clusters[ind][1];
		//var y1=global_table_of_clusters[ind][2];
		var arr=global_table_of_clusters[ind].points;//dummy_fast(x1,y1);
		//show on cnv0 with buffering within 1 second one second
		global_table_of_clusters[ind].off=false;
		//post_bubabu(arr[1],[255,0,0,255]); 	
		
		setTimeout( function(){
			//render from global_table_of_clusters
			renderCanvas0();
			global_do_work=false;
			
		}, 100 );
		
		
		
		
		
		
		
		
		
		
		}
		
		
		
		
		
		
		
		
		

		
}



function f_getChaosedLabirint(callback)
{
	// var params = 'md5='+glob_session_id;
		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', global_url_to_glab+'/get_chaosed_labirint', true);
		// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// xhr.responseType = "blob";
		// xhr.onload = function() {  
			
			// if (xhr.readyState != 4) return;

			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			var newImg = get_chaosed_labirint(glob_session_id);
			
			// var newImg = document.createElement("img");
								
			// var urlCreator = window.URL || window.webkitURL;
				
			// var imageUrl = urlCreator.createObjectURL(xhr_response);
					
			// newImg.onload = function() {	
					
							
					var canvas = document.getElementById("canvas0");
					if(canvas == null) throw new Error("Canvas  not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.putImageData(newImg,0,0);
					//ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					// ctx.fillStyle='white';
					// ctx.fillRect(0,0,5,canvas.height);
					// ctx.fillRect(0,0,canvas.width,5);
					// ctx.fillRect(canvas.width-5,0,5,canvas.height);
					// ctx.fillRect(0,canvas.height-5,canvas.width,5);
					
					
					
						
					
					
					f_get_array_of_all_generated_stones( function() { if(callback) callback(); }	);
					
					//getPassColor();
			//}		
			//newImg.src = imageUrl;			
		
}	












function moves_counter_refresh()
{
	localStorage.setItem("glob_moves_counter",""+glob_moves_counter);	
	document.getElementById("moves_span_id").innerHTML = "MOVES: "+glob_moves_counter;

}

function moves_counter_incr()
{
	glob_moves_counter++;
	moves_counter_refresh();
}


function reload_pixels()
{
	
			// //var params = 'md5='+glob_session_id+'&x='+glob_x_left_top+'&y='+glob_y_left_top+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			// //glob_x_left_top=x;
			// //glob_y_left_top=y;
			
	
	// var xhr2 = new XMLHttpRequest();
			// xhr2.open('POST', global_url_to_glab+'/init_labirint_settings', true);
			// xhr2.responseType = "blob";
			// xhr2.onload = function() {  
			
				// if (xhr2.readyState != 4) return;

				// if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				// var newImg = document.createElement("img");
								
				// var urlCreator = window.URL || window.webkitURL;
				
				// var imageUrl = urlCreator.createObjectURL(xhr2.response);
					
				// newImg.onload = function() {	
					
					// showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					// var canvas = document.getElementById("pixels");
					// if(canvas == null) throw new Error("Canvas pixels not found");
					
					// var ctx = canvas.getContext("2d");
					// canvas.width = newImg.width;
					// canvas.height = newImg.height;
					// ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					// labirint(glob_x_left_top,glob_y_left_top);
				// }
			// }
			// xhr2.send(construct_params());
					
}


function	whenUserLeftClickOnPixels(x,y,key)
{
								console.log("Before we here:");
								 console.log('glob_x_left_top='+glob_x_left_top);
						 console.log('glob_y_left_top='+glob_y_left_top);
						 console.log("We want to mo move to:");
								 console.log('x='+x);
						 console.log('y='+y);
								var nn = 2;
									var n = (x/(10*nn)|0)-7; //n is x in canvas0
									var m = (y/(10*nn)|0)-7; //m is y in canvas0
									 console.log('n='+n);
						 console.log('m='+m);
						 
						 var f_glob_x_left_top = glob_x_left_top+n;
						 var f_glob_y_left_top = glob_y_left_top+m;
						 
						 moves_counter_incr();
						 
						  var canvas = document.getElementById("canvas0");
			var ctx = canvas.getContext("2d");
			var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			var color2 =  getColorArrayFromImageData(im, glob_x_left_top+n, glob_y_left_top+m);
						 if(n==0 && m==0)
						 {
							 global_state=null;
							 if(all_white_arround(ctx, glob_x_left_top,glob_y_left_top)) {
								 
								 if(is_gold(color2)) {
				set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
				send_to_server_changed_canvas(()=>{
							
							samson(); //
				refresh_map(); //
				return;
				});
				return;
			}	

								 
								 call_non_salamandra(glob_x_left_top,glob_y_left_top);
							 }
							 return;
						 }
						
			if(tr_black(color2)) return;
			if(is_one_tr_black_arround(ctx, glob_x_left_top+n, glob_y_left_top+m)) return;
			if(is_white(color2)) return;
			if(is_gold(color2)) {
				// set_pixel("canvas0",glob_x_left_top+n, glob_y_left_top+m,getWhiteSpaceColor());
				// send_to_server_changed_canvas(()=>{
							
							// samson(); //
				// refresh_map(); //
				// return;
				// });
				return;
			}	





							
						 if(is_near_non_grey(glob_x_left_top,glob_y_left_top)==false)  {
							 robot_home();
							 return;  
						 }
						 if(click_near_last_xy(glob_x_left_top,f_glob_x_left_top,glob_y_left_top,f_glob_y_left_top)==false)
						 {
							 robot_home();
							 return;  
						 }
							 
						// if(Math.abs(glob_x_left_top-f_glob_x_left_top)>1) return;
						// if(Math.abs(glob_y_left_top-f_glob_y_left_top)>1) return;
						 
						 
						 
						 													
		  
			
			
				if(key=="open")
				{
					
					
					
									
					if(compareColors(color,color2)==false)
					{
						
							
								
						get_neighbours_points(glob_x_left_top+n,glob_y_left_top+m,function(points,colors){
									
									console.log("points: "+points);
									console.log("colors: "+colors);
								
								
								
									if(colors.length==7) return;
									if(colors.length==8) return;
								
								
								
								
								console.log("This is not 8 empty space -->>"+colors.length);
								
								//glob_x_left_top=f_glob_x_left_top;
								//glob_y_left_top=f_glob_y_left_top;
								
								//pixelsPro_whenClickedOnLabirint(x,y);
								
								doLeftClickOnPixelCanvas(x,y);
								
								
								
						});
								
									
					}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}
else
{	
								
					if(compareColors(color,color2)==true)
					{
						
							
								
						get_neighbours_points(f_glob_x_left_top,f_glob_y_left_top,function(points,colors){
									
							//		console.log("points: "+points);
							//		console.log("colors: "+colors);
								
								
								
									// if(colors.length==7) {
										// if(n==0)return;
										// if(m==0)return; 
									// }
									
									if(colors.length==8) return;
								
								
								
								
								console.log("This is not 8 empty space -->>"+colors.length);
								
								//glob_x_left_top=f_glob_x_left_top;
								//glob_y_left_top=f_glob_y_left_top;
								
								//pixelsPro_whenClickedOnLabirint(x,y);
								
								doLeftClickOnPixelCanvas(x,y);
								
								
								
						});
								
									
					}
					else 
					{						
						
						var diff = get_diff_direct(glob_x_left_top,glob_y_left_top,glob_x_left_top+n,glob_y_left_top+m,color,color2);
						if(diff.length==0) return;
						//set_pixel("canvas0",glob_x_left_top+n+diff[0],glob_y_left_top+m+diff[1],color2);
						set_pixel("canvas0",glob_x_left_top+n,glob_y_left_top+m,getWhiteSpaceColor()); 
						set_pixel("canvas0",diff[0],diff[1],color2);
						send_to_server_changed_canvas(()=>{
							
							samson(); //
							refresh_map(); //
							
							// setTimeout( function(x,y) {
								// return function(){
								// var canvas = document.getElementById("canvas0");
			// var ctx = canvas.getContext("2d");
			// var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			// var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			// var color2 =  getColorArrayFromImageData(im, x,y);	
								
								
								// if(is_gold_inside(x,y)) {
									
									// // if(is_gold_inside(glob_x_left_top,glob_y_left_top))
									// // {
										// // i_found_gold();
									// // }
									
									// if(is_gold(color2)==false) return;
									
								// }
								// else
								// {
									// oncontext_menu_pixels(x,y);
								// }
							
								// }}(diff[0],diff[1]),100); 
							
							
							
							
						});
						//avtomatik_move_to();
						//samson();
						//location.reload();	
						//if(is_stone_point(glob_x_left_top,glob_y_left_top)==true)	
						//                doLeftClickOnPixelCanvas(x,y);
					}	
					
						
}
							
}

function oncontext_menu_pixels(f_glob_x_left_top,f_glob_y_left_top)
{
	if(right_click_near_last_xy(glob_x_left_top,f_glob_x_left_top,glob_y_left_top,f_glob_y_left_top)==false) return;  
			
var canvas = document.getElementById("canvas0");
			var ctx = canvas.getContext("2d");
			var im=ctx.getImageData(0,0,canvas.width,canvas.height);
			var color =  getColorArrayFromImageData(im, glob_x_left_top, glob_y_left_top);
			var color2 =  getColorArrayFromImageData(im, x,y);	
											
	 		
	if(is_white(color)&&is_white(color2)) return;
	
	if(is_gold(color2)) gold_counter_incr();
				
					
	var params = 'md5='+glob_session_id+'&x='+f_glob_x_left_top+'&y='+f_glob_y_left_top;		
	
		//send to server
		var xhr22 = new XMLHttpRequest();
		xhr22.open('POST', global_url_to_glab+'/set_xy_labirint', true);
		xhr22.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr22.responseType = "blob";
		xhr22.onload = function() {  
			
			if (xhr22.readyState != 4) return;

			if (xhr22.status != 200) {  var error = xhr22.status + ': ' + xhr22.statusText+': '+xhr22.response; onerror(error); return; }
			
				
				
				
					glob_x_left_top=f_glob_x_left_top;
					glob_y_left_top=f_glob_y_left_top;
								
					var i=getRandomInt(0,100);				
					if( i<0) call_pazzl_portal();
						
					//////////////////////////////////////////////				
					else call_non_salamandra(f_glob_x_left_top,f_glob_y_left_top);
					////////////////////////////
						
		}				
		xhr22.send(params);
}

function get_diff_direct(x0,y0,x,y, color0,color2)
{
	
	var arr=[];
	
	 if(click_near_last_xy(x0,x,y0,y)==false) return [];  
						
	
	
	var canvas = document.getElementById("canvas0");
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(x-1,y-1,3,3);
	var i=0;
	for(var m=y-1;m<y+2;m++)
	{
		for(var n=x-1;n<x+2;n++)
		{
			
			if((x0==n)&&(y0==m)) { i+=4;continue;}
				
		var color = [ im.data[i],im.data[i+1],im.data[i+2],im.data[i+3] ]
		
		if(compareColors(color,getWhiteSpaceColor())) {arr.push([n,m]); i+=4;continue;}
		if(compareColors(color,color2)) { i+=4;continue;}
		if(compareColors(color,color0)) { i+=4;continue;}
		
		i+=4;
		}
	}
							
	if(arr.length<=1) return [];
	//if(colorNearBlack(color2))
		var rnd = get_max_near_point(arr,[x0,y0]);//getRandomInt(0,arr.length);
	//else 
	//	var rnd = get_max_near_point2(arr,[x0,y0]);
	return rnd;
}

function use_magnito_power(x0,y0,x,y, color0,color2)
{
	
	var arr=[];
	
	 if(click_near_last_xy(x0,x,y0,y)==false) return [];  
						
	var px= x;
	var py = y;
	if((x0-x)==0){
		px=x;
		if(y0>y) py=y+1;
		else if(y0<y) py = y-1; 
	}
	else if((y0-y)==0){
		py=y;
		if(x0>x) px=x+1;
		else if(x0<x) px = x-1;
	}
	else if( (Math.abs(x0-x)-Math.abs(y0-y)) == 0 )
	{
		if(x0>x) px=x+1;
		else if(x0<x) px = x-1;
		
		if(y0>y) py=y+1;
		else if(y0<y) py = y-1; 
		
	}
	
	return [px,py];
	
	// var canvas = document.getElementById("canvas0");
	// var w = canvas.width;
	// var h = canvas.height;
	
	// var arr = getWHDNeighbors(x, y, 1, 1,w,h);
	
	// var ctx = canvas.getContext("2d");
	// var im=ctx.getImageData(x-1,y-1,3,3);
	// var i=0;
	// for(var m=y-1;m<y+2;m++)
	// {
		// for(var n=x-1;n<x+2;n++)
		// {
			
			// if((x0==n)&&(y0==m)) { i+=4;continue;}
				
		// var color = [ im.data[i],im.data[i+1],im.data[i+2],im.data[i+3] ]
		
		// if(compareColors(color,getWhiteSpaceColor())) {arr.push([n,m]); i+=4;continue;}
		// if(compareColors(color,color2)) { i+=4;continue;}
		// if(compareColors(color,color0)) { i+=4;continue;}
		
		// i+=4;
		// }
	// }
							
	// if(arr.length==1) {
	
		// var rnd = get_max_near_point(arr,[x0,y0]);//getRandomInt(0,arr.length);
		
		// return arr[rnd];
	
	// }
	
	// return [];
}				

function construct_params()
{
	
	return 'md5='+glab_labirint_params.glob_session_id+'&x='+glab_labirint_params.x+'&y='+glab_labirint_params.y+'&scale_koeficient='+glab_labirint_params.scale_koeficient+'&num_of_strawbery='+glab_labirint_params.wh;	
}

function exit(num,msg)
{
	localStorage.setItem('was exit',''+num);
	localStorage.setItem('err_msg',''+msg);
	location.reload();
}

function is_white(color2)
{
	var color=getWhiteSpaceColor();
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}

function copy_to_pixels2() {
copyFromCanvasToCanvas("pixels", "pixels2");

}

function compare_and_leave_figure() {

	var canvas0 = document.getElementById("pixels");
	var context0 = canvas0.getContext("2d");
	var im0=context0.getImageData(0,0,canvas0.width,canvas0.height);
	
	var canvas2 = document.getElementById("pixels2");
	var context2 = canvas2.getContext("2d");
	var im2=context2.getImageData(0,0,canvas2.width,canvas2.height);
	var dy = 20;
	var dx = 20;
	for(var j=0;j<canvas0.height;j+=dy) {
		for(var i=0;i<canvas0.width;i+=dx) {
			var ind = im0.width * j + i << 2;	
			color0 = getColorArrayFromImageData(im0, i, j);
			color2 =  getColorArrayFromImageData(im2, i, j);
			if(compareColors(color0,color2)==false) {
				im2 = fillRectangleFast(im2,i,j,20,20,color2);
			} else {
			im2 = fillRectangleFast(im2,i,j,20,20,getWhiteSpaceColor());
			}
		}
	}
	context2.putImageData(im2,0,0);
	
}

function filtering_tiles()
{
	
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var result_png = context7.getImageData(0,0,canvas7.width,canvas7.height);
	
	
			for(var j=0;j<result_png.height;j++)
			{
				for(var i=0;i<result_png.width;i++)
				{
					
						
						var idx = result_png.width * j + i << 2;
						var color = [
							result_png.data[idx],	result_png.data[idx+1],	result_png.data[idx+2],	result_png.data[idx+3]
						];
							
							var c_a = !mod_salamander_isColor_mod_salamander_global_fill_color(color,mod_salamander_global_fill_color);
							result_png.data[idx] = (c_a)? result_png.data[idx]: 255;
							result_png.data[idx+1] = (c_a)? result_png.data[idx+1]: 255;
							result_png.data[idx+2] = (c_a)? result_png.data[idx+2]: 255;
							result_png.data[idx+3] = (c_a)? result_png.data[idx+3]: 255;
					
						
				}
			}
			
			context7.putImageData(result_png,0,0);
					
					
}

function get_first_moves_child_xy_array()
{
	if(document.getElementById("moves").childNodes.length>0)
	{
		var arr = document.getElementById("moves").childNodes[0].id.split('_');
		return [Number(arr[1]),Number(arr[2])];
	}
	return null;
}

function call_salamandra()
{
	var fake_event={};
	fake_event.preventDefault=function(){};
	fake_event.offsetX=getRandomInt(1,document.getElementById("canvas0").width-1);
	fake_event.offsetY=getRandomInt(1,document.getElementById("canvas0").height-1);
	fake_whenBrakabakaEventOccurs(fake_event);
}

function call_non_salamandra(x,y)
{
	
	var fake_event={};
	fake_event.preventDefault=function(){};
	
	fake_event.offsetX=x;
	fake_event.offsetY=y;
	whenBrakabakaEventOccurs(fake_event);
	
}
var global_was_user_click=null;
var global_number_of_user_clicks_from_last_tick=0;
function get_number_of_user_clicks_from_last_tick()
{
		var n=global_number_of_user_clicks_from_last_tick;
		//global_number_of_user_clicks_from_last_tick=0;
		return n;
}
function get_mod_salamandra_xy_so_smescheniem(mod_salamandra_x,mod_salamandra_y)
{
	
	
	if(global_was_user_click==null)
	{
		
		return [mod_salamandra_x,mod_salamandra_y];
	}
	
	
	var xy=global_was_user_click;
		
	var rc = get_near_first_non_white(xy[0],xy[1]);
	if(rc==null)
	{
		var el= document.getElementById("move_"+xy[0]+'_'+xy[1]);
		if(el!=null)
		document.getElementById("moves").removeChild(el);
		global_was_user_click=get_first_moves_child_xy_array();
		
		return [mod_salamandra_x,mod_salamandra_y];
	}
	
	
	if(xy[0]>mod_salamandra_x)mod_salamandra_x+=5;
	else if(xy[0]<mod_salamandra_x)mod_salamandra_x-=5;
	if(xy[1]>mod_salamandra_y)mod_salamandra_y+=5;
	else if(xy[1]<mod_salamandra_y)mod_salamandra_y-=5;
	return [mod_salamandra_x,mod_salamandra_y];
	
}


function whenBrakabakaEventOccurs(e)
{
	
	
	
		e.preventDefault();
		
		if(global_state==ALL_PROCESSES_SLEEP_FOR_SERVER) return;
		
		
		
		// if(isExistAnyNotRemovedClusters()==false)
		// {
			// //do_server_query();
			// location.reload();
		// }
		
	//if(global_cliked_points_array.length>MAX_CHARGE) return;
		mod_salamander_stop();
		//get x y
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		global_was_user_click=[x,y];
		global_number_of_user_clicks_from_last_tick++;
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= get_near_first_non_white(x,y); //getColorArrayFromImageData(imgData0, x, y);
		if(_color==null)_color=getWhiteSpaceColor();
		if(is_white(_color)&&all_white_arround(context0, x, y)) 
		{
			clear_riffle();
		
				
				
			
		}
		else	if(global_number_of_user_clicks_from_last_tick>500)
			{
			context0.fillStyle=getStrColorFromRGBAArray(getWhiteSpaceColor());
			context0.beginPath();
			context0.arc(x,y,5,0,2*Math.PI);
			context0.fill();
	 mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);
	global_number_of_user_clicks_from_last_tick=0;
	
	clear_riffle();
	
			}else riffle_charge(x,y,_color);
		// if(global_state==null)
		// {
			// mod_salamander_setXY(x,y);
		// }
		
		//global_state=ALL_PROCESSES_SLEEP_FOR_SERVER;
		f_processing_click();
		
		
		global_state=null;
		
		return;
			
			
		// var canvas0 = document.getElementById("canvas0");
		// var context0 = canvas0.getContext("2d");
		
		// var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		// var _color= getColorArrayFromImageData(imgData0, x, y);
		
		// if(is_white(_color)) 
		// {
			// context0.fillStyle=getStrColorFromRGBAArray(getRndColor());
			// context0.beginPath();
			// context0.arc(x,y,2,0,2*Math.PI);
			// context0.fill();
		// }
			// // mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);
			// // return;
		// // }
		
		
		
		
		// // context0.fillStyle='#ffffff';
			// // context0.beginPath();
			// // context0.arc(mod_salamandra_x,mod_salamandra_y,1,0,2*Math.PI);
			// // context0.fill();
			// mod_salamander_global_dummy_fast_thread_imgData = context0.getImageData(0,0,canvas0.width,canvas0.height);
		
		
		// //mod_salamander_setXY(x,y);
		// global_state=null;
		// return;
		
			
										// // get_neighbours(x,y, function( colors ) {
											// // console.log("colors.length="+colors.length);
			
			
			/***/
			// if((global_cliked_points_array.length==0)&&(global_do_work==false)&&(colors.length>0))
			// {
				// //global_do_work=true;
				// //repeat();
				// labirint(x,y);
				
				// return;
			// }
			// else{
				
				// //if(hfhfbhr44(x,y)) doLeftClick(x,y);
				// //var result_hgb=hfhfbhr44(x,y);
				// //if(result_hgb ) doLeftClick(result_hgb.f2_x,result_hgb.f2_y,function(){	});
				// //if(result_hgb ) labirint(result_hgb.f2_x,result_hgb.f2_y);						
									
									
							
				
			// }
										// });
			// /***/
			
			return;
		//}
		
		
		
	
	//processing_click();

}

function is_gold_inside(x,y)
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var arr = dummy_fast(x,y);
	for(var i=0;i<arr[0].length;i++)
	{
		//post_bubabu([arr[1][i]],[0,255,255,255]);
		//refresh_map();
		if(is_one_gold_around(ctx,arr[0][i][0],arr[1][0][1])) return true;
	}
	for(var i=0;i<arr[1].length;i++)
	{
		//post_bubabu([arr[1][i]],[0,255,255,255]);
		//refresh_map();
		if(is_one_gold_around(ctx,arr[1][i][0],arr[1][i][1])) return true;
	}
	return false;
}

function is_gold(color)
{
	if(
	(color[0]==255) &&
	(color[1]==215) &&
	(color[2]==0) &&
	(color[3]==255) ) return true;
	
	return false;
}

function is_one_gold_around(context0,x,y)
{
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_gold(color0)==true) return true;
	}
	return false;
}

function is_one_tr_black_arround(context0,x,y)
{
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		//if(is_white(color0)==false)return false;
		if(tr_black(color0)==true) return true;
	}
	return false;
}

function take_gold(x,y)
{
	set_pixel("canvas0",x,y,getWhiteSpaceColor());
	send_to_server_changed_canvas(()=>{
							
		samson(); //
		refresh_map(); //
		gold_counter_incr();
		moves_counter_incr();
				
		
	 });
	 
}


function only_center(context0, x,y,color2)
{
	var counter=0;
	
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_gold(color0)==true) return false;
		if(compareColors(color0,color2)==true) { counter++; if(counter>1) return false; }
		
	}
	return true;
}



function get_white_arround(context0,x,y)
{
	var arr=[];
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_gold(color0)==true) arr.push([x,y]);
		if(is_white(color0)==true) arr.push([x,y]);
		
	}
	return arr;
}

	
function only_one_color_center(ctx, x,y,color0)
{
	var count=0;
	var imgData0 = ctx.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color2 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(compareColors(color0,color2)) count++;
		
	}
	if(count==1) return true;
	return false;
	
}

function all_white_arround_pro(context0,x,y)
{
	var count=0;
	
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_white(color0)==true) count++;
		else if(tr_black(color0)==true) count++;
		else if(is_gold(color0)==true) count++;
	}
	if(count==8) return true;
	return false;
}

function all_white_arround(context0,x,y)
{
	var imgData0 = context0.getImageData(x-1,y-1,3,3);
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_white(color0)==false)return false;
		//if(tr_black(color0)==true) return false;
	}
	return true;
}

function get_near_first_non_white_full(x,y)
{
	var arr = get_neighbours_points_pro(x,y);
	var colors = arr[1];
	var points = arr[0];
	for(var i=0;i<colors.length;i++)
	{
		var n = points[i][0];
		var m = points[i][1];
		var color0 = colors[i];
		if(tr_black(color0)) continue;
		if(filter_include(n,m)==false) continue;
		if(filter_exclude(n,m)==false) continue;
		if(is_white(color0)==true) continue;
		if(is_gold(color0)==true) continue;
		return [n,m,color0];
		
	}
	
	return [];
	
	 
}

function get_near_first_non_white(x,y)
{
	var arr = get_neighbours_points_pro(x,y);
	var colors = arr[1];
	var points = arr[0];
	for(var i=0;i<colors.length;i++)
	{
		var n = points[i][0];
		var m = points[i][1];
		var color0 = colors[i];
		if(tr_black(color0)) continue;
		if(filter_include(n,m)==false) continue;
		if(filter_exclude(n,m)==false) continue;
		if(is_white(color0)==true) continue;
		return color0;
		
	}
	
	return null;
	
	 
}

function clear_riffle()
{
	
	global_number_of_user_clicks_from_last_tick=0;
			var el = document.getElementById("moves");
			while(el.hasChildNodes()  )
			{
				var canvas1 = el.childNodes[0];
										if(canvas1!=null)
										{
											document.getElementById("moves").removeChild(canvas1);
											sound();
											
										}
										
			//	el.removeChild(el.childNodes[0]);
			}
			

			global_cliked_points_array.length=[];
}
				
	
		function riffle_charge(x,y,_color)
		{
		
		
		global_cliked_points_array.push([x,y]);
			
			
			
			
	var canvas1 = document.createElement("canvas");
	canvas1.width=8;
	canvas1.height=8;
	var context1 = canvas1.getContext("2d");
	var imgData1 = context1.getImageData(0,0,canvas1.width,canvas1.height);
	
	
	mod_salamander_global_target_color=_color;
	
	
	imgData1=fillRectangleFast(imgData1,0,0,8,8,_color);
	context1.putImageData(imgData1,0,0);
	
	
	
	
	
	canvas1.id='move_'+x+'_'+y;
	
	//canvas1.onclick = processing_click;
	//canvas1.oncontextmenu = ctrlz;
	document.getElementById("moves").appendChild(canvas1);
		}
		

// window.onload = function()
// {
	
 // }

 function init_websocket()
 {
	 	  window.WebSocket = window.WebSocket || window.MozWebSocket;

	 // var connection = new WebSocket('ws://127.0.0.1:8080');
	  var connection = new WebSocket(global_url_to_ws);

	  connection.onopen = function () {
		// connection is opened and ready to use
		console.log('connection is opened and ready to use'); 
	  };

	  connection.onerror = function (error) {
		// an error occurred when sending/receiving data
		console.log('some error occurred when sending/receiving data');
		console.log(error);
	  };

	  connection.onmessage = function (message) {
			console.log(message);
			
			get_last_version_of_pattern( function() {  	} );	
	//	var intID = setInterval( update_main_image, 500 );
		
	
	
			// try to decode json (I assume that each message
			// from server is json)
			// try {
			  // var json = JSON.parse(message.data);
			// } catch (e) {
			  // console.log('This doesn\'t look like a valid JSON: ',
				  // message.data);
			  // return;
			// }
			// handle incoming message
		};

 }
 
 function exist_any_gold()
 {
	var canvas0 = document.getElementById("canvas0");
	var context0 = canvas0.getContext("2d");
	
	var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
	
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_gold(color0)==true )return true;
	}
	return false;
 }

 function check_all_white()
 {
	var canvas0 = document.getElementById("canvas0");
	var context0 = canvas0.getContext("2d");
	
	var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
	
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triple_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(is_white(color0)==false)return false;
	}
	return true;
 }
	
function mod_triple_getColorArrayFromImageDataByIndex(imgData0, idx)
{
	
		
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function renderCanvas0()
{
	var canvas0 = document.getElementById("canvas0");
	var context0 = canvas0.getContext("2d");
	context0.fillStyle='black';
	context0.fillRect(0,0,canvas0.width,canvas0.height);
	var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
	
	for(var ind=0;ind<global_table_of_clusters.length;ind++)
	{
		var color0 = global_bgcolor;//[0,0,0,255];
		
			var arr=global_table_of_clusters[ind].points;
		if(global_table_of_clusters[ind].off==false)
		{
			
			
			color0 = global_table_of_clusters[ind].color0;
			
			
		
		
		}
	
		post_bubabu(global_table_of_clusters[ind].points,color0); 
		 	
		
	}
}

function post_bubabu(arr,color)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	for(var j=0;j<arr.length;j++)
	{
		var x=arr[j][0];
		var y=arr[j][1];
			
		imgData2 = fillRectangleFast(imgData2, x, y, 1, 1, color);	
			
	}
	context2.putImageData(imgData2,0,0);
	
}



function f_get_array_of_all_generated_stones(callback)
{
	
	
					var arr = JSON.parse(s_get_array_of_all_generated_stones(glob_session_id));
					glob_all_generated_stones=(arr);
					callback();
				
}	

	
function get_neighbours_points_pro(x0,y0)
{
	var colors=[]; var points=[];
		var canvas = document.getElementById("canvas0");
		var ctx = canvas.getContext("2d");
		var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		var arr = getWHDNeighbors(x0, y0, 1, 1);
		var color2 = getColorArrayFromImageData( im, x0, y0 );
		
		for(var i=0;i<arr.length;i++)
		{
			var x = arr[i][0];
			var y = arr[i][1];
			if((x==x0)&&(y==y0)) continue;
			if((x>=0) && (x<im.width)&&(y>=0)&&(y<im.height) )
			{
			
				
				var color =  getColorArrayFromImageData(im, x, y);
				
				//if(compareColors(color2,color))
				{
					colors.push(color);
					points.push([x,y]);
				} 
					
			}
		}
 
		return [points, colors];
				
}	


function sound()
{

	var audio = new Audio(); // Создаём новый элемент Audio
	
	audio.src = 'audio/141283__alienxxx__bubblewrap-005.wav'; // Указываем путь к звуку "клика"
	
	audio.autoplay = true; // Автоматически запускаем
	
	setTimeout(function(){audio.pause(); audio=null;},1000);
	
}


function samson()
{
	
	
	
	
		var params='md5='+glob_session_id+'&rnd_pattern_schema=4';
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/init_pixels', true);
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			glob_session_id = ''+xhr.responseText;
			// works 
			console.log('glob_session_id='+glob_session_id);
			//  return;
			// if(xhr.responseText=='test ok')
			// {
				// alert('test ok');
				// return;
			// }
			
			
			//var s = 0;//prompt("enter number",'500');
		
			//var wh = Number(s.trim());
			
			var wh=0;
			var x=glob_x_left_top;
			var y=glob_y_left_top;
			var scale_koeficient=2;
			var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			glob_x_left_top=x;
			glob_y_left_top=y;
			
			obj={}
			obj.glob_session_id=glob_session_id;
			obj.x=x;
			obj.y=y;
			obj.scale_koeficient=scale_koeficient;
			obj.wh=wh;
			
			
			glab_labirint_params=obj;
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/init_labirint_settings', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  
				var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; 
				exit(1000,error2);
				
				return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
					
				newImg.onload = function() {	
					
					showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					refresh_map();
					
				}		
	newImg.src=imageUrl;
			}
							
			xhr2.send(params);		
			glab_labirint_params=''+params;
	
		}
		
		xhr.send(params);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}



function isExistAnyNotRemovedClusters()
{
	
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i].off==false)
		{
			
			return true;
		}

	}
	return false;
}

		
		document.onkeypress = function(ev)
		{
			var ch = '';
			
					
			
			  if (ev.which != 0 && ev.charCode != 0) 
			  { 
				if (ev.which < 32)
				{
					 // спец. символ
					 console.log(ev);
					 return;
				}
				else
				{
					//console.log("ordinary "+String.fromCharCode(ev.which)); // остальные
					
					
					ch = String.fromCharCode(ev.which);
					if(ch=='m') { show_hide_map(); }
					else if(ch=='s') {	
					//save_for_gif();
					show_hide_picture_for_copy_paste();
					}
					else if (ch=='r') { show_hide_rules(); }
					else if(ch=='c') {	alert([glob_x_left_top,glob_y_left_top]); }
					//else if(ch=='t') {  create_new_stone(); }
					else if(ch=='n') { if( prompt("Are you sure for new game? (y/n)","y")=="y" ) clean(); }
					else if(ch=='z') { 
					//if( prompt("Are you sure for ctrl+z? (y/n)","y")=="y" ) 
						call_re_control_z_function(); }
					else if(ch=='r') {
						// if( prompt("Are you sure for restart this game? (y/n)","y")=="y" ) 
						// load_first_from_canvases();
					}
					else if(ch=='g') { 
					//show_hide_make_gif_div(); 
					}
					else if(ch=='p') { 
					//save_key_point_canvas();
					}
					else if(ch=='k') { 
					//show_hide_key_point_canvases(); 
					}
				//	if (ch == 'i')   { global_client_typing_mode = true; process_console_text(); }
				//	else if (ch == 's')  { modsld_saveDesktop(); alert('saved'); }
				//	else if (ch == 'c')  { global_client_typing_mode = true; cripto_script(); }
				//	else if (ch == 'd')  { global_client_typing_mode = true; decripto_script(); }
				//	else if (ch == 'r')  { global_client_typing_mode = true; restart_all(); }
				//	//else if (ch == 'l')  load_desktop_from_local_store();
				/////	else if (ch == 'p')  { global_client_typing_mode = true;print_all(); }
				///	else if (ch == 'l')  { global_client_typing_mode = true; load_all(); }
					//else if (ch == 'b')  print_buttons();
				//	else if (ch == 'e')   { 
					
				//		global_client_typing_mode = true; 
				//		execute_script(
				//			function()
				//			{
				//				global_client_typing_mode = false;
				//			}
				//		); 
				//	}
				//	else if (ch == 'h')  help();
						
				}
			  }
			
			
			//var ch = getChar(e);
			//if(ch == null) return;
			//alert(ch);
			// if(ch == 'p') showHide(document.getElementById("scale_div"));
			// else if(ch == 's') showHide(document.getElementById("seed_list"));
			// else if(ch == 'b') showHide(document.getElementById("buttons_list"));
				
		}
	
var glob_thinking_time_delay=5000;

function plus( id )
{
	
	if(id=="canvas20")
	{
		var c = document.getElementById(id);
		
		var im0 = c.getContext("2d").getImageData(0,0,c.width,c.height);
		
		
	var w = im0.width;
	var h = im0.height;
		
			
	var imgData = im0;
	
	var nn=2;
	
	var canvas2 = document.createElement("canvas");
	canvas2.width = w*nn;
	canvas2.height = h*nn;
	var context2 = canvas2.getContext("2d");
	context2.fillStyle="black";
	context2.fillRect(0,0,canvas2.width,canvas2.height);
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var col = getColorArrayFromImageData(imgData,i,j,w);
			
			//imgData2 = fillRectanglePro(imgData2, i*nn, j*nn, nn, nn, col);
			imgData2 = fillRectangleFast( imgData2, i*nn, j*nn, nn, nn, col );
			
		}
	}
	
	c.width = imgData2.width;
	c.height = imgData2.height;
	c.getContext("2d").putImageData(imgData2,0,0);	
		
	}
	
	
	
	
	
	
	
	
}

function pp()
{
	
	var canvas = document.getElementById("canvas0");
	var context = canvas.getContext("2d");
	var imgData = context.getImageData(0,0,canvas.width,canvas.height);
		
		
	var w = imgData.width;
	var h = imgData.height;
		
	var canvas2 = document.getElementById("canvas20");
	canvas2.width = w*4;
	canvas2.height = h*4;
	var context2 = canvas2.getContext("2d");
	
	context2.fillStyle="white";
	context2.fillRect(0,0,canvas2.width,canvas2.height);
	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	
	var nn=4;
	
	
	
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var col = getColorArrayFromImageData(imgData,i,j);
			
			imgData2 = fillRectangleFast( imgData2, i*nn, j*nn, nn, nn, col );
			
		}
	}
	
	canvas2.getContext("2d").putImageData(imgData2,0,0);	
	
	
	
}

function copyFromCanvasToCanvas(id, id2)
{
	
	
	
		var cf = document.getElementById(id);
		var im0 = cf.getContext("2d").getImageData(0,0,cf.width,cf.height);
		
		var ct = document.getElementById(id2);
		ct.width = im0.width;
		ct.height = im0.height;
		ct.getContext("2d").putImageData(im0,0,0);
	
	
	
	
	
	
	
}

function set_pixel(id,x,y,color)
{
	var cf = document.getElementById(id);
	var im = cf.getContext("2d").getImageData(0,0,cf.width,cf.height);
	var ind= im.width*y+x <<2;
	im.data[ind]=color[0];
	im.data[ind+1]=color[1];
	im.data[ind+2]=color[2];
	im.data[ind+3]=color[3];
	cf.getContext("2d").putImageData(im,0,0);
}

function set_hero()
{
	set_pixel("canvas20",glob_x_left_top*4+1,glob_y_left_top*4+1,[255,0,0,255]);
	set_pixel("canvas20",glob_x_left_top*4+2,glob_y_left_top*4+1,[255,0,0,255]);
	set_pixel("canvas20",glob_x_left_top*4+1,glob_y_left_top*4+2,[255,0,0,255]);
	set_pixel("canvas20",glob_x_left_top*4+2,glob_y_left_top*4+2,[255,0,0,255]);
}

		
function refresh_map()
{
	//set_pixel("canvas0",glob_x_left_top,glob_y_left_top,[255,0,0,255]);

	//var canvas = document.getElementById("canvas20");
	//canvas.width = 1;
	//canvas.height = 1;
		
	//copyFromCanvasToCanvas("canvas0","canvas20");
	pp();
	set_hero();
	
	//if(canvas.style.display!='none')	canvas.style.display='none';
	//else 
	// if(canvas.hidden==true) canvas.hidden=false;
	// else canvas.hidden=true;
	
	// canvas.hidden=true;

	//pattern2canvas(	glob_session_id );


}		

function show_map()
{
	var canvas = document.getElementById("canvas20");
	if(canvas.hidden==true) canvas.hidden=false;
}

function show_make_gif_div()
{
	var f=document.getElementById("gif_block_div_id").hidden;
	if(f==true) document.getElementById("gif_block_div_id").hidden=false;
}
function show_hide_rules() {
    var f=document.getElementById("item_rules").hidden;
	if(f==true) document.getElementById("item_rules").hidden=false;
	else document.getElementById("item_rules").hidden=true;
}
function show_hide_picture_for_copy_paste() {
    var f=document.getElementById("item0").hidden;
	if(f==true) document.getElementById("item0").hidden=false;
	else document.getElementById("item0").hidden=true;
}

function show_hide_map()
{
	var canvas = document.getElementById("canvas20");
	canvas.width = 1;
	canvas.height = 1;
		
	// copyFromCanvasToCanvas("canvas0","canvas20");
	// plus("canvas20");
	// plus("canvas20");
    pp()
	set_hero()
	var canvas = document.getElementById("canvas20");
	if(canvas.hidden==false)
	canvas.hidden=true;
	else canvas.hidden=false;
}

function imageToCanvas(img, canvas_id, callback)
{
	var canvas = document.getElementById(canvas_id);
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	var ctx = canvas.getContext("2d");
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
	
	//close timer
	if(callback) callback();
	
}



function getImageFromBlob(blob, callback)
{
	var newImg = document.createElement("img");
				
	var urlCreator = window.URL || window.webkitURL;
	var imageUrl = urlCreator.createObjectURL(blob);
		
	newImg.onload = function() {	
		
	//	console.log("img loaded");
		callback(this);
			
	}
				
	newImg.src = imageUrl;
	
}


function getImageFromCanvas(canvas_id, callback )
{
	var canvas = document.getElementById( canvas_id );//"canvas"
	if(canvas == null) throw new Error("Canvas "+canvas_id+" not found");
	
	canvas.toBlob( callback );
	
}
function getImageFromImageData(im, callback )
{
	var canvas = document.createElement( "canvas" );//"canvas"
	canvas.width=im.width;
	canvas.height=im.height;
	
	var context = canvas.getContext("2d");
	context.putImageData(im,0,0);
	canvas.toBlob( callback );
	
}

function arrayBufferFromCanvasToServer(canvas_id, url, callback, onerror)
{
	var canvas = document.getElementById( canvas_id );
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	imageData.data;
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	for(var i=0;i<imageData.data.length;i++)buf8[i]=imageData.data[i];
	//var blob = new Blob( [imageData.data], {type:'image/png'});
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		getImageFromBlob( blob_from_server, function(img) {
				imageToCanvas(img, canvas_id, function() { 
					
					//if (callback) callback();
				});	
		});
		//callback( blob_from_server );	
		
	}
	
	xhr.send(buf);
}


function blobToServer(blob, action, callback, onerror)
{
	var xhr = new XMLHttpRequest();
	xhr.open('POST', action, true);
	xhr.responseType = "blob";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		var blob_from_server = xhr.response;
		
		callback( blob_from_server );	
		
	}
	
	xhr.send(blob);
}

/**
function blobAndParamsToServer( blob, params, action, callback, onerror)
{  
    
	var args = '';
	var t='';
	
	for(var key in params) { args += (''+t+''+key+'='+encodeURIComponent(params[key])); t='&';}
	
	args  += '&md5='+imageToMd5(canvas_id);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/pre_'+action, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "text";
	xhr.onload = function(e) {  
		
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; onerror(error); return; }
		
		
		blobToServer(blob, '/'+action, callback, onerror);
	}
	
	xhr.send(args);
}
**/

function redrawProgress( progressBar )
{
	if(progressBar.value >= 99)  progressBar.value = 0;
	progressBar.value ++;
	progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
		
}

var glob_intervalID = null;
// init timer for redraw progress
function startProgress()
{
	// var progressBar = document.getElementById("progress");
	// progressBar.hidden = false;
	// progressBar.value = 0;
	// progressBar.position = "absolute";
////	progressBar.left = document.getElementById(canvas_id).width / 2|0 - 50;
////	progressBar.top =  document.getElementById(canvas_id).height / 2|0 - 50;
	// glob_intervalID = setInterval(function(){redrawProgress(progressBar)}, 1000);
	
}




function findClusterIndexByColor(color)
{
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i].off==false)
		{
			
			var arr=global_table_of_clusters[i].color7;
			if( (arr[0]==color[0]) && (arr[1]==color[1]) && (arr[2]==color[2]) && (arr[3]==color[3]) ) return i;
		}

	}
	return -1;
}


function findRemovedClusterIndexByColor(color)
{
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i].off==true)
		{
			
			var arr=global_table_of_clusters[i].color7;
			if( (arr[0]==color[0]) && (arr[1]==color[1]) && (arr[2]==color[2]) && (arr[3]==color[3]) ) return i;
		}

	}
	return -1;
}

function getWhiteSpaceColor() {
	var color = [];
	color[0] = 42;	
	color[1] = 53;	
	color[2] = 64;
	color[3] = 255;	
	return color;
}

function clean()
{
	

	// localStorage.removeItem("glob_gold_counter");
	// localStorage.removeItem("glob_moves_counter");
	localStorage.setItem("last_session_md5",glob_session_id);
	// localStorage.removeItem("xs");
	// localStorage.removeItem("ys");
	// localStorage.removeItem("from_portal");
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var w = canvas2.width;
	var h = canvas2.height;
	
	var imgData = context2.getImageData(0,0,w,h);
	//var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = getWhiteSpaceColor();
						
			imgData = fillRectangleFast(imgData, i, j, 1, 1, arr );
			
		}
		
		
	}
	
	
	context2.putImageData(imgData,0,0);
	f_save_all_settings_on_server(function(){
		localStorage.clear();
		location.reload();
	});
	
}















function is_gold_xy(x,y)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var im = context2.getImageData(x,y,1,1);
	return is_gold(im.data); 
}

function is_white_xy(x,y)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var im = context2.getImageData(x,y,1,1);
	return is_white(im.data); 
}
function tr_black_xy(x,y)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var im = context2.getImageData(x,y,1,1);
	return tr_black(im.data); 
}

var global_cell_size = 1;
var global_table_of_clusters = [];
var global_table_of_clusters7 = [];
var global_game_delay = 2000;

function whenPastingFinished(img)
{
	global_table_of_clusters =[];
	global_table_of_clusters7 = [];
	localStorage.clear();
	document.getElementById("cell_size").value=1;
	global_cell_size = 1;
	var n=1;
	
	
	var canvas = document.createElement("canvas");//document.getElementById("canvas0");
	canvas.width = img.width;
	canvas.height = img.height;
	var context = canvas.getContext("2d");
	context.drawImage(img,0,0);

	var canvas2 = document.getElementById("canvas0");
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	var context2 = canvas2.getContext("2d");
	
	
	// var canvas2 = document.getElementById("canvas0");
	// canvas2.width = canvas.width*n;
	// canvas2.height = canvas.height*n;
	// var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	var imgData = context.getImageData(0,0,canvas.width,canvas.height);
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = [];
			arr[0] = imgData.data[idx];	
			arr[1] = imgData.data[idx+1];	
			arr[2] = imgData.data[idx+2];
			arr[3] = 255;	
			
			imgData2 = fillRectangleFast(imgData2, i, j, n, n, arr );
			
		}
		
		
	}
	
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	context2 = canvas2.getContext("2d");
	context2.putImageData(imgData2,0,0);
	
	var glob_x_left_top1=w/2|0;
	var glob_y_left_top1=h/2|0;
	glob_x_left_top=glob_x_left_top1;
	glob_y_left_top=glob_y_left_top1;
	
	var color = context2.getImageData(glob_x_left_top1,glob_y_left_top1,1,1).data;
	set_pixel("canvas0",glob_x_left_top1,glob_y_left_top1,getWhiteSpaceColor()); 
						
	avtomatik_move_to();

	set_pixel("canvas0",glob_x_left_top1,glob_y_left_top1,color); 
	
	f_send_to_server_changed_canvas(()=>{refresh_map();	f_samson();})
	
	// setTimeout(function(){f_send_to_server_changed_canvas(()=>{
		
		// localStorage.setItem("pasted","true");
		// //location.reload();
		// f_get_session_id( f_pattern2canvas );
		// });},500);
	// //send_to_server_changed_canvas(function(){location.reload()});
	// //initCollectAllClusters();
	// //collectAllClusters(imgData2);
	
}


function get_min_near_point(points,point)
{
	var maxx = 0;
	var maxy = 0;
	var maxind= -1;
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {maxind=i;}
	}
	
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&& (points[i][1]==point[1])) {continue;}
		var vx = Math.abs(points[i][0]-point[0]);
		var vy = Math.abs(points[i][1]-point[1]);
		var vz = vx*vx+vy*vy;//+vy+vy
		if(vz > maxx) { maxx=vz; maxind=i}
		
		
	}
	var minx = maxx;
	var min_x_ind = -1;
	var min_y_ind = maxind;
	for(var i=0;i<points.length;i++)
	{
			if((points[i][0]==point[0])&& (points[i][1]==point[1])) {continue;}
		
		var vx = Math.abs(points[i][0]-point[0]);
		var vy = Math.abs(points[i][1]-point[1]);
		var vz = vx*vx+vy*vy;//+vy+vy
		if(vz < minx) {minx=vz;min_y_ind=i;}
	}
	
	return min_y_ind;
	
	
	
}

function get_max_color_cell(x,y){

	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
	var im = context2.getImageData(0,0,w,h);
	var counter=0;
	for(var i=x-1;i<x+2;i++)
	{
		for(var j=y-1;j<y+2;j++)
		{
			//var color0 =  context2.getImageData(glob_x_left_top,glob_y_left_top,1,1).data;
			if(tr_black_xy(i,j)) counter++;
		}
	}
	
	return 8-counter;
	
}

function move_to() {
 
 return;
 
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var color0 =  context2.getImageData(glob_x_left_top,glob_y_left_top,1,1).data;
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	
	
	var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		//if(arrN.length == 8) { //worker of year
		if(arrN[0].length !=  get_max_color_cell( glob_x_left_top,glob_y_left_top)) {
			return;
		} 
	
	
	
	var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
	// //post_bubabu(arr[1],[0,0,255,255]);
	// //return;
	// // save_all_settings_on_server();
	// // samson();
	// //var arr1 = grey_in_neighbours(arr[1]);
	var arr2 =[];
	for(var i=0;i<arr[1].length;i++)
	{
		var x = arr[1][i][0];
		var y = arr[1][i][1];
		
		//if(tr_black(color0)) continue;
	// //	if(filter_include(x,y)==false) continue;
	// //	if(filter_exclude(x,y)==false) continue;
		// //if(is_white(color0)==true) continue;
		
		
		// // if(x<1)  continue;
		// // if(x>w-2) continue;
		// // if(y<1) continue;
		// // if(y>h-2)continue;
		
			
		if(x<0)  continue;
		if(x>w-1) continue;
		if(y<0) continue;
		if(y>h-1)continue;
		
		var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), x,y, dx, dy );
		for(var j=0;j<arrN[1].length;j++)
		{
			var x2 = arrN[1][j][0];
			var y2 = arrN[1][j][1];
			if(is_gold_xy(x2,y2)==true) continue;
			arr2.push([x2,y2]);
			break;
		}
		 
		
		
		
	}
	
	glob_x_left_top=arr2[0][0];
	glob_y_left_top=arr2[0][1];



	
	
	
	

}

function move_to_new_coordinates() {
	
	sound();
	
	f_doLeftClick(glob_x_left_top,glob_y_left_top,function() {
													
												
												
		if(check_all_white()) clean();
						
	
		
		
				f_send_to_server_changed_canvas( function(){
					
						
						 f_samson();
						
						 setTimeout(	function(){
							 avtomatik_move_to();
							 f_samson();
							
							 },500);
						global_do_work=false;	
						
				});
			
	});

	

}

function rocket_jump() {
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var color0 =  context2.getImageData(glob_x_left_top,glob_y_left_top,1,1).data;
	


	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	

		var w = canvas2.width;
		var h = canvas2.height;
		
		
		
		
	var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		//if(arrN.length == 8) { //worker of year
		if(arrN[0].length !=  get_max_color_cell( glob_x_left_top,glob_y_left_top)) {
			return;
		}

		
	
		var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
		// //post_bubabu(arr[1],[0,0,255,255]);
		// //return;
		// // save_all_settings_on_server();
		// // samson();
		// //var arr1 = grey_in_neighbours(arr[1]);
		var arr2 =[];
		for(var i=0;i<arr[1].length;i++)
		{
			var x = arr[1][i][0];
			var y = arr[1][i][1];
			
			//if(tr_black(color0)) continue;
		// //	if(filter_include(x,y)==false) continue;
		// //	if(filter_exclude(x,y)==false) continue;
			// //if(is_white(color0)==true) continue;
			
			
			// // if(x<1)  continue;
			// // if(x>w-2) continue;
			// // if(y<1) continue;
			// // if(y>h-2)continue;
			
				
			if(x<0)  continue;
			if(x>w-1) continue;
			if(y<0) continue;
			if(y>h-1)continue;
			
			var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), x,y, dx, dy );
			for(var j=0;j<arrN[1].length;j++)
			{
				var x2 = arrN[1][j][0];
				var y2 = arrN[1][j][1];
				
				if(is_gold_xy(x2,y2)==true) continue;
				
				arr2.push([x2,y2]);
				break;
			}
			 
			
			
			
		}
		
		
		shuffle(arr2);	


			//var ind = get_min_near_point(arr2,[glob_x_left_top,glob_y_left_top]);
			var ind=0;
			glob_x_left_top=arr2[ind][0];
			glob_y_left_top=arr2[ind][1];


 


	
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
 
function avtomatik_move_to(){



    var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var color0 =  context2.getImageData(glob_x_left_top,glob_y_left_top,1,1).data;
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	

	if( is_white_xy(glob_x_left_top,glob_y_left_top) == true) 
	{




		var w = canvas2.width;
		var h = canvas2.height;
		
		var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
		// //post_bubabu(arr[1],[0,0,255,255]);
		// //return;
		// // save_all_settings_on_server();
		// // samson();
		// //var arr1 = grey_in_neighbours(arr[1]);
		var arr2 =[];
		for(var i=0;i<arr[1].length;i++)
		{
			var x = arr[1][i][0];
			var y = arr[1][i][1];
			
			//if(tr_black(color0)) continue;
		// //	if(filter_include(x,y)==false) continue;
		// //	if(filter_exclude(x,y)==false) continue;
			// //if(is_white(color0)==true) continue;
			
			
			// // if(x<1)  continue;
			// // if(x>w-2) continue;
			// // if(y<1) continue;
			// // if(y>h-2)continue;
			
				
			if(x<0)  continue;
			if(x>w-1) continue;
			if(y<0) continue;
			if(y>h-1)continue;
			
			var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), x,y, dx, dy );
			for(var j=0;j<arrN[1].length;j++)
			{
				var x2 = arrN[1][j][0];
				var y2 = arrN[1][j][1];
				
				if(is_gold_xy(x2,y2)==true) continue;
				
				arr2.push([x2,y2]);
				break;
			}
			 
			
			
			
		}
		
		
		
		
		
	// // //	var arr1 = not_grey_in_neighbours(arr2);
		 
		if(arr2.length>0)
		{



			var ind = get_min_near_point(arr2,[glob_x_left_top,glob_y_left_top]);
			move_to_new_coordinates();
			
			glob_x_left_top=arr2[ind][0];
			glob_y_left_top=arr2[ind][1];

			

			return;


		}

	 
		return ;
	
	}
	else 
	{
		 
		 
	if( is_gold_xy(glob_x_left_top,glob_y_left_top) == false) 
	{


		var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		//if(arrN.length == 8) { //worker of year
		if(arrN[0].length !=  get_max_color_cell( glob_x_left_top,glob_y_left_top)) {
			
			var arrN2 = getSameColorNeighbors0( imgData2,color0, glob_x_left_top,glob_y_left_top, dx, dy );
			if(arrN2[0].length > 0)
			{
				return;
			}
				for(var i=0;i<arrN2[1].length;i++) {
					if(is_gold(arrN2[1][i][2])) return;
				}
				
			
			
			
		} 
	


		var w = canvas2.width;
		var h = canvas2.height;
		
		var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
		// //post_bubabu(arr[1],[0,0,255,255]);
		// //return;
		// // save_all_settings_on_server();
		// // samson();
		// //var arr1 = grey_in_neighbours(arr[1]);
		var arr2 =[];
		for(var i=0;i<arr[1].length;i++)
		{
			var x = arr[1][i][0];
			var y = arr[1][i][1];
			
			//if(tr_black(color0)) continue;
		// //	if(filter_include(x,y)==false) continue;
		// //	if(filter_exclude(x,y)==false) continue;
			// //if(is_white(color0)==true) continue;
			
			
			// // if(x<1)  continue;
			// // if(x>w-2) continue;
			// // if(y<1) continue;
			// // if(y>h-2)continue;
			
				
			if(x<0)  continue;
			if(x>w-1) continue;
			if(y<0) continue;
			if(y>h-1)continue;
			
			var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), x,y, dx, dy );
			for(var j=0;j<arrN[1].length;j++)
			{
				var x2 = arrN[1][j][0];
				var y2 = arrN[1][j][1];
				
				if(is_gold_xy(x2,y2)==true) continue;
				
				arr2.push([x2,y2]);
				break;
			}
			 
			
			
			
		}
		
		
		
		
		
	// // //	var arr1 = not_grey_in_neighbours(arr2);
		 
		if(arr2.length>0)
		{



			var ind = get_min_near_point(arr2,[glob_x_left_top,glob_y_left_top]);
			move_to_new_coordinates();
			glob_x_left_top=arr2[ind][0];
			glob_y_left_top=arr2[ind][1];

			

			return;


		}

		 
		 
		 return;
	}
	
	return;
	}
	
	return;
	
	
	if(is_gold(color0)) {
	
		var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		 
		if(arrN[0].length == 8) {
			global_state = null;
			moves_counter_incr();
			if(is_gold(color0)) gold_counter_incr();
			call_non_salamandra(glob_x_left_top,glob_y_left_top);
			return;
		} 
	
		
	
	}
	
	if( is_white_xy(glob_x_left_top,glob_y_left_top) == false) 
	{
		var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		//if(arrN.length == 8) { //worker of year
		if(arrN[0].length == 8) {
			global_state = null;
			moves_counter_incr();
			if(is_gold(color0)) gold_counter_incr();
			call_non_salamandra(glob_x_left_top,glob_y_left_top);
			return;
		} else {
		
			var arrN = getSameColorNeighbors0( imgData2, color0, glob_x_left_top,glob_y_left_top, dx, dy );
			//if(arrN.length == 0) { // worker of year
			if(arrN[0].length == 0) {	
			
			
			var arrN = getSameColorNeighbors0( imgData2, [255,215,0,255], glob_x_left_top,glob_y_left_top, dx, dy );
			if(arrN[0].length == 0)
			{
			
				global_state = null;
				moves_counter_incr();
				if(is_gold(color0)) gold_counter_incr();
				call_non_salamandra(glob_x_left_top,glob_y_left_top);
				return;
			}
			else return;
			}
			else return;
		
		}
	}
	
		// // //если вокруг точки glob_x_left_top,glob_y_left_top все белые то надо проверить цвет точки под нами
		// // // если золотой собрать золото.
		// // // если не золотой собрать эту точку
		
		// // var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), glob_x_left_top,glob_y_left_top, dx, dy );
		// // if(arrN[0].length == 8) {
			
			// // if( is_gold_xy(glob_x_left_top,glob_y_left_top)) {
				// // //collect gold 
				// // //f_take_gold(glob_x_left_top,glob_y_left_top);
				// // //avtomatik_move_to();
				// // //alert("Collect gold not implemented yet");
				// // //f_whenRightClick_part2(glob_x_left_top,glob_y_left_top);
				// // //avtomatik_move_to();
				// // //return;
				
				// // var rnd = getRandomInt(0,8);
				// // glob_x_left_top=arrN[0][rnd][0];
				// // glob_y_left_top=arrN[0][rnd][1];
				
				// // //f_whenRightClick_part2(glob_x_left_top,glob_y_left_top);
				// // avtomatik_move_to();
				// // return;
			// // }		
			// // else {
				// // var rnd = getRandomInt(0,8);
				// // glob_x_left_top=arrN[0][rnd][0];
				// // glob_y_left_top=arrN[0][rnd][1];
				
				// // //f_whenRightClick_part2(glob_x_left_top,glob_y_left_top);
				// // avtomatik_move_to();
				// // return;
			// // }
		
		// // }	
		
		// // return;
	// // }		
	
	// // // var canvas2 = document.getElementById("canvas0");
	
	//move_to();
	return;
	
	// // var canvas2 = document.getElementById("canvas0");
	// // canvas2.width = canvas.width*n;
	// // canvas2.height = canvas.height*n;
	// // var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	var arr = dummy_fast(glob_x_left_top,glob_y_left_top);
	// //post_bubabu(arr[1],[0,0,255,255]);
	// //return;
	// // save_all_settings_on_server();
	// // samson();
	// //var arr1 = grey_in_neighbours(arr[1]);
	var arr2 =[];
	for(var i=0;i<arr[1].length;i++)
	{
		var x = arr[1][i][0];
		var y = arr[1][i][1];
		
		//if(tr_black(color0)) continue;
	// //	if(filter_include(x,y)==false) continue;
	// //	if(filter_exclude(x,y)==false) continue;
		// //if(is_white(color0)==true) continue;
		
		
		// // if(x<1)  continue;
		// // if(x>w-2) continue;
		// // if(y<1) continue;
		// // if(y>h-2)continue;
		
			
		if(x<0)  continue;
		if(x>w-1) continue;
		if(y<0) continue;
		if(y>h-1)continue;
		
		var arrN = getSameColorNeighbors0( imgData2, getWhiteSpaceColor(), x,y, dx, dy );
		for(var j=0;j<arrN[1].length;j++)
		{
			var x2 = arrN[1][j][0];
			var y2 = arrN[1][j][1];
			// if(is_gold_xy(x2,y2)==true) continue;
			arr2.push([x2,y2]);
		}
		 
		
		
		
	}
	
	
	
	
	
// // //	var arr1 = not_grey_in_neighbours(arr2);
	 
	if(arr2.length>0)
	{
		var ind = get_min_near_point(arr2,[glob_x_left_top,glob_y_left_top]);
		
		glob_x_left_top=arr2[ind][0];
		glob_y_left_top=arr2[ind][1];
		
		//	global_state = null;
		//	moves_counter_incr();
		//	if(is_gold(color0)) gold_counter_incr();
		//	call_non_salamandra(glob_x_left_top,glob_y_left_top);
			
		refresh_map();
		//avtomatik_move_to();
		return;
		// // // // save_for_gif();
	}
	// // // else{
		
		
		// // // var canvas2 = document.getElementById("canvas0");
		// // // var context2 = canvas2.getContext("2d");
		// // // var im0 = context2.getImageData(glob_x_left_top,glob_y_left_top,1,1);
		// // // var im = context2.getImageData(glob_x_left_top,glob_y_left_top,3,3);
		// // // var x = glob_x_left_top;
		// // // var y= glob_y_left_top;
		// // // var i=0;
		// // // var j=0;
		// // // var n=-1;
		// // // var found=false;
		// // // for(j=y-1;j<y+2;j++)
		// // // {
			// // // for(i=x-1;i<x+2;i++)
			// // // {
				
				// // // if( is_white_xy(i,j)) continue; 
				// // // if( tr_black_xy(i,j)) continue; 
				// // // // if(is_gold_xy(x,y)==true) continue;
		
				// // // found=true;
				// // // break;
			// // // }
			// // // if(found) break;
		// // // }
		// // // if(found==false) 
		// // // {
		// // // var arr = dummy_fast(x,y);
		// // // for(var i=0;i<arr[1].length;i++)
		// // // {
			// // // var x = arr[1][i][0];
			// // // var y = arr[1][i][1];
			// // // var rc = get_near_first_non_white_full(x,y);
			// // // if(rc.length==0) continue;
			// // // glob_x_left_top=rc[0];
			// // // glob_y_left_top=rc[1];
			// // // break;
		// // // }
		// // // //post_bubabu(arr[1],[0,0,255,255]);	
		// // // //samson();
		// // // //return;
		// // // }
		// // // else{
		// // // glob_x_left_top=i;
		// // // glob_y_left_top=j;
		// // // }
		
		// // var color0 =  context2.getImageData(glob_x_left_top,glob_y_left_top,1,1).data;
		// // // //if(only_one_color_center(context2, glob_x_left_top,glob_y_left_top,color0)) {
			
			// // global_state=null;
			
			// // moves_counter_incr();
			// // if(is_gold(color0)) gold_counter_incr();
			// // call_non_salamandra(glob_x_left_top,glob_y_left_top);
			// // // // return;
		// // // // }
		
		
		
		// // //refresh_map();
		
		// // // location.reload();
// // //	}
}

global_time_is_now=0;
function initCollectAllClusters()
{
	
	global_i=0;
	global_j=0;
	xfcolors=[];
	xfcolors_sizes=[];
	global_getArrayOfColorsSizesQuantity_Thread_callback = null;
	
}


	/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function whenWeWantToDoRefresh()
{
	// if(global_do_work==true) { global_time_is_now=0; return; }
	
	// setTimeout(()=>{
		// global_time_is_now += 1;
		// if(global_time_is_now>60) { global_time_is_now=0; document.location.reload(true); }
	// },20000);
}
function generatePackOfMMMColors()
{
	var mm=0;
	for(var i=0;i<xfcolors_sizes.length;i++)
	{
		var obj = xfcolors_sizes[i];
		var points = obj.points;
			
		for(var j=0;j<points.length;j++)
		{
			mm++;
		}
	}
	console.log('mm='+mm);
	//mm=mm/3|0+1;
	var st=30;
	var r = 0;
	var g = 0;
	var b = 0;
	var mmm_colors=[];
	for(var r=0;r<255;r+=st)
	{
		for(var g=0;g<255;g+=st)
		{
			for(var b=0;b<255;b+=st)
			{
				mmm_colors.push([r,g,b,255]);
				
			}
		}
	}
	//mm--;
	//if(mm==-1)  return mmm_colors;
	shuffle(mmm_colors);
	return mmm_colors;
	
	
	
}

function agni()
{
	setInterval(call_salamandra, 500);
}

 function free_creatures()
 {
	 mod_salamander_global_state=null;
	 mod_triton_global_state=null;
	global_state=null;
 }

function getMappedCanvas()
{
	global_table_of_clusters=[];
	
	var mmm_colors=generatePackOfMMMColors();
	var mmm=0;
	var canvas7 = document.getElementById("canvas7");
	var context7 = canvas7.getContext("2d");
	var im2 = context7.getImageData(0,0,canvas7.width,canvas7.height);	
	
	for(var i=0;i<xfcolors_sizes.length;i++)
	{
		var obj = xfcolors_sizes[i];
		var points = obj.points;
			
		for(var j=0;j<points.length;j++)
		{
			var x = points[j][0];
			var y = points[j][1];
			var arr = dummy_fast(x,y);
			
			var obj = {};
			obj.off=false;
			obj.color0=xfcolors_sizes[i].color;
			obj.color7=mmm_colors[mmm];
			obj.points=	[];		
			
			// var obj7 = {};
			// obj7.off=false;
			// obj7.color0=obj.color;
			// obj.color7=mmm_colors[mmm];
			// obj.points=	[];	
			
			for(var n=0;n<arr[0].length;n++)
			{
				
				if(mmm_colors[mmm]==undefined)mmm_colors[mmm]=[0,0,0,0];
				im2 = fillRectangleFast(im2, arr[0][n][0], arr[0][n][1], 1, 1, mmm_colors[mmm] );
				obj.points.push( [ arr[0][n][0], arr[0][n][1] ] );
			}
			
			for(var n=0;n<arr[1].length;n++)
			{
				
				if(mmm_colors[mmm]==undefined)mmm_colors[mmm]=[0,0,0,0];
				im2 = fillRectangleFast(im2, arr[1][n][0], arr[1][n][1], 1, 1, mmm_colors[mmm] );
				obj.points.push( [ arr[1][n][0], arr[1][n][1] ] );
				
			}
		
			global_table_of_clusters.push(obj);
			mmm++;
			if(mmm>=mmm_colors.length){
				console.log('mmm>=mmm_colors.length '+mmm);
			}
		}	
		
		//
	}
	context7.putImageData(im2,0,0);	
	return context7.getImageData(0,0,canvas7.width,canvas7.height);	
	
	
}	
	
function collectAllClusters(im)
{
	global_getArrayOfColorsSizesQuantity_Thread_callback = function(){
		
		var canvas2 = document.getElementById("canvas0");
		var context2 = canvas2.getContext("2d");
		context2.putImageData(im,0,0);	
		var canvas7 = document.getElementById("canvas7");
		canvas7.width = canvas2.width;
		canvas7.height = canvas2.height;
		var context7 = canvas7.getContext("2d");
		context7.putImageData(im,0,0);	
		var canvas7 = document.getElementById("canvas7");
		var context7 = canvas7.getContext("2d");
		context7.putImageData(getMappedCanvas(),0,0);	
		
		renderCanvas0();
	}

	setTimeout(getArrayOfColorsSizesQuantity_Thread,10);
}


function fillRectangleFast(imgData2, x, y, n, m, col )
{
	
	for(var j=y;j<y+m;j++)
	{
		for(var i=x;i<x+n;i++)
		{
			var idx2 = (imgData2.width * j + i ) << 2;
			imgData2.data[idx2]=col[0];
			imgData2.data[idx2+1]=col[1];
			imgData2.data[idx2+2]=col[2];
			imgData2.data[idx2+3]=col[3];
			
		}
	}
	
	return imgData2;
}


function getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}
function redrawPixels_main_right(context, x,y){
	alert();
}


function redrawPixels_main(context, x,y)
{
	var c2 = document.getElementById("pixels");
	c2.width = 150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = 150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
		}
	}
	
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}


function crop(x,y,flag)
{
	
	
	var sx,sy,w,h;
	var canvas =  document.getElementById("canvas0");
	
	if(flag == 1)
	{
		sx = x;
		sy = y;
		w = canvas.width - sx;
		h = canvas.height - sy;
	}
	else
	{
		sx = 0;
		sy = 0;
		w = x+1;
		h = y+1;
	}
	
	
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(sx, sy, w, h);
	
	///////
	//var buffer = imageData.data.buffer;  // ArrayBuffer
	//////
	
	canvas.width = w;
	canvas.height = h;
	canvas.getContext("2d").putImageData(imageData,0,0);
	
	/*********
	var imageData = context.createImageData(w, h);
	imageData.data.set(buffer);
	
	var params = [];
			
	params['x']= x;
	params['y']= y;
	params['flag']= flag;
	params['imgdata_base64']= dataurl;
			
	sendPostWithParametersOnServer( params ); 
	*********/
	
}


function sendPostWithParametersOnServer( action, params  )
{
	
				
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', action, true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
            var blob = xhr.response;
			getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas0" ); } );
			
	}

	xhr.send(params);
	
}

var glob_mpc_stones=[];
var glob_mpc_canvas=null;

function cloneStones(arr)
{
		glob_mpc_stones=[];
					for(var i=0; i<glob_all_generated_stones.length; i++)
					{
							 var xs=Number(''+glob_all_generated_stones[i].x);
							var ys=Number(''+glob_all_generated_stones[i].y);
							 	var color = cloneColor(glob_all_generated_stones[i].color);
								glob_mpc_stones.push({x:xs,y:ys,color:color});
							//var bgcolor = getColorArrayFromImageData(imgData, xs, ys);
							//glob_all_generated_stones[i].color
					}
					return glob_mpc_stones;
}

function prepare_clean_single_pixels(  callback )
{
	
	 get_array_of_all_generated_stones( function(){
		
		var params='md5='+glob_session_id;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', global_url_to_glab+'/blob_from_server', true);
		xhr.responseType='blob';
		xhr.onload = function() {  
			
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror) onerror(error); return; }
			
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr.response);
					
				newImg.onload = function() {	
					
					
					var canvas = document.createElement("canvas");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
					
					glob_mpc_canvas= document.getElementById("canvas0");;
				//	var canvas =
					glob_mpc_stones=cloneStones(glob_all_generated_stones);
					
					callback();
							 
				 }
				newImg.src=imageUrl;
					
			
				}
				xhr.send(params); 
			
		});
		
			
			
}


function clean_single_pixels(	callback	)
{

					var ctx = glob_mpc_canvas.getContext("2d");
					
					var imgData = ctx.getImageData(0,0,glob_mpc_canvas.width,glob_mpc_canvas.height);
					var canvas = document.createElement("canvas");
					canvas.width = glob_mpc_canvas.width;
					canvas.height = glob_mpc_canvas.height;
					var ctx2 = canvas.getContext("2d");
					ctx2.putImageData(imgData, 0, 0);
					document.body.appendChild(canvas);
					
					var canvas_c = document.getElementById("canvas0");
					var ctx_c = canvas_c.getContext("2d");
					var imgData_c = ctx_c.getImageData(0,0,canvas_c.width,canvas_c.height);
					for(var i=0; i<glob_mpc_stones.length; i++)
					{
							 var xs=glob_mpc_stones[i].x;
							var ys=glob_mpc_stones[i].y;
							 						
							var bgcolor = getColorArrayFromImageData(imgData_c, xs, ys);
							// //glob_all_generated_stones[i].color
							if( rt_compareColors(getWhiteSpaceColor(),bgcolor,0)==true )
							{
								
							}
							else
							{
								imgData=fillRectangleFast(imgData,xs,ys,1,1,getWhiteSpaceColor());
								ctx_c.putImageData(imgData,0,0);
							}
							
							glob_mpc_stones.splice(i,1);
							i= -1;
							
					}	 
							
					callback();		
}	
							
							
function server_crop(x,y,flag)
{
	
	var canvas =  document.getElementById("canvas0");

	var w = canvas.width;
	var h = canvas.height;
	var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag;		
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/precrop', true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
			
            transform("canvas0",'/crop');
			
	}

	xhr.send(params);
	
	
}

function load_first_from_canvases(){
	
	var moves = prompt("Enter number of moves","0")
	if(moves==null) return;
	moves=Number(moves);
	if((moves<0)||(moves>9999)) return;
	glob_moves_counter=(moves);
	moves_counter_refresh();
	var gold = prompt("Enter number of gold","0")
	if(gold==null) return;
	gold=Number(gold);
	if((gold<0)||(gold>9999)) return;
	glob_gold_counter=gold;
	gold_counter_refresh();
	
	var w = document.getElementById("canvas0").width;
	var h = document.getElementById("canvas0").height;
	
	var xy = prompt("Enter x,y coordinates for hero",""+glob_x_left_top+","+glob_y_left_top);
	if(xy==null) return;
	xy=xy.split(",");
	var x=Number(xy[0]);
	var y=Number(xy[1]);
	if(x<0) x=0;
	if(x>w-1) x=w-1;
	if(y<0) y=0;
	if(y>h-1) y=h-1;
	
	copyFromCanvasToCanvas("key_point_canvas_0","canvas0");
	send_to_server_changed_canvas( function(){	location.reload();})
	
}

function show_hide_key_point_canvases()
{
	var f=document.getElementById("key_point_canvases").hidden;
	if(f==true)
	document.getElementById("key_point_canvases").hidden=false;
else
	document.getElementById("key_point_canvases").hidden=true;
	
}

function show_hide_make_gif_div()
{
	var f=document.getElementById("gif_block_div_id").hidden;
	if(f==true)
	document.getElementById("gif_block_div_id").hidden=false;
else
	document.getElementById("gif_block_div_id").hidden=true;
}


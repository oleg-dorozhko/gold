//var global_url_to_glab='https://patterns-editor.herokuapp.com';
//var global_url_to_ws='wss://patterns-editor.herokuapp.com/';

var global_url_to_glab='http://localhost:5000';
var global_url_to_ws='ws://localhost:5000';

var glob_all_collected_stones=[];
var glob_all_generated_stones=[];
var glob_session_id=null;
var glob_pattern_id=null;
var glob_player_settings_id=null;
var glob_little_belly_pressed=false;
var glob_x_left_top_last=0;
var glob_y_left_top_last=0;
function pattern2canvas( session_id )
{
	glob_session_id = session_id;
	
	getChaosedLabirint(  function() { 
	
    	get_url_to_ws( function() { init_websocket()
		
			setInterval(whenWeWantToDoRefresh,5000);
		
		})
	});
	
}

function get_session_id(callback)
{
	var params='md5=new';
	var xhr = new XMLHttpRequest();
	xhr.open('POST', global_url_to_glab+'/get_labirint_id', true);
	xhr.onload = function(e) {  

		if (xhr.readyState != 4) return;
	
		if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
		

		callback(xhr.responseText);
		
		
	}

	xhr.send(params);
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
					
					
					var canvas = document.getElementById("canvas0");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					
					callback();
			
				}
				newImg.src=imageUrl;
			
		}
		xhr.send(params);
			
			
}

function send_to_server_changed_canvas( callback )
{
		
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

				if (xhr2.status != 200) {  var error = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; if(onerror) onerror(error); return; }
				
				
				//is_server_buzzy(function(){
					callback();
				//	});
				
				
				
			}
			xhr2.send(params);
			
		}
		xhr.send(buf);
		
	
	
			
}


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
			
			// _ctrlz();
			document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
			
			
			var el = document.getElementById('btn_pixels_clean');
			el.style.border = "";
			el.style.visibility='hidden';
			el.style.display="none";
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			global_do_work=false;
		
	} 
	
	

 
		var params='md5='+glob_session_id;
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
							
							    glob_x_left_top_last=glob_x_left_top;
							    glob_y_left_top_last=glob_y_left_top;
								glob_x_left_top += n;
								glob_y_left_top += m;
															
							// if(is_little_belly(x,y))
							// {
								// glob_little_belly_pressed=true;
								
							// }
							
						
															
								if(click_on_white(glob_x_left_top,glob_y_left_top))
								{
									doLeftClickOnPixelCanvas(x,y);
								}
								else
								{
									
									if(click_near_last_xy())
									{
										doLeftClick( glob_x_left_top, glob_y_left_top, function() {
													
												send_to_server_changed_canvas( function()  {
																		
													
														document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
														
														
														var el = document.getElementById('btn_pixels_clean');
														el.style.border = "";
														el.style.visibility='hidden';
														//el.style.display="none";
														document.getElementById("scale_div").style.visibility = 'hidden'; //visible
														//document.getElementById("scale_div").style.display = 'none'; //visible
														global_do_work=false;
			
														
														
														
														
														setTimeout(	processing_click, 100);
														
												});
										});
									}
							
								}
								
								

							
							}
							xhr.send(params);
							
							
						
					
					}
								
					


	var pcnv = document.getElementById("pixels");
					pcnv.oncontextmenu = function(e)
					{
						e.preventDefault();
							 e = (e) ? e : event;   
						//if(e.button == 2) return; */
								
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
								
								// var id = getIDFirstCollectedSelected();
								// if(id!=null)
								// {
									// pixelsPro_whenClickedOnCollected(document.getElementById(id),glob_x_left_top,glob_y_left_top);
								// }
								
								// else 
									
									pixelsPro_whenRightClickedOnLabirint(glob_x_left_top,glob_y_left_top);
								
								
								
							}

							xhr.send(params);
							
							
							
					
					}
					
					



					
					addStone(1, function()	{  getChaosedLabirint( function() { } ) } );
								
					
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);		
			
		}
		
		xhr.send(params);
		
	
	

}



function click_near_last_xy()
{
	if((glob_x_left_top==glob_x_left_top_last)&&(glob_y_left_top==glob_y_left_top_last))
		return false;
	if(	(Math.abs(glob_x_left_top-glob_x_left_top_last)<=1) && (Math.abs(glob_y_left_top-glob_y_left_top_last)<=1) )
		return true;
	
	return false;
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
							
							
// function getPassColor()
// {
		// var xhr = new XMLHttpRequest();
		// xhr.open('GET', global_url_to_glab+'/get_color_for_pass', true);
		// xhr.onload = function() {  
			
			// if (xhr.readyState != 4) return;

			// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); return; }
			
			// if(document.getElementById("pcolor")) document.getElementById("pixels_buttons").removeChild(document.getElementById("pcolor"));
					// var arr=null;
					// if(xhr.responseText==',,,') arr=[255,255,255,255];
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
				
					var grey_color = [255,255,255,255];
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
	
	get_neighbours(x,y);
			
	
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
			
							 getChaosedLabirint( function()
				 {
										
					
				
				// var xhr = new XMLHttpRequest();
				// xhr.open('GET', global_url_to_glab+'/get_collected', true);
				// xhr.onload = function(e) {  
			
					// if (xhr.readyState != 4) return;
				
					// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; onerror(error); throw new Error(error);  }
					
					// document.getElementById('collected_div').innerHTML = xhr.responseText;
					// var lst = document.getElementById('collected_div').childNodes;
					// for(var i=0;i<lst.length;i++)
					// {
						// lst[i].onclick = selectCollected;
					// }
					// // if(lst[0])selectCollectedOn(lst[0]);
					
					
					// if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
					// {
						// glob_all_collected_stones.push(color);
					// }
					
				// }
				// xhr.send();
				
								if(glob_little_belly_pressed)
								{
									glob_little_belly_pressed=false;
									btn_pixels_clean();
								
								}
										
										
								});
			
			
			
			
		}
		xhr4.send(params);		
				
				glob_x_left_top=x;
				glob_y_left_top=y;
				
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

function pixelsPro_whenRightClickedOnLabirint(x,y)
{
	
	var canvas = document.getElementById("pixels");
	var ctx = canvas.getContext("2d");
	var imgData0=ctx.getImageData(0,0,canvas.width,canvas.height);
	var color =  getColorArrayFromImageData(imgData0, x, y)
	
	// if(is_stone(color)&&(is_stone_was_collected(color)==false))
		
	// {
		// window.open("http://s954447o.bget.ru/labirint");//location='http://s954447o.bget.ru/labirint/';
	// }
	
	
	
	var params = 'md5='+glob_session_id+'&x='+x+'&y='+y;	
	var el = document.getElementById("collected_div").childNodes[0];
	if(el)
	{
		//if( el.classList.contains('collected_selected')==true )
		{
			params += '&color='+el.getAttribute('attr_color');
		}
	}
	
	// 
	
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
										
					
			get_collected_stones_from_server_and_show();
				
								
										
										
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
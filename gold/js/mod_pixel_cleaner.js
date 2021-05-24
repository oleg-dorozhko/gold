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
							if( rt_compareColors([255,255,255,255],bgcolor,0)==true )
							{
								
							}
							else
							{
								imgData=fillRectangleFast(imgData,xs,ys,1,1,[255,255,255,255]);
								ctx_c.putImageData(imgData,0,0);
							}
							
							glob_mpc_stones.splice(i,1);
							i= -1;
							
					}	 
							
					callback();		
}	
							
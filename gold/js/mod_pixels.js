//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_x_left_top = null;
var glob_y_left_top = null;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

//var glob_param_10=10;
//var glob_param_7=7;
//var glob_param_width_150=150;
//var glob_param_height_150=150;

//150/10=15 7,8
//305/5=61 30,31

var glob_param_10=5;
var glob_param_7=30;
var glob_param_width_150=300;
var glob_param_height_150=300;



function whenMovedClickedOnCanvas(e)
{
	if(e)
	{		
		evt = (e) ? e : event;   
		if(evt.button == 2) 
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
	else
	{
		var x = document.getElementById("canvas0").width/2|0;
			var y =  document.getElementById("canvas0").height/2|0;
			
			glob_x_left_top = x;
			glob_y_left_top = y;
							
			var context = document.getElementById("canvas0").getContext("2d");
			var imageData = context.getImageData(x,y,1,1);
				
			global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
			
			showScaleDiv(document.getElementById("canvas0"),x,y);
			redrawPixels_main(context, x,y);
	}
			
}	
	

function other_function_whenMovedClickedOnCanvas(arr)
{
	
		var x = arr[0]
			var y = arr[1];
			
			glob_x_left_top = x;
			glob_y_left_top = y;
							
			var context = document.getElementById("canvas0").getContext("2d");
			var imageData = context.getImageData(x,y,1,1);
				
			global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
			
			showScaleDiv(document.getElementById("canvas0"),x,y);
			redrawPixels_main(context, x,y);
	
			
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
					var n = (x/glob_param_10|0)-glob_param_7;
					var m = (y/glob_param_10|0)-glob_param_7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas0").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/glob_param_10|0)-glob_param_7;
					var m = (y/glob_param_10|0)-glob_param_7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
}		
		
function showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";document.getElementById('canvas_width_height').style.display="none";
	document.getElementById('canvas_width_height').innerHTML = ":: "+document.getElementById('canvas0').width+" x "+document.getElementById('canvas0').height;
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').style.display="none";
	document.getElementById('selected_x_y').innerHTML = " :: "+x+", "+y+" ::";
	
}



function setEventListenersOnTri_Btns()
{
		var btn = document.getElementById("btn_lt");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,1);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		}
		
		btn = document.getElementById("btn_rb");
		btn.onclick = function()
		{
			
			server_crop(glob_x_left_top,glob_y_left_top,2);
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			
		}
		
		var btn = document.getElementById("btn_esc");
		btn.onclick = function()
		{
			//document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden'; //visible
		
		}
		
		
		var btn = document.getElementById("btn_pixels_close");
		btn.onclick = function()
		{

			document.getElementById("scale_div").style.border = '';
			document.getElementById("scale_div").style.visibility = 'hidden';
			document.getElementById("scale_div").style.display = 'none';
		}
		
		var btn = document.getElementById("btn_pixels_select");
		btn.onclick = function()
		{
		
			var obj_e = {};
			
			obj_e.offsetX=glob_x_left_top;
			obj_e.offsetY=glob_y_left_top;
			obj_e.preventDefault=function(){};
			whenUserClickOnCanvas(obj_e);
			
			//document.getElementById("scale_div").style.border = '';
			//document.getElementById("scale_div").style.visibility = 'hidden';
			//document.getElementById("scale_div").style.display = 'none';
		}
		
		

}

function pixels_getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function pixels_fillRectangleFast(imgData2, x, y, n, m, col )
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

function redrawPixels_main(context, x,y) // --> old__redrawPixels_main(context, x,y) 
{
	if(context==null) context = document.getElementById("canvas0").getContext("2d");
	var imgData0 = context.getImageData(0,0,document.getElementById("canvas0").width,document.getElementById("canvas0").height);
	
	var c2 = document.getElementById("pixels");
	c2.width = glob_param_width_150;//150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = glob_param_height_150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	var imgData2 = ctx.getImageData(0,0,c2.width,c2.height);
	
	for(var i=-glob_param_7;i<	glob_param_7+1;i++)
	{
		for(var j=-glob_param_7;j<	glob_param_7+1;j++)
		{
			
			var imageData = pixels_getColorArrayFromImageData(imgData0, x+i, y+j);
			if(x+i<0) imageData='[255,255,255,255]';
			else if(x+i>=imgData0.width) imageData='[255,255,255,255]';
			else if(y+j<0) imageData='[255,255,255,255]';
			else if(y+j>=imgData0.height) imageData='[255,255,255,255]';
			//var imageData = context.getImageData(x+i,y+j,1,1);
			
			else if(i==0 && j==0) imageData = [255,0,0,255];
				
			imgData2 = pixels_fillRectangleFast(
				imgData2, ((i-1)+glob_param_7)*glob_param_10, ((j-1)+glob_param_7)*glob_param_10, glob_param_10, glob_param_10, imageData 
			);
	
			
			
			//ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			//if(i==0 && j==0) ctx.fillStyle = "red";
			
			//ctx.fillRect((i+glob_param_7)*glob_param_10, (j+glob_param_7)*glob_param_10, glob_param_10, glob_param_10);
			
			
		}
	}
	
	ctx.putImageData(imgData2,0,0);
	
	
	
	//for(var i=-7;i<	8;i++)
	//{
	//	for(var j=-7;j<	8;j++)
	//	{
			
			
	//		var imageData = context.getImageData(x+i,y+j,1,1);
			
	//		ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
	//		if(i==0 && j==0) ctx.fillStyle = "red";
	//		ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
	//	}
	//}
	glob_x_left_top=x;
	glob_y_left_top=y;
	document.getElementById('selected_x_y').innerHTML = " :: "+x+", "+y+" ::";;
	
}



function old__redrawPixels_main(context, x,y) // --> redrawPixels_main(context, x,y)
{
	if(context==null) context = document.getElementById("canvas0").getContext("2d");
	var c2 = document.getElementById("pixels");
	c2.width = glob_param_width_150;//150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = glob_param_height_150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	
	for(var i=-glob_param_7;i<	glob_param_7+1;i++)
	{
		for(var j=-glob_param_7;j<	glob_param_7+1;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+glob_param_7)*glob_param_10, (j+glob_param_7)*glob_param_10, glob_param_10, glob_param_10);
			
			
		}
	}
	
	
	
	
	//for(var i=-7;i<	8;i++)
	//{
	//	for(var j=-7;j<	8;j++)
	//	{
			
			
	//		var imageData = context.getImageData(x+i,y+j,1,1);
			
	//		ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
	//		if(i==0 && j==0) ctx.fillStyle = "red";
	//		ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
	//	}
	//}
	
	document.getElementById('selected_x_y').innerHTML = " :: "+x+", "+y+" ::";;
	
}


function crop(x,y,flag)
{
	return;
	
	var sx,sy,w,h;
	var canvas =  document.getElementById("canvas");
	
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
	
	return;
	
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
			getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas" ); } );
			
	}

	xhr.send(params);
	
}


function server_crop(x,y,flag)
{
	return;
	
	var canvas =  document.getElementById("canvas");

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
			
            transform("canvas",'/crop');
			
	}

	xhr.send(params);
	
	
}


var global_do_work=false;
var global_cliked_points_array=[];
var global_bgcolor=[255,255,255,255];
var global_counter=0;
var MAX_CHARGE=10;
function processing_click()
{
	if(global_do_work==true) return;
	// if(global_do_work==true) { 
		
		// global_counter++; 
		
		// if( global_counter>3)  {		global_do_work=false;	}
	
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
											if(click_on_white(x,y)==false)	sound();
											
										}
										
										doLeftClick(x,y,function() {
											
													send_to_server_changed_canvas( function(){
																
																global_do_work=false;
																setTimeout(	processing_click, 100);
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

function update_main_image()
{
		if(global_do_work==true) return;
	get_last_version_of_pattern( function() {  	} );
}

function doLeftClick(x,y,callback)
{
	 
	 //if(global_do_work==true) { callback(); return };
	
	global_do_work=true;
	 

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

							
							
					dummy_fast_thread (   function()   {
							
							var canvas7 = document.getElementById("canvas0");
							var context7 = canvas7.getContext("2d");
							
							context7.putImageData(imgData7,0,0);
							global_dummy_fast_thread_border_cluster.push([x,y]);
							post_bubabu(global_dummy_fast_thread_border_cluster,[255,255,255,255]); 

							global_do_work=false;
						
							callback();
										
										
					} );
		
		
		
}

function click_on_white(x,y)
{
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = getColorArrayFromImageData(imgData7, x, y);
	var f=false;
	
	{
		if( rt_compareColors(bgcolor,[255,255,255,255],0)==true )
		{ f=true;}
	}
	return f;
}

function ctrlz(e)
{
	//e.preventDefault();
	return;
	
		if(global_do_work==true) return;
	
		global_do_work=true;
			var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= getColorArrayFromImageData(imgData0, x, y);
		var bgcolor = [255,255,255,255];
		
		
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

function whenBrakabakaEventOccurs(e)
{
		e.preventDefault();
		
		// if(isExistAnyNotRemovedClusters()==false)
		// {
			// //do_server_query();
			// location.reload();
		// }
		
	if(global_cliked_points_array.length>MAX_CHARGE) return;
	
		//get x y
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		
		var canvas0 = document.getElementById("canvas0");
		var context0 = canvas0.getContext("2d");
		
		var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
		var _color= getColorArrayFromImageData(imgData0, x, y);
		var bgcolor = global_bgcolor;
		
		if( (bgcolor[0]==_color[0]) && (bgcolor[1]==_color[1]) && (bgcolor[2]==_color[2]) && (bgcolor[3]==_color[3]) ) 
		{
			/***/
			if((global_cliked_points_array.length==0)&&(global_do_work==false))
			{
				global_do_work=true;
				//repeat();
				labirint(x,y);
				
				return;
			}
			/***/
			
			return;
		}
		
		
		
		document.getElementById("canvas0").oncontextmenu = ctrlz;
		
		
		
		
		
		
		
		
		global_cliked_points_array.push([x,y]);
			
			
			
			
	var canvas1 = document.createElement("canvas");
	canvas1.width=32;
	canvas1.height=32;
	var context1 = canvas1.getContext("2d");
	var imgData1 = context1.getImageData(0,0,canvas1.width,canvas1.height);
	
	
	
	
	
	imgData1=fillRectangleFast(imgData1,0,0,32,32,_color);
	context1.putImageData(imgData1,0,0);
	
	
	
	
	
	canvas1.id='move_'+x+'_'+y;
	
	canvas1.onclick = processing_click;
	//canvas1.oncontextmenu = ctrlz;
	document.getElementById("moves").appendChild(canvas1);
	
		
	processing_click();

}

window.onload = function()
{
	initModPixels();
	var CLIPBOARD = new CLIPBOARD_CLASS("canvas0", true);
	document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
	document.getElementById("canvas0").oncontextmenu = ctrlz;
	
	get_session_id( pattern2canvas );
	

 }

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




function sound()
{

	var audio = new Audio(); // Создаём новый элемент Audio
	
	audio.src = 'audio/141283__alienxxx__bubblewrap-005.wav'; // Указываем путь к звуку "клика"
	
	audio.autoplay = true; // Автоматически запускаем
	
	setTimeout(function(){audio.pause(); audio=null;},1000);
	
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

var global_cell_size = 1;
var global_table_of_clusters = [];
var global_table_of_clusters7 = [];
var global_game_delay = 2000;

function whenPastingFinished(img)
{
	global_table_of_clusters =[];
	global_table_of_clusters7 = [];
	
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
	
	initCollectAllClusters();
	//collectAllClusters(imgData2);
	
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
	if(global_do_work==true) { global_time_is_now=0; return; }
	
	setTimeout(()=>{
		global_time_is_now += 1;
		if(global_time_is_now>60) { global_time_is_now=0; document.location.reload(true); }
	},20000);
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



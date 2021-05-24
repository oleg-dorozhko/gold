function getPointIndex(points, point)
{
	for(var i=0;i<points.length;i++)
	{
		if((points[i][0]==point[0])&&(points[i][1]==point[1])) {
				return i;
			}
	}
	return null;
}

function getPointIndexInArrayOfObjects(points, point)
{
	for(var i=0;i<points.length;i++)
	{
		if((points[i].x==point[0])&&(points[i].y==point[1])) {
				return i;
			}
	}
	return null;
}

function compareColors(color,color2)
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


function getSameColorNeighborsPro( global_snake_image_data, color, x, y, dx, dy )
{
		
	var arr2=[];
	var arr=[];
		
	var arr0=null;							
	if((x>0) && (y>0) )
	{
			arr0=[x-dx,y-dy];
			var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], color2]);
	}
	
	if((y>0) && (x<global_snake_image_data.width))
	{		
		arr0=[x,y-dy];
		var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
		
		if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
	}	
	
	
	
	if((y>0) && (x<global_snake_image_data.width-dx))
	{
	 arr0=[x+dx,y-dy];
	var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
	}
		
	if(	(x>0) && (y<global_snake_image_data.height))
	{
		arr0=[x-dx,y];
		var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						} else arr2.push([arr0[0], arr0[1], color2]);
	}						
		
	if(	(x<global_snake_image_data.width-dx) && (y<global_snake_image_data.height))
	{
		arr0=[x+dx,y];
		var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
				if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
	}					
	
	if(	(x>0) && (y<global_snake_image_data.height-dy))
	{
	arr0=[x-dx,y+dy];
	var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
	}
	
	if(	(x<global_snake_image_data.width) && (y<global_snake_image_data.height-dy))
	{		
	arr0=[x,y+dy];
	var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
						
	}

	if(	(x<global_snake_image_data.width-dx) && (y<global_snake_image_data.height-dy))
	{
	arr0=[x+dx,y+dy];
	var color2 = getColorArrayFromImageData( global_snake_image_data, arr0[0], arr0[1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							arr.push([arr0[0], arr0[1]]);
						}	else arr2.push([arr0[0], arr0[1], color2]);
	}

	
	
	return [arr,arr2];
	
}



var global_in_cluster = null;
var global_border_cluster = null;

//we can faster
function dummy_pixells(x,y)
{
	var arr2_in = [];
	
	
	var canvas2 = document.getElementById("pixels");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	global_snake_image_data = imgData2;
	
	var color = getColorArrayFromImageData(imgData2, x, y);
	
	global_cell_size = 1;//Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	global_in_cluster = [{x:x,y:y,counter:0}];
	global_border_cluster = [];
	
	var exit=false;
	var nn=0;
	var repeat = false;
	
	while(true)
	{
		for(var n=0;n<global_in_cluster.length;n++)
		{
			
			var obj = global_in_cluster[n];
			if(obj.counter==1) continue;
			
			
			
			//global_snake_image_data = fillRectangleFast(global_snake_image_data, obj.x, obj.y, dx, dy, color );
			
			//context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
			
			/*
			context2.fillStyle='black';
			context2.fillRect(obj.x, obj.y,global_cell_size, global_cell_size);
			
			global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);
			*/
	
		
			
			var arr = getSameColorNeighborsPro( global_snake_image_data, color, obj.x, obj.y, dx, dy );
			
			
			
			var found=0;
			for(var i=0;i<arr[0].length;i++)
			{
				
				var ind = getPointIndexInArrayOfObjects(global_in_cluster, arr[0][i]);
				if(ind==null)
				{
					var obj2={};
					obj2.x=arr[0][i][0];
					obj2.y=arr[0][i][1];
					obj2.counter=0;
					global_in_cluster.push(obj2);
					
				}

			}
			
			var m = 1;
			if(arr[1].length==0) m=2;
			
			arr2_in.push( [ obj.x, obj.y, m ] );
			
			obj.counter=1;
			
			
			global_in_cluster[n]=obj;
			
			
		}
		
		repeat = false;
		for(var i=0;i<global_in_cluster.length;i++)
		{
			if(global_in_cluster[i].counter==0)
			{
				repeat=true;
				break;
			}
		}
		
		if(repeat==true) continue;
		
		break;

	}	

	global_in_cluster=[];
	global_border_cluster=[];
	
	for(var i=0;i<arr2_in.length;i++)
	{
		if(arr2_in[i][2]==1)
		{
			global_in_cluster.push([arr2_in[i][0],arr2_in[i][1]]);
		}
		else
		{
			global_border_cluster.push([arr2_in[i][0],arr2_in[i][1]]);
		}
		

	}
	
	return [ global_in_cluster, global_border_cluster ];
	
	
	
	
}

function launch_robot()
{
	// if(document.getElementById("robot_work").checked)
	// {
		// document.getElementById("robot_work_label").innerHTML="Robot, STOP!";
	// glob_robot_interval_ID = setInterval( 	mod_salamander_pro_processing_avto_click, glob_thinking_time_delay);
	// }
	// else {
		// document.getElementById("robot_work_label").innerHTML="Robot, TRY!";
	// if(glob_robot_interval_ID) clearInterval(glob_robot_interval_ID);
	// }
}

var global_in_cluster = null;
var global_border_cluster = null;

//we can faster
function dummy(x,y)
{
	var arr2_in = [];
	
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	global_snake_image_data = imgData2;
	
	var color = getColorArrayFromImageData(imgData2, x, y);
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	global_in_cluster = [{x:x,y:y,counter:0}];
	global_border_cluster = [];
	
	var exit=false;
	var nn=0;
	var repeat = false;
	
	while(true)
	{
		for(var n=0;n<global_in_cluster.length;n++)
		{
			
			var obj = global_in_cluster[n];
			if(obj.counter==1) continue;
			
			
			
			//global_snake_image_data = fillRectangleFast(global_snake_image_data, obj.x, obj.y, dx, dy, color );
			
			//context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
			
			/*
			context2.fillStyle='black';
			context2.fillRect(obj.x, obj.y,global_cell_size, global_cell_size);
			
			global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);
			*/
	
		
			
			var arr = getSameColorNeighborsPro( global_snake_image_data, color, obj.x, obj.y, dx, dy );
			
			
			
			var found=0;
			for(var i=0;i<arr[0].length;i++)
			{
				
				var ind = getPointIndexInArrayOfObjects(global_in_cluster, arr[0][i]);
				if(ind==null)
				{
					var obj2={};
					obj2.x=arr[0][i][0];
					obj2.y=arr[0][i][1];
					obj2.counter=0;
					global_in_cluster.push(obj2);
					
				}

			}
			
			var m = 1;
			if(arr[1].length==0) m=2;
			
			arr2_in.push( [ obj.x, obj.y, m ] );
			
			obj.counter=1;
			
			
			global_in_cluster[n]=obj;
			
			
		}
		
		repeat = false;
		for(var i=0;i<global_in_cluster.length;i++)
		{
			if(global_in_cluster[i].counter==0)
			{
				repeat=true;
				break;
			}
		}
		
		if(repeat==true) continue;
		
		break;

	}	

	global_in_cluster=[];
	global_border_cluster=[];
	
	for(var i=0;i<arr2_in.length;i++)
	{
		if(arr2_in[i][2]==1)
		{
			global_in_cluster.push([arr2_in[i][0],arr2_in[i][1]]);
		}
		else
		{
			global_border_cluster.push([arr2_in[i][0],arr2_in[i][1]]);
		}
		

	}
	
	return [ global_in_cluster, global_border_cluster ];
	
	
	
	
}


function dummy_fast(x,y) //old old_dummy_fast(x,y)
{
	var arr2_all = [[x,y,1]];

	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
	
	var color = getColorArrayFromImageData(imgData2, x, y);
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	var arr = getSameColorNeighbors0( imgData2, color, x, y, dx, dy );
			
	if(arr[0].length==0) return [[],arr[1]];
	
	var removed_x_y_obj = {};
	
	var global_in_cluster = [];
	var global_border_cluster = [];
	
	var arr4_all=[];
	
	// var n=0;
	
		while(true)
		{
			
			var x = arr2_all[0][0];
			var y = arr2_all[0][1];
			
			
			var key = ''+x+'_'+y;
			
			if( removed_x_y_obj [ key ] == undefined )
			{
				
				
				//context2.fillStyle = 'white'; 
				//context2.fillRect( x,y, dx, dy );
				
				var arr = getSameColorNeighbors0( imgData2, color, x, y, dx, dy );
				for(var i=0;i<arr[0].length;i++) 
				{
					
					var x1 = arr[0][i][0];
					var y1 = arr[0][i][1];
					
					arr2_all.push([x1,y1]);
				}
				
				removed_x_y_obj [ key ] = true;
				
				if(arr[0].length==8)
					global_in_cluster.push([x,y]);
				else 
					global_border_cluster.push([x,y]);
			}
			
			
			arr2_all.splice(0,1);
			
			
			if(arr2_all.length==0) break;
		
		}
		
	
	
      return [global_in_cluster,global_border_cluster];
	
	
}

function dummy_fast_pro(x,y) 
{
	var arr2_all = [[x,y,1]];

	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
	
	var color = getColorArrayFromImageData(imgData2, x, y);
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	var arr = getSameColorNeighbors0( imgData2, color, x, y, dx, dy );
			
	if(arr[0].length==0) return [[],[]];
	
	var removed_x_y_obj = {};
	
	var global_in_cluster = [];
	var global_border_cluster = [];
	var global_out_cluster = [];
	
	var arr4_all=[];
	
	// var n=0;
	
		while(true)
		{
			
			var x = arr2_all[0][0];
			var y = arr2_all[0][1];
			
			
			var key = ''+x+'_'+y;
			
			if( removed_x_y_obj [ key ] == undefined )
			{
				
				
				//context2.fillStyle = 'white'; 
				//context2.fillRect( x,y, dx, dy );
				
				var arr = getSameColorNeighbors0( imgData2, color, x, y, dx, dy );
				for(var i=0;i<arr[0].length;i++) 
				{
					
					var x1 = arr[0][i][0];
					var y1 = arr[0][i][1];
					
					arr2_all.push([x1,y1]);
				}
				
				removed_x_y_obj [ key ] = true;
				
				if(arr[0].length==8)
					global_in_cluster.push([x,y]);
				else //if(arr[1].length==8)
				{
					for(var i=0;i<arr[1].length;i++) 
					{
						if(getPointIndex(global_out_cluster,arr[1][i])==null) global_out_cluster.push(arr[1][i]);
					}
					
					global_border_cluster.push([x,y]);
				}
				//else 
					
			}
			
			
			arr2_all.splice(0,1);
			
			
			if(arr2_all.length==0) break;
		
		}
		
	
	
      return [global_in_cluster,global_border_cluster,global_out_cluster];
	
	
}

function getAllMiddleOfColorOfPoint(x,y)
{
	
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
		
	
	var color = getColorArrayFromImageData(imgData2, x, y);
	
	global_cell_size = Number(document.getElementById("cell_size").value);
	
	var dx = global_cell_size;
	var dy = dx;
	
	var processed_x_y_obj = {};
	
	var arr2_all = [[x,y]];
	global_in_cluster=[];
	while(true)
	{
			
			
			var x = arr2_all[0][0];
			var y = arr2_all[0][1];
			var key = ''+x+'_'+y;
			
			if( processed_x_y_obj [ key ] == undefined )
			{
				
	
				var arr =  getSameColorNeighbors0(imgData2, color, x, y,dx,dy)//( imgData2, color, x, y, dx, dy );
			//	context2.fillStyle = 'white'; //'rgba('+(255-color[0])+','+(255-color[1])+','+(255-color[2])+',1)'; 
			
			// context2.fillRect( x,y, dx, dy );
			
				
				if((arr[0].length>0 ) && (arr[1].length==0))
							
				{
				
					
					
					for(var i=0;i<arr[0].length;i++)
					{
						var x1 = arr[0][i][0];
						var y1 = arr[0][i][1];
						var key1 = ''+x1+'_'+y1;
						
						if( processed_x_y_obj [ key1 ] == undefined )     arr2_all.push([x1,y1]);
						
						
					}
		
					global_in_cluster.push([x,y]);
					
				}		
				
				
				
				
	
			}
			
			processed_x_y_obj [ key ] = true;
				
			arr2_all.splice(0,1);
			
			
			if(arr2_all.length==0) break;
		
	
	}
			
	return global_in_cluster;
	
	
}

/*
function compareColors(imgData0,x,y,color)
{
	if(x<0) return false;
	if(x>=imgData0.width) return false;
	if(y<0) return false;
	if(y>=imgData0.height) return false;
	var arr = getColorArrayFromImageData(imgData0, x, y);
	//console.log("x=");
	//console.log(arr);
	if( (arr[0]==color[0]) && (arr[1]==color[1]) && (arr[2]==color[2]) && (arr[3]==color[3]) ) return true;
	
	for(var i=0;i<global_z80.length;i++)
	{
		if( (arr[0]==global_z80[i][0]) && (arr[1]==global_z80[i][1]) && (arr[2]==global_z80[i][2]) && (arr[3]==global_z80[i][3]) ) {
			return false;
		}
	}
	global_z80.push(arr);
	return false;
	
}
*/

function inPointsPush(points, arr)
{
	for(var i=0;i<points.length;i++)
	{
		if( (arr[0]==points[i][0]) && (arr[1]==points[i][1]) ) {
			return points;
		}
	}
	points.push(arr);
	
	return points;
}

function existNeedColorNearPro( imgData0, n, need_color_arr, i, j, points )
{
	
	
	//var n = Number( document.getElementById("cell_size").value);

	var dh=n;
	var dw=n;
	
	
	
	var x = i-dw;
	var y = j-dh;
	if(compareColors(imgData0,x,y,need_color_arr))   points = inPointsPush(points, ([i-dw,j-dh]));
	
	var x = i;
	var y = j-dh;
	if(compareColors(imgData0,x,y,need_color_arr))  points = inPointsPush(points, ([i,j-dh]));
	
	
	x=i+dw;
	y=j-dh;
	if(compareColors(imgData0,x,y,need_color_arr))  points = inPointsPush(points, ([i+dw,j-dh]));
	
	
	x=i+dw;
	y=j;
	
	if(compareColors(imgData0,x,y,need_color_arr))  points = inPointsPush(points,([i+dw,j]));
	
	
	
	x=i+dw;
	y=j+dh;
	if(compareColors(imgData0,x,y,need_color_arr))  points = inPointsPush(points,([i+dw,j+dh]));
	
	
	x=i;
	y=j+dh;
	//imgData = getStrColorFromRGBAArray( context.getImageData(i,j+dh,1,1).data );
	if(compareColors(imgData0,x,y,need_color_arr))   points = inPointsPush(points,([i,j+dh]));
	
	x=i-dw;
	y=j+dh;
	//imgData = getStrColorFromRGBAArray( context.getImageData(i-dw,j+dh,1,1).data );
	if(compareColors(imgData0,x,y,need_color_arr))   points = inPointsPush(points,([i-dw,j+dh]));
	
	x=i-dw;
	y=j;
	
	if(compareColors(imgData0,x,y,need_color_arr))    points = inPointsPush(points,([i-dw,j]));
	
	return points;
	
}
	

function snake_pro( global_snake_image_data, need_color, x, y )
{
	
	var points = existNeedColorNearPro( global_snake_image_data, global_cell_size, need_color, x, y, [] );
	
	while(true)
	{
		
		
		for( var i=0;i<points.length; i++)
		{
			
				var x1 = points[i][0];
				
				var y1 = points[i][1];
				
				points = existNeedColorNearPro( global_snake_image_data, global_cell_size, need_color, x1, y1, points );
				
				global_snake_image_data = fillRectangleFast( global_snake_image_data, x1, y1, global_cell_size, global_cell_size, global_snake_fill_color );
				//return global_snake_image_data;
				points.splice(i,1);
				
				
		
		
		
		}
		
		if ( points.length == 0 ) break;
		
	
	}
	
	return global_snake_image_data;
	
}


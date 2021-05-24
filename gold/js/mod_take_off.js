
function whenInCleanModeClicked(e)
{
	global_cell_size = Number( document.getElementById("cell_size").value );
			
	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;
	
	
		
	var xy = dummy(x,y,global_cell_size);	
	
	x=xy[0];
	y=xy[1];
		
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
		
	global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);

	var base_color = getColorArrayFromImageData(global_snake_image_data, x, y );
	
	bububu(x,y,global_cell_size,global_cell_size);
	return;
	
	var colors = [];
	var acolors = [];
	var dy = global_cell_size;
	var dx = global_cell_size;
	var ppx=x;
	var ppy=y;
	var px=0;
	var py=0;
	var counter=0;
	var last_dx=0;
	var last_dy=0;
	var dir = ['up','right','down','left'];
	var m=0;
	
	function p(global_snake_image_data,x,y,w,h,dx,dy,base_color,lp)
	{
		var np=[];
		var obj={};
		
		if((lp.x==x)&&(lp.y==y+dy)) //come from down //prishli snizu
		{
			if( weCanLeft(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x-dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			else if( weCanUp(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y-dy;
				obj.move=true;
				np.push(obj);
			}
			else if( weCanRight(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x+dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			else{
				//nado vernutsya
				return null;
			}
		}
		else if((lp.x==x-dx)&&(lp.y==y)) //come from left //prishli sleva
		{
			if( weCanUp(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y-dy;
				obj.move=true;
				np.push(obj);
			}
			else if( weCanRight(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x+dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			else if( weCanDown(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y+dy;
				obj.move=true;
				np.push(obj);
			}
			
			else{
				//nado vernutsya
				return null;
			}
		}
		else if((lp.x==x)&&(lp.y==y-dy)) //come from up //prishli sverhu
		{
			if( weCanRight(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x+dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			else if( weCanDown(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y+dy;
				obj.move=true;
				np.push(obj);
			}
			
			else if( weCanLeft(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x-dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			
			else{
				//nado vernutsya
				return null;
			}
		}
		else if((lp.x==x+dx)&&(lp.y==y)) //come from right //prishli sprava
		{
			if( weCanDown(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y+dy;
				obj.move=true;
				np.push(obj);
			}
			
			else if( weCanLeft(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x-dx;
				obj.y=y;
				obj.move=true;
				np.push(obj);
			}
			
			else if( weCanUp(global_snake_image_data, x,y,w,h,dx,dy, base_color))
			{
				obj={};
				obj.x=x;
				obj.y=y-dy;
				obj.move=true;
				np.push(obj);
			}
			
			else{
				//nado vernutsya
				return null;
			}
		}
		
		
		np.push(obj);
		
		
		return np;
	}
	
	
	while(true)
	{
		y+=dy;
		if(y>=h) break;
		
		var color = getColorArrayFromImageData(global_snake_image_data, x, y );
		
		if(
						(base_color[0]==color[0]) && 
						(base_color[1]==color[1]) && 
						(base_color[2]==color[2]) && 
						(base_color[3]==color[3]) 
						
					
		)
		{
			continue;
		}
		else
		{
			break;
		}
	}
	
	console.log("x="+x+', y='+y);
	
	if(y>=h) y-=dy;
	
	
	var obj={};
	obj.x=x;
	obj.y=y+dy;
	last_p=obj;
	
	while(true)
	{
		
		var np = p(global_snake_image_data,x,y,w,h,dx,dy,base_color,last_p);
		if(np==null)
		{
			
			x=last_p.x;
			y=last_p.y;
			//colors.push([x,y]);
		}
		else
		{
			//var xy = f( np[0],np[1],np[2],last_p );
			var obj={};
			obj.x=x;
			obj.y=y;
			last_p=obj;
			x=np[0].x;
			y=np[0].y;
			
			var found=false;
			for(var j=0;j<acolors.length;j++)
			{
					var x7=acolors[j][0];
					var y7=acolors[j][1];
					
					if( x7==x && y7==y) {found=true;break;}
					
					
			}
	
			
			if(found==false) acolors.push([x,y]);
		}
		
		
		/**
		var x0=x;
		var y0=y;
		
		if( weCanUp(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)) { y=y-dy; acolors.push([x,y]); }
		else if( weCanRight(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)) { x=x+dx; acolors.push([x,y]); }
		else  if( weCanDown(global_snake_image_data, x0,y0,w,h,dx,dy, base_color))  { y=y+dy; acolors.push([x,y]); }
		else if( weCanLeft(global_snake_image_data, x0,y0,w,h,dx,dy, base_color))  { x=x-dx; acolors.push([x,y]); }
		**/
		counter++;
	
		if(counter>9999) break;
		
	
		
	}
	
	//acolors eto obvod, sdelaem sortirovky y
	//first, clone acolors
	var aaa_colors=[];
	for(var j=0;j<acolors.length;j++)
	{
			x=acolors[j][0];
			y=acolors[j][1];
			aaa_colors.push([x,y]);
	
	}
	
	//second, find max y and set him in result object and splice aaa_colors
	
	var result=[];
	
	var n=0;
	while(true)
	{
		var max_index=-1;
		var max_value=0;
		for(var j=0;j<aaa_colors.length;j++)
		{
				x=aaa_colors[j][0];
				y=aaa_colors[j][1];
				if(y>=max_value)
				{
					max_value=y;
					max_index=j;
				}
				
		
		}
		if(max_index==-1) break;
		result.push([aaa_colors[max_index][0],aaa_colors[max_index][1]]);
		aaa_colors.splice(max_index,1);
		n++;
	
	}
	
	
	
	var max_index=-1;
	var max_value=0;
	for(var j=0;j<result.length;j++)
	{
			x=result[j][0];
			y=result[j][1];
			if(x>=max_value)
				{
					max_value=x;
					max_index=j;
				}
	
	}
	
	var max_x=max_value;
	
	var min_index=-1;
	var min_value=max_x;
	for(var j=0;j<result.length;j++)
	{
			x=result[j][0];
			y=result[j][1];
			if(x<=min_value)
				{
					min_value=x;
					min_index=j;
				}
	
	}
	
	context2.strokeStyle= 'black';
	var x0=min_value;
	var y0=result[result.length-1][1];
	
//	context2.strokeRect(x0,y0,(max_x-x0),(result[result.length-1][1]-y0));
	
	for(var y2=y0;y2<=result[0][1];y2+=global_cell_size)
	{
		for(var x2=x0;x2<=max_x;x2+=global_cell_size)
		{
			
			var color = getColorArrayFromImageData(global_snake_image_data, x2, y2 );
			if(
						(base_color[0]==color[0]) && 
						(base_color[1]==color[1]) && 
						(base_color[2]==color[2]) && 
						(base_color[3]==color[3]) 
						
					
					)
					{
						
						
						if(inBordersFromArray(result, x2, y2)==true)
						
						{
							context2.strokeStyle= 'magenta';
	
							context2.strokeRect(x2,y2,1,1);
	
							
						}
						
						
						
						
					}
			
			
		}
		
		
	}
	
	function inBordersFromArray(result, x2, y2)
	{
		var arr=[];
		for(var j=0;j<result.length;j++)
		{
				x=result[j][0];
				y=result[j][1];
				if(y2==y)
					{
						arr.push(x);
					}
		
		}
		
		var min_value=arr[0];
		for(var i=0;i<arr.length;i++)
		{
			if(min_value>arr[i]) min_value=arr[i];
		}
		if(min_value>x2)return false;
		
		var max_value=0;
		for(var i=0;i<arr.length;i++)
		{
			if(max_value<arr[i]) max_value=arr[i];
		}
		if(x2>max_value)return false;
		return true;
	
	}
	
	/*
	context2.fillStyle= 'black';
	context2.fillRect(min_value,result[0][1],(max_x-min_value)+1,(result[result.length-1][1]-result[0][1])+1);
	
	context2.fillStyle= 'black';
	context2.fillRect(min_value,result[0][1],(max_x-min_value)+1,(result[result.length-1][1]-result[0][1])+1);
	*/
	
	for(var j=0;j<acolors.length;j++)
	{
			x=acolors[j][0];
			y=acolors[j][1];
			context2.fillStyle= getEditColor(); //'black';
			context2.fillRect(x,y,global_cell_size, global_cell_size);
	
	}
	
	
	
	for(var j=0;j<acolors.length;j++)
	{
			x=acolors[j][0];
			y=acolors[j][1];
			context2.fillStyle= getEditColor(); //'black';
			context2.fillRect(x,y,global_cell_size, global_cell_size);
	
	}
	
	var colors7 = [];
	for(var j=0;j<acolors.length;j++)
	{
			x=acolors[j][0];
			y=acolors[j][1];
			
			//vzyat sosedey tochki x, y minimum 3 cveta should be
			
			var arr7x0y0 = getNeighbors(x,y,global_cell_size, global_cell_size);
			for(var n=0;n<arr7x0y0.length;n++)
			{
				var color = getColorArrayFromImageData(global_snake_image_data, arr7x0y0[n][0], arr7x0y0[n][1] );
				
					if(
						(base_color[0]==color[0]) && 
						(base_color[1]==color[1]) && 
						(base_color[2]==color[2]) && 
						(base_color[3]==color[3]) 
						
					
					)
					{
						continue;
					}
				
				var found=false;
				for(var i=0;i<colors7.length;i++)
				{
					
					
		
					if( (color[0]==colors7[i][0]) && (color[1]==colors7[i][1]) && (color[2]==colors7[i][2]) && 	(color[3]==colors7[i][3]) )
					{
				
						found= true;
						
					}
				}
				if(found==false) colors7.push(color);
			}
	}
	
	for(var i=0;i<colors7.length;i++)
			{
				console.log(colors7[i]);
			}
			
			
	
}

function getNeighbors(x, y, dx, dy)
{
	var arr=[];
	arr.push([x-dx,y-dy]);
	arr.push([x-dx,y+dy]);
	arr.push([x+dx,y-dy]);
	arr.push([x+dx,y+dy]);
	return arr;
	
}
function getWHDNeighbors(x, y, dx, dy)
{
	var arr=[];
	arr.push([x-dx,y-dy]);
	arr.push([x-dx,y]);
	arr.push([x-dx,y+dy]);
	arr.push([x,y-dy]);
	
	arr.push([x,y+dy]);
	arr.push([x+dx,y-dy]);
	arr.push([x+dx,y]);
	arr.push([x+dx,y+dy]);
	return arr;
	
}

function bububu(x,y,dx,dy)
{
	var color = getColorArrayFromImageData( global_snake_image_data, x, y );
	var aaa_arr=[];
	var arr_arr=[[x,y]];
	
	
		for(var n=0;n<arr_arr.length;n++)
		{
		
			var arr = getSameColorNeighbors(global_snake_image_data, color, arr_arr[n][0], arr_arr[n][1],dx,dy);
			if(arr.length <8) aaa_arr.push([arr_arr[n][0], arr_arr[n][1]]);
			for(var i=0;i<arr.length;i++)
			{
				var found=false;
				for(var j=0;j<arr_arr.length;j++)
				{
						var x7=arr_arr[j][0];
						var y7=arr_arr[j][1];
						
						if( x7==arr[i][0] && y7==arr[i][1]) {found=true;break;}
						
						
				}
		
				
				if(found==false) 
				{
					if((arr[i][0]>=0)&&(arr[i][0]<global_snake_image_data.width-dx)&&(arr[i][1]>=0)&&(arr[i][1]<global_snake_image_data.height-dy))
								arr_arr.push([arr[i][0],arr[i][1]]);
					//n= -1;
					//break;
				}
				
			}
		
		}
		
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	/* Filling color this vetka */
	/*
	for(var j=0;j<arr_arr.length;j++)
	{
			x=arr_arr[j][0];
			y=arr_arr[j][1];
			context2.fillStyle= getEditColor(); //'black';
			context2.fillRect(x,y,global_cell_size, global_cell_size);
	
	}
	*/
	/** Obvod this vetka **/
	var ccc=0;
	var col = getEditColor();
	for(var j=0;j<aaa_arr.length;j++)
	{
			x=aaa_arr[j][0];
			y=aaa_arr[j][1];
			
			setTimeout( function(x,y,col) {
				return function() {
			context2.fillStyle=col;//'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'; //'black';
			context2.fillRect(x,y,global_cell_size, global_cell_size);
				}
			}(x,y,col), ccc);
			
			ccc+=20;
	
	}

	return aaa_arr;
	
}

function getSameColorNeighbors(global_snake_image_data, color, x, y,dx,dy)
{
	
	
		
	
	var arr=[];
	//	if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
	
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
						}	
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
						}	
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
						}
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
						}	
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
						}	
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
						}	
						
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
						}	
	}

	/**
	while(true)
	{
		var found_index= -1;
		for(var i=0;i<arr.length;i++)
		{
			var color2 = getColorArrayFromImageData( global_snake_image_data, arr[i][0], arr[i][1] );
			if(
							(color2[0]==color[0]) && 
							(color2[1]==color[1]) && 
							(color2[2]==color[2]) && 
							(color2[3]==color[3]) 
							
						
						)
						{
							continue;
						}
						found_index=i;
						break;
						
		}
		
		if(found_index!= -1)
		{
			arr.splice(found_index,1);
			continue;
		}
		
		break;
	}
	*/
	
	
	return arr;
	
}



function getSameColorNeighbors0(global_snake_image_data, color, x, y,dx,dy)
{
	
	
		
	var arr2=[];
	var arr=[];
	//	if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
	
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


function getColorOfClusterByPoint(x,y)
{

	var point=[x,y];
   for(var i=0;i<global_table_of_clusters.length;i++)
	{
		
		if(global_table_of_clusters[i]==null) continue;
		
		var points = global_table_of_clusters[i].points;
		
		for(var j=0;j<points.length;j++)
		{
			
			if(( points[j][0] == point[0]) && (points[j][1] == point[1] )) 
			{
				return global_table_of_clusters[i].color;
			}
			
		}
		
	}
	
	return null;
}


function getSameColorNeighborsPro(global_snake_image_data, color, x, y,dx,dy)
{
	
	
		
	var arr2=[];
	var arr=[];
	//	if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
	
	var arr0=null;							
	if((x>0) && (y>0) )
	{
			arr0=[x-dx,y-dy];
			var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
		var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
		
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
	var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
		var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
		var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
	var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
	var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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
	var color2 = getColorOfClusterByPoint( arr0[0], arr0[1] );
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





function getIndexOfClusterByPoint(x,y)
{

	var point=[x,y];
   for(var i=0;i<global_table_of_clusters.length;i++)
	{
		
		if(global_table_of_clusters[i]==null) continue;
		
		var points = global_table_of_clusters[i].points;
		
		for(var j=0;j<points.length;j++)
		{
			
			if(( points[j][0] == point[0]) && (points[j][1] == point[1] )) 
			{
				return i;
			}
			
		}
		
	}
	
	return null;
}






function getSameIndexNeighborsPro(index, x, y, dx, dy)
{
	
	
		
	var arr2=[];
	var arr=[];
	//	if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
	
	var arr0=null;							
	if((x>0) && (y>0) )
	{
			arr0=[x-dx,y-dy];
			
				var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
		
	}
		
	
	if((y>0) && (x<global_snake_image_data.width))
	{		
		arr0=[x,y-dy];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			

	}	
	
	if((y>0) && (x<global_snake_image_data.width-dx))
	{
		arr0=[x+dx,y-dy];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	}
	
		
	if(	(x>0) && (y<global_snake_image_data.height))
	{
		
		arr0=[x-dx,y];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	
	}
	
	if(	(x<global_snake_image_data.width-dx) && (y<global_snake_image_data.height))
	{
		arr0=[x+dx,y];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	
	}
	
	if(	(x>0) && (y<global_snake_image_data.height-dy))
	{
		arr0=[x-dx,y+dy];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	
	
	}
		
	if(	(x<global_snake_image_data.width) && (y<global_snake_image_data.height-dy))
	{		
		arr0=[x,y+dy];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	}
	
	if(	(x<global_snake_image_data.width-dx) && (y<global_snake_image_data.height-dy))
	{
		arr0=[x+dx,y+dy];
		
			var index2 = getIndexOfClusterByPoint( arr0[0], arr0[1] );
			if( index==index2)
						{
							arr.push([arr0[0], arr0[1]]);
						}
						else arr2.push([arr0[0], arr0[1], index2]);
	
	
			
	}
	

	
	
	return [arr,arr2];
	
}




















function getEditColor()
{
	var cnv = document.getElementById("got_color_canvas");
	var ctx = cnv.getContext("2d");
	var imgData = ctx.getImageData(5,5,1,1);
	var got_color = getStrColorFromRGBAArray(imgData.data);
	if(got_color=="rgba(0,0,0,0)")
	{
		return 'black';
	}
	return  got_color;
}




function pre_bubabu(x,y,dx,dy)
{
	var color = getColorArrayFromImageData( global_snake_image_data, x, y );
	var aaa_arr=[];
	var arr_arr=[[x,y]];
	
	
		for(var n=0;n<arr_arr.length;n++)
		{
		
			var arr = getSameColorNeighbors(global_snake_image_data, color, arr_arr[n][0], arr_arr[n][1],dx,dy);
			if(arr.length <8) aaa_arr.push([arr_arr[n][0], arr_arr[n][1]]);
			for(var i=0;i<arr.length;i++)
			{
				var found=false;
				for(var j=0;j<arr_arr.length;j++)
				{
						var x7=arr_arr[j][0];
						var y7=arr_arr[j][1];
						
						if( x7==arr[i][0] && y7==arr[i][1]) {found=true;break;}
						
						
				}
		
				
				if(found==false) 
				{
					if((arr[i][0]>=0)&&(arr[i][0]<global_snake_image_data.width-1)&&(arr[i][1]>=0)&&(arr[i][1]<global_snake_image_data.height-1))
								arr_arr.push([arr[i][0],arr[i][1]]);
					//n= -1;
					//break;
				}
				
			}
		
		}
		

	return aaa_arr;
	
}

function isPointsContain(points, point)
{
	var found=false;
	for(var i=0;i<points.length;i++)
	{
				
		if ( (point[0]==points[i][0]) && (point[1]==points[i][1]) ) return true;
							
	}
	return false;
}


function bububa(x,y,color,dx,dy)
{
	
	var aaa_arr = [];
	
	var arr_arr = [[x,y]];
	
	
						
							/**
							var canvas2 = document.getElementById("canvas0");
							var context2 = canvas2.getContext("2d");
							context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
							context2.fillRect( x, y, dx, dy );
						**/
							
	
		for(var n=0;n<arr_arr.length;n++)
		{
			var x0 = arr_arr[n][0];
			var y0 = arr_arr[n][1];
			
				var color2 = getColorArrayFromImageData( global_snake_image_data, x0, y0 );
				if(
					(color2[0]==color[0]) && 
					(color2[1]==color[1]) && 
					(color2[2]==color[2]) && 
					(color2[3]==color[3]) 
							
					)
					{
						if(isPointsContain(arr_arr, [x0,y0])==false)
						{
							if((x0>=0) && (x0<global_snake_image_data.width)&&(y0>=0)&&(y0<global_snake_image_data.height) )
							arr_arr.push([x0,y0]);
							/**
							var canvas2 = document.getElementById("canvas0");
							var context2 = canvas2.getContext("2d");
							context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
							context2.fillRect( x0, y0, dx, dy );
							**/
						
						}
						
						
					
							
							
								var arr = getWHDNeighbors(x0, y0, dx, dy);//( global_snake_image_data, color, x, y, dx, dy );
								for(var i=0;i<arr.length;i++)
								{
									var x = arr[i][0];
									var y = arr[i][1];
									
									if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
									{
									
										var color2 = getColorArrayFromImageData( global_snake_image_data, x, y );
										if(
											(color2[0]==color[0]) && 
											(color2[1]==color[1]) && 
											(color2[2]==color[2]) && 
											(color2[3]==color[3]) 
													
											)
												{
													if(isPointsContain(arr_arr,[x,y])==false) 
													{	
													
														arr_arr.push([x,y]);
														/**
														var canvas2 = document.getElementById("canvas0");
														var context2 = canvas2.getContext("2d");
														context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
														context2.fillRect( x, y, dx, dy );
														**/
													}
												}
											
									}
								}
								//
								
								//arr_arr.splice(n,1);
								
							//	if(arr.length <8) 
							//	{ 
							//		if(isPointsContain(aaa_arr, [x0,y0])==false)	aaa_arr.push([x0,y0]);
							//	}	
					//console.log(1);
			}
		}
/**
		for(var i=0;i<aaa_arr.length;i++)	
		{
			var found=false;
			for(var n=0;n<arr_arr.length;n++)
			{
			
				if( arr_arr[n][0] == aaa_arr[i][0] && arr_arr[n][1] == aaa_arr[i][1] ) 
				{
					found=true;
					break;
				}
			}	
			if(found==false) arr_arr.push( [ aaa_arr[i][0], aaa_arr[i][1] ] );
		}
				
	*/

	return arr_arr;
	
}

function get_only_less8neighbors_points(color,points,dx,dy)
{
	
	var arr_arr=[];
	
	for(var j=0;j<points.length;j++)
	{	
		var x0=points[j][0];
		var y0=points[j][1];		
								var arr = getWHDNeighbors(x0, y0, dx, dy);
								
								for(var i=0;i<arr.length;i++)
								{
									var x = arr[i][0];
									var y = arr[i][1];
									
									if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
									{
									
										var color2 = getColorArrayFromImageData( global_snake_image_data, x, y );
										if(
											(color2[0]==color[0]) && 
											(color2[1]==color[1]) && 
											(color2[2]==color[2]) && 
											(color2[3]==color[3]) 
													
											)
												{
													
													
													
												}
												else{
													 //all okruzhayuschie drugogo cveta chtobi poluchit // nado formula takaya === > 
													 
													 //// === >    if(isPointsContain(arr_arr,[x,y])==false) 
													if(isPointsContain(arr_arr,[x0,y0])==false) 
													{	
													
														arr_arr.push([x0,y0]); //all okruzhayuschie drugogo cveta chtobi poluchit
														// nado formula takaya === >      arr_arr.push([x0,y0]); 
														
														var canvas2 = document.getElementById("canvas0");
														var context2 = canvas2.getContext("2d");
														context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
														//////  nado formula takaya === >  context2.fillRect( x, y, dx, dy );
														context2.fillRect( x0, y0, dx, dy );
														
													}
												}
												
											
									}
								}
								
	}
	
	return arr_arr;
}


function get_near_non_colors(color,points,dx,dy)
{
	
	var arr_arr=[];
	
	for(var j=0;j<points.length;j++)
	{	
		var x0=points[j][0];
		var y0=points[j][1];		
								var arr = getWHDNeighbors(x0, y0, dx, dy);
								
								for(var i=0;i<arr.length;i++)
								{
									var x = arr[i][0];
									var y = arr[i][1];
									
									if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
									{
									
										var color2 = getColorArrayFromImageData( global_snake_image_data, x, y );
										if(
											(color2[0]==color[0]) && 
											(color2[1]==color[1]) && 
											(color2[2]==color[2]) && 
											(color2[3]==color[3]) 
													
											)
												{
													
													
													
												}
												else{
													
													if(includesColor(arr_arr, color2)==false) 
													{
														arr_arr.push(color2);
													}
													
													 //all granichnie togo zhe cveta chtobi poluchit // nado formula takaya === > 
													 
													 //// === >    if(isPointsContain(arr_arr,[x0,y0])==false) 
													//if(isPointsContain(arr_arr,[x,y])==false) 
													//{	
													
													//	arr_arr.push([x,y]); //all granichnie togo zhe cveta chtobi poluchi
														// nado formula takaya === >      arr_arr.push([x0,y0]); 
														
													//	var canvas2 = document.getElementById("canvas0");
													//	var context2 = canvas2.getContext("2d");
													//	context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
														//////  nado formula takaya === >  context2.fillRect( x0, y0, dx, dy );
													//	context2.fillRect( x, y, dx, dy );
														
													//}
												}
												
											
									}
								}
								
	}
	
	return arr_arr;
}




function get_near_non_color_points(color,points,dx,dy)
{
	
	var arr_arr=[];
	
	for(var j=0;j<points.length;j++)
	{	
		var x0=points[j][0];
		var y0=points[j][1];		
								var arr = getWHDNeighbors(x0, y0, dx, dy);
								
								for(var i=0;i<arr.length;i++)
								{
									var x = arr[i][0];
									var y = arr[i][1];
									
									if((x>=0) && (x<global_snake_image_data.width)&&(y>=0)&&(y<global_snake_image_data.height) )
									{
									
										var color2 = getColorArrayFromImageData( global_snake_image_data, x, y );
										if(
											(color2[0]==color[0]) && 
											(color2[1]==color[1]) && 
											(color2[2]==color[2]) && 
											(color2[3]==color[3]) 
													
											)
												{
													
														//var canvas2 = document.getElementById("canvas0");
														//var context2 = canvas2.getContext("2d");
														//context2.fillStyle='rgba('+(255-color[0])+','+(255-color[1])+','+(255-color[2])+',1)'; 
														
														//context2.fillStyle='black';//'rgba('+color[0]+','+colors[i][1]+','+colors[i][2]+','+colors[i][3]/255+')'; 
														//////  nado formula takaya === >  context2.fillRect( x0, y0, dx, dy );
														
														//context2.fillRect( x, y, dx, dy );
													
												}
												else{
													 //all granichnie togo zhe cveta chtobi poluchit // nado formula takaya === > 
													 
													 //// === >    if(isPointsContain(arr_arr,[x0,y0])==false) 
													if(isPointsContain(arr_arr,[x,y])==false) 
													{	
													
														arr_arr.push([x,y]); //all granichnie togo zhe cveta chtobi poluchi
														// nado formula takaya === >      arr_arr.push([x0,y0]); 
														
													
														
													}
												}
												
											
									}
								}
								
	}
	
	return arr_arr;
}




function post_alpha_bubabu(aaa_arr,color)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	
	//var n=0;
	for(var j=0;j<aaa_arr.length;j++)
	{
		var x=aaa_arr[j][0];
		var y=aaa_arr[j][1];
			
			
			context2.fillStyle='white';//'rgba('+color[0]+','+color[1]+','+color[2]+',127)'; 
			context2.fillRect(x,y,global_cell_size, global_cell_size);
				
	//n++;
	//if(n>200) break;
	}

	return JSON.parse(JSON.stringify(aaa_arr));
	
}

function getBorderPointsFrom(points,color,dx,dy)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	var arr=[];
	
	for(var j=0;j<points.length;j++)
	{
		var x=points[j][0];
		var y=points[j][1];
		var arr0 = getSameColorNeighbors0(global_snake_image_data, color, x, y,dx,dy);
		if( arr0[1].length>0){			
		//	context2.fillStyle='black';//'rgba('+color[0]+','+color[1]+','+color[2]+',127)'; 
		//	context2.fillRect(x,y,dx, dy);
			for(var i=0;i<arr0[1].length;i++)
			{
				var x1 = arr0[1][i][0];
				var y1 = arr0[1][i][1];
				var color1 = arr0[1][i][2];
				arr.push([x1,y1,color1]);
			}
		}
				
	//n++;
	//if(n>200) break;
	}

	return arr;
}


function dummy(x,y,n)
{
	//var n=global_cell_size;
	var nnn=0;
	var mmm=0;
	var nnn4 = x % n;
	if(nnn4==0) nnn=x/n; else nnn=(x-nnn4)/n;
	var mmm4 = y % n;
	if(mmm4==0) mmm=y/n; else mmm=(y-mmm4)/n;
	x=nnn*n;
	y=mmm*n;
	return [x,y];
}

function upupup(dx,dy,base_color,x,y,global_snake_image_data,w,h,px,py)
{
	while(true)
	{
		y-=dy;
		if(y<0) break;
		
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
	
	if(y<0)
	{
		y+=dy;
		while(true)
		{
			x+=dx;
			if(x>=w) break;
			
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
		
		if(x>=w)
		{
			x-=dx;
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
			
			if(y>=h)
			{
				y-=dy;
				while(true)
				{
					x-=dx;
					if(x<0) break;
					
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
				
				if(x<0)
				{
					//alert(5);
					//return;
					
					
					x+=dx;
					while(true)
					{
						y-=dy;
						if(y<0) break;
						
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
					
					if(y<0)
					{
						//second part of x to right corner
						
						x-=dx;
						
						y+=dy;
						while(true)
						{
							x+=dx;
							if(x>=w) break;
							if(x==px)break;
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
						
						if(x>=w)
						{
							alert('impossible');
						}
						else
						{
							alert('border from 0,0 to w,h found');
							//colors.push([x,y]);
							//acolors.push([x-dx,y]);
							//x=x-dx;
						}
						
						
					}
					else
					{
						//colors.push([x,y]);
						//acolors.push([x,y+dy]);
						//y=y+dy;
					}
					
					
				}
				else
				{
					//colors.push([x,y]);
					//acolors.push([x+dx,y]);
					//x=x-dx;
				}
				
				
				
			}
			else
			{
				//colors.push([x,y]);
				//acolors.push([x,y-dy]);
				//y=y-dy;
			}
			
		}
		else
		{
			//colors.push([x,y]);
			//acolors.push([x-dx,y]);
			x=x-dx;
		}
		
	}
	else
	{
		
		//colors.push([x,y]);
		//acolors.push([x,y+dy]);
		y=y+dy;
	}
	
	var px=x;
	var py=y;
	
	return [px,py];
}

function whenInFeerverkModeClicked(e)
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
	
	var colors = [];
	var acolors = [];
	var dy = global_cell_size;
	var dx = global_cell_size;
	
	var px=0;
	var py=0;
	
	var arr =upupup(dx,dy,base_color,x,y,global_snake_image_data,w,h,x,y);
	px=arr[0];
	py=arr[1];
	
	//found up granica consist of two parts: upper with nonbase color and lower with base color
	
	//y-=dy; //returns on base
	
	//A: //check dia top left
	//if base goto metka A
	//if nonbase check left
	//if base goto metka A
	//if nonbase check dia down left
	//if base goto metka A
	//if nonbase check dia down
	//if base goto metka A
	//if nonbase check dia right down
	//if base goto metka A
	//if nonbase check dia right
	//if base goto metka A
	//if nonbase check dia top right 
	//if base goto metka A
	//if nonbase break => all colors found
	x=px;
	y=py;
	var counter=0;

	//A: //check dia top left
	
	var dir = ['right','down','left','up'];
	var m=0;
	while(true)
	{
		
		var arr = fonarik( dir[m], x,y, dx, dy );
		var found=false;
		for(var i=0;i<arr.length;i++)
		{
			if((arr[i][0]<0)||(arr[i][0]>=w))
			{
				colors.push([arr[i][0],arr[i][1]]);
			}
			else if((arr[i][1]<0)||(arr[i][1]>=h))
			{
				colors.push([arr[i][0],arr[i][1]]);
			}
			else if(compareWithBaseColor(base_color,global_snake_image_data,arr[i][0],arr[i][1])==true)
			{
				if(corner(dx,dy,x,y,arr[i][0],arr[i][1])==true)
				{
					 colors.push([arr[i][0],arr[i][1]]);
				}
				else
				{
				
				found=true;
				x=arr[i][0];
				y=arr[i][1];
				
				
				
				acolors.push([x,y]);
				
				////////
				//var arr2 =upupup(dx,dy,base_color,x,y,global_snake_image_data,w,h);
				//x=arr2[0];
				//y=arr2[1];
				////////
				
				
				break;
				}
			}
			else{
				colors.push([arr[i][0],arr[i][1]]);
			}
		}
		
		if(found==false)
		{
			m++;
			
			if(m>3) m=0; 
			
			
		}
		else
		{
			
			
		}
		
		/**
		
		
		if( compareWithBaseColor(base_color,global_snake_image_data,x+dx,y-dy))
		{
			x+=dx;
			y-=dy;
			//continue;
		}
		else
		{
			//colors.push([x,y]);
			colors.push([x+dx,y-dy]);
			
			if( compareWithBaseColor(base_color,global_snake_image_data,x+dx,y))
			{
				x+=dx;
				//continue;
			}
			else
			{
				colors.push([x+dx,y]);
				if( compareWithBaseColor(base_color,global_snake_image_data,x+dx,y+dy))
				{
					x+=dx;
					y+=dy;
					//continue;
				}
				else
				{
					colors.push([x+dx,y+dy]);
					if( compareWithBaseColor(base_color,global_snake_image_data,x,y+dy))
					{
						
						y+=dy;
						//continue;
					}
					else
					{
						colors.push([x,y+dy]);
						if( compareWithBaseColor(base_color,global_snake_image_data,x-dx,y+dy))
						{
							x-=dx;
							y+=dy;
							//continue;
						}
						else
						{
							colors.push([x-dx,y+dy]);
							if( compareWithBaseColor(base_color,global_snake_image_data,x-dx,y))
							{
								x-=dx;
								
								//continue;
							}
							else
							{
								colors.push([x-dx,y]);
								if( compareWithBaseColor(base_color,global_snake_image_data,x-dx,y-dy))
								{
									x-=dx;
									y-=dy;
									//continue;
								}
								else
								{
									colors.push([x-dx,y-dy]);
									console.log('full circle');
									break;
								}
							}
						}
					}
				}
			}
		}
		
		acolors.push([x,y]);
		*/
		//fillRectangleFast( global_snake_image_data, x,y, global_cell_size, global_cell_size, global_snake_fill_color);
		
		
		if(x==px&&y==py) break;
		
		counter++;
		
		if(counter>999) break;
	}
	
	
	var colors2=[];
	for(var i=0;i<colors.length;i++)
	{
		var found=false;
		for(var j=0;j<colors2.length;j++)
		{
			if((colors[i][0]==colors2[j][0])&&(colors[i][1]==colors2[j][1]))
			{
				found=true;
				break;
			}
		}
		if(found==false)
		{
			colors2.push([colors[i][0],colors[i][1]]);
		}
		
	}
	
	var acolors2=[];
	for(var i=0;i<acolors.length;i++)
	{
		var found=false;
		for(var j=0;j<acolors2.length;j++)
		{
			if((acolors[i][0]==acolors2[j][0])&&(acolors[i][1]==acolors2[j][1]))
			{
				found=true;
				break;
			}
		}
		if(found==false)
		{
			acolors2.push([acolors[i][0],acolors[i][1]]);
		}
		
	}
	
	console.log(acolors2);
	console.log(acolors);
	
	for(var j=0;j<acolors2.length;j++)
		{
	context2.fillStyle='magenta';
	context2.fillRect(acolors2[j][0],acolors2[j][1],global_cell_size, global_cell_size);
		}
		
	
}

function corner(dx,dy,x,y,x2,y2)
{
	if((dx+x==x2)&&(y+dy==y2)) return true;
	
	if((dx+x==x2)&&(y-dy==y2)) return true;
	
	if((dx-x==x2)&&(y+dy==y2)) return true;
	
	if((dx-x==x2)&&(y-dy==y2)) return true;
	
	
	
	if((dx+x2==x)&&(y2+dy==y)) return true;
	
	if((dx+x2==x)&&(y2-dy==y)) return true;
	
	if((dx-x2==x)&&(y2+dy==y)) return true;
	
	if((dx-x2==x)&&(y2-dy==y)) return true;
	
	
	
	return false;
}

function fonarik( dir, x,y, dx, dy )
{
	if(dir=='right')
	{
		return [[x+dx,y-dy],[x+dx,y],[x+dx,y+dy]];
	}
	else if(dir=='down')
	{
		return [[x+dx,y+dy],[x,y+dy],[x-dx,y+dy]];
	}
	else if(dir=='left')
	{
		return [[x-dx,y+dy],[x-dx,y],[x-dx,y-dy]];
	}
	else if(dir=='up')
	{
		return [[x-dx,y-dy],[x,y-dy],[x+dx,y-dy]];
	}
	else{
		console.log("dir unknown ["+dir+"]");
		return null;
	}
}


function compareWithBaseColor(base_color,global_snake_image_data,x,y)
{
	
		var color = getColorArrayFromImageData(global_snake_image_data, x, y );
							
							if(
							
									(base_color[0]==color[0]) && 
									(base_color[1]==color[1]) && 
									(base_color[2]==color[2]) && 
									(base_color[3]==color[3]) 
									
							)
							
							{
								return true;
							}
							else
							{
								return false;
							}
							
}



function whenInFeerverkModeClicked2(e)
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


function getEditColor()
{
	var cnv = document.getElementById("got_color_canvas");
	var ctx = cnv.getContext("2d");
	var imgData = ctx.getImageData(5,5,1,1);
	var got_color = getStrColorFromRGBAArray(imgData.data);
	return  got_color;
}


function weCanUp(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)
	{
		if(y0-dy<0) return false;
		else y0=y0-dy;
		
		var color = getColorArrayFromImageData(global_snake_image_data, x0, y0 );
		
		if( (base_color[0]==color[0]) && (base_color[1]==color[1]) && (base_color[2]==color[2]) && 	(base_color[3]==color[3]) )
		{
	
			//acolors.push([x0,y0]);
			return true;
			
		}
		else
		{
			return false;
		}
		
		
	}
	
	function weCanRight(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)
	{
		if(x0+dx>=w) return false;
		else x0=x0+dx;
		
		var color = getColorArrayFromImageData(global_snake_image_data, x0, y0 );
		
		if( (base_color[0]==color[0]) && (base_color[1]==color[1]) && (base_color[2]==color[2]) && 	(base_color[3]==color[3]) )
		{
	
			//acolors.push([x0,y0]);
			return true;
			
		}
		else
		{
			return false;
		}
		
		
	}
	
	
	function weCanDown(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)
	{
		if(y0+dy>=h) return false;
		else y0=y0+dy;
		
		var color = getColorArrayFromImageData(global_snake_image_data, x0, y0 );
		
		if( (base_color[0]==color[0]) && (base_color[1]==color[1]) && (base_color[2]==color[2]) && 	(base_color[3]==color[3]) )
		{
	
			//acolors.push([x0,y0]);
			return true;
			
		}
		else
		{
			return false;
		}
		
		
	}
	
	function weCanLeft(global_snake_image_data, x0,y0,w,h,dx,dy, base_color)
	{
		if(x0-dx<0) return false;
		else x0=x0-dx;
		
		var color = getColorArrayFromImageData(global_snake_image_data, x0, y0 );
		
		if( (base_color[0]==color[0]) && (base_color[1]==color[1]) && (base_color[2]==color[2]) && 	(base_color[3]==color[3]) )
		{
	
			//acolors.push([x0,y0]);
			return true;
			
		}
		else
		{
			return false;
		}
		
		
	}
function define_new_point(dir,m,x,y,w,h,dx,dy,counter)
{
	counter++;
	if(counter>999) return null;
	
	if(dir[m]=='up')
		{
			
			if(y-dy<0) 
			{
				
				m++;
				if(m>3) m=0;
				return  define_new_point(dir,m,x,y,w,h,dx,dy,counter);
			}
			else y=y-dy;
		}
		else if(dir[m] =='right')
		{
			if(x+dx>=w) 
			{
				
				m++;
				if(m>3) m=0;
				return  define_new_point(dir,m,x,y,w,h,dx,dy,counter);
			}
			else x=x+dx;
		}
		else if(dir[m] =='down')
		{
			if(y+dy>=h) 
			{
				
				m++;
				if(m>3) m=0;
				return  define_new_point(dir,m,x,y,w,h,dx,dy,counter);
			}
			else y=y+dy;
		}
		else if(dir[m] =='left')
		{
			if(x-dx<0) 
			{
				
				m++;
				if(m>3) m=0;
				return  define_new_point(dir,m,x,y,w,h,dx,dy,counter);
			}
			else x=x-dx;
		}
	
	else{
		console.log("dir unknown ["+dir+"]");
		return null;
	}
	
	var obj={};
	obj.m = m;
	obj.x=x;
	obj.y=y;
	return obj;
			
}

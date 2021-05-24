var gdelay=1;



function filter(global_array_colors_for_gcombo,arr)
{
		for(var i=0;i<arr[0].length;i++)
		{
			var ind=getPointIndex(global_array_colors_for_gcombo,arr[0][i]);
			if(ind!=null)global_array_colors_for_gcombo.splice(ind,1);
		}
		
		for(var i=0;i<arr[1].length;i++)
		{
			var ind=getPointIndex(global_array_colors_for_gcombo,arr[1][i]);
			if(ind!=null)global_array_colors_for_gcombo.splice(ind,1);
		}
		
		return global_array_colors_for_gcombo;
}











function getMaxColor(im0)
{
	
	var w = im0.width;
	var h = im0.height;
		
			var obj = {};
			var arr = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
						
					if (obj[key]==undefined) { 
					
						
						
						obj[key]= 1;
					
					}
					else
					{
						
						
						obj[key]+=1;
					}
					
					
					
					
					
					
					
				}
			}
		
			var arr=[];
		
			for(var ob in obj)
			{
				
		
				arr.push({color:ob,cnt:obj[ob]});
			}
			
			//   0-0-0-255
			var max = 0;
			var max_ind = 0;
			///	var max_ob = "";
				for(var i=0;i<arr.length;i++)
				{
					if(arr[i].cnt>max)
					{
						max = arr[i].cnt;
						max_ind=i;
					}
				}
				
			
			global_background_color	= arr[max_ind].color;  ////arr[max_ind].col.split("-");
			
			return		global_background_color;	
				
			
		
		
	}
			
			



































function get_array_of_colors_without_background(im0, arr_colors)
{
		
	if(arr_colors==null)
	{		
		
		
			var w = im0.width;
			var h = im0.height;
		
			
			var arr = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					
					if(key==global_background_color) continue;
					
					arr.push([x,y]); 
					
					
				}
			}
		
			return arr;
			
	

			
			
	}
	else{
		
		
			var w = im0.width;
			var h = im0.height;
		
			
			var arr = [];

		
			for (var mmm = 0; mmm < arr_colors.length; mmm++) {
			
				var x=arr_colors[mmm][0];
				
				var y=arr_colors[mmm][1];
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					
					if(key==global_background_color) continue;
					
					arr.push([x,y]); 
					
					
				
			}
		
			return arr;
		
		
		
		
		
		
		
	}
			
			
}










function getArrayOfColorsSizesQuantity()
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	var obj={};
	var colors=[];
	var colors_sizes=[];
	var __fill_color=[0,0,0,255];
	for(var j=0;j<h;j++)
	{
		for(var i=0;i<w;i++)
		{
			
			var temp = global_cell_size;
			global_cell_size=1;
			var arr = dummy_fast(i,j);
			global_cell_size = temp;
	
			var color = getColorArrayFromImageData(imgData2, i, j);
			
			if(compareColors(color,__fill_color)) continue;
			
			if( includesColor(colors, color)==false) 
			{
					colors.push(color);
					
					var obj2={};
					obj2.size=arr[1].length;
					obj2.q=1;
					obj2.color=JSON.parse(JSON.stringify(color));
				//	obj[''+color.join('_')] = obj2;
					
					colors_sizes.push(obj2);
					
				}
				else
				{
					
					
					var obj2=JSON.parse(JSON.stringify(colors_sizes[getIndexOfColorsSizes(colors_sizes, color, arr[1].length)]));
				//	obj2.size=arr[1].length;
					obj2.q++;
				//	obj2.color=JSON.parse(JSON.stringify(color));
				//	obj[''+color.join('_')] = obj2;
					
					colors_sizes[getIndexOfColorsSizes(colors_sizes, color, arr[1].length)]=obj2;
				//	obj[''+color2.join('_')] ++;
				}
				
				
				post_bubabu(arr[0],__fill_color);
				post_bubabu(arr[1],__fill_color);
				
				imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
			
		}
	}
	
	return colors_sizes;
}

var global_i=0;
var global_j=0;
//var obj={};
	var xfcolors=[];
	var xfcolors_sizes=[];
var global_getArrayOfColorsSizesQuantity_Thread_callback = null;

	
function getArrayOfColorsSizesQuantity_Thread()
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	
	var __fill_color=[0,0,0,255];
	
	
	var i=global_i;
	var j=global_j;
	
	if(j<h)
	{
		if(i<w)
		{
			
			
	
			var color = null;
			do
			{
				color=getColorArrayFromImageData(imgData2, i, j);
				
				if(compareColors(color,__fill_color)) 
				{
					i++;
					if(i==w) {i=0;j++; if(j==h){ 
						
					global_getArrayOfColorsSizesQuantity_Thread_callback();
					
					return;}}
					//setTimeout(getArrayOfColorsSizesQuantity_Thread,10);
					//return;
				}
				else break;
			}
			
			while(true)
			global_i=i;
			global_j=j;
		
			var temp = global_cell_size;
			global_cell_size=1;
			var arr = dummy_fast(i,j);
			global_cell_size = temp;
			
			
			if( getIndexOfColorsSizes(xfcolors_sizes, color, arr[1].length)==-1) 
			{
					xfcolors.push(color);
					
					var obj2={};
					obj2.size=arr[1].length;
					//obj2.q=1;
					obj2.color=JSON.parse(JSON.stringify(color));
				//	obj[''+color.join('_')] = obj2;
					obj2.points=[[i,j]];
					
					xfcolors_sizes.push(obj2);
					
				}
				else
				{
					
					
					var obj2=JSON.parse(JSON.stringify(xfcolors_sizes[getIndexOfColorsSizes(xfcolors_sizes, color, arr[1].length)]));
				//	obj2.size=arr[1].length;
					obj2.points.push([i,j]);
				//	obj2.color=JSON.parse(JSON.stringify(color));
				//	obj[''+color.join('_')] = obj2;
					//obj2.q++;
					xfcolors_sizes[getIndexOfColorsSizes(xfcolors_sizes, color, arr[1].length)]=obj2;
				//	obj[''+color2.join('_')] ++;
				}
				/**
				for(var ii=0;ii<arr[0].length;i++)
				{
					imgData2= fillRectangleFast(imgData2, arr[0][ii][0], arr[0][ii][1], global_cell_size, global_cell_size, __fill_color );
					
				}
				
				for(var ii=0;ii<arr[1].length;i++)
				
				{
					imgData2= fillRectangleFast(imgData2, arr[1][ii][0], arr[1][ii][1], global_cell_size, global_cell_size, __fill_color );
					
				}
				
				context2.putImageData(imgData2, 0, 0);
				**/
				post_bubabu(arr[0],__fill_color);
				post_bubabu(arr[1],__fill_color);
				
				//imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
			global_i++;
			setTimeout(getArrayOfColorsSizesQuantity_Thread,gdelay);
		}
		else{
			global_i=0;
			global_j++;
			setTimeout(getArrayOfColorsSizesQuantity_Thread,gdelay);
		}
	}
	else{
		
		global_getArrayOfColorsSizesQuantity_Thread_callback();
	}
	//return xfcolors_sizes;
}







	function getIndexOfColorsSizesWhereAnyPointsFrom(colors_sizes, arr, color)
	{

		for(var i=0;i<colors_sizes.length;i++)
		{
			var obj=colors_sizes[i];
			if(compareColors(obj.color,color)==true)
			{
				for(var n=0;n<obj.points.length;n++)
				{
					
					
				//	for(var j=0;j<obj.points[n].length;j++)
					{
					//	var x = obj.points[n][j][0];
					//	var y = obj.points[n][j][0];
						var x = obj.points[n][0];
						var y = obj.points[n][1];
						
						for(var jj=0;jj<arr[0].length;jj++)
						{
							
							
							if((arr[0][jj][0]==x) &&(arr[0][jj][1]==y))
							{
								return [i,n];
							}
							
							
						}
						for(var jj=0;jj<arr[1].length;jj++)
						{
							
							
							if((arr[1][jj][0]==x) &&(arr[1][jj][1]==y))
							{
								return [i,n];
							}
							
							
						}
						
						
						
						
					}
					
					
					
				}
				
				
				
			}
		}
		
		return -1;
	}






function compareColors(arr,arr2)
{
	for(var j=0;j<arr.length;j++)
	{
		var df = Math.abs(arr[j]-arr2[j]);
		if(df!=0)return false;
	}
	return true;
}


function getIndexOfColorsSizes(colors_sizes, color, len)
{
	for(var i=0;i<colors_sizes.length;i++)
	{
		var obj=colors_sizes[i];
		if(compareColors(obj.color,color)==true)
		{
			if(obj.size==len) return i;
		}
	}
	return -1;
}

function getIndexOfColorsSizes_PRO(colors_sizes, color)
{
	for(var i=0;i<colors_sizes.length;i++)
	{
		var obj=colors_sizes[i];
		if(compareColors(obj.color,color)==true)
		{
			return i;
		}
	}
	return -1;
}

	
function __gcombo(im)
{	
	var w = im.width;
	var h = im.height;
	var randoms = [];
	var n=0;
	while(true)
	{
		//var rgba = getRndColor();
		
		var x = getRandomInt(0, im.width);
		var y = getRandomInt(0, im.height);
		
		var index = w * y + x << 2;
				var rgba = [
			im.data[index],	//	255-im.data[index],
			im.data[index+1],	//	255-im.data[index+1],
			im.data[index+2],	//	255-im.data[index+2],
					255
				];
		console.log('x='+x+', y='+y);
		console.log('rgba='+rgba);
		if(includesColor(randoms,rgba)==false)
		{
			randoms.push(rgba);
			if(randoms.length==3) break;
		}
		
		n++;
		if(n>200) break;
	}
	
	
	var i = getRandomInt(2, w-2);
	var j = getRandomInt(2, h-2);
	 
	var x = 0;
	var y = 0;
	var ind = 0;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 0;
	y = 2;
	ind = 0;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 0;
	ind = 0;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 2;
	ind = 0;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 0;
	ind = 1;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 0;
	y = 1;
	ind = 1;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 2;
	y = 1;
	ind = 1;

	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 2;
	ind = 1;	
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x = 1;
	y = 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	-1;
	y= 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	3;
	y= 1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	1;
	y= -1;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	x= 	1;
	y= 3;
	ind = 2;
	
	im = setPoint(im,w, i,j,x,y,randoms[ind]);
	
	console.log(randoms);
	
	return im;
}



function jump_diagon_alleya(obj1, obj2)
{
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataCellBackground(imgData2) ) return null; 
	
	if ( isImageDataAllPointsSame(imgData1)  && isImageDataAllPointsSame(imgData2) )  return null;
	
	
	
	
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataAllPointsSame(imgData2) )
	{
		
	}
	else if( isImageDataCellPatterned(imgData2)  && isImageDataAllPointsSame(imgData1) )
	{
		
	}
	else  if(isImageDataCellBackground(imgData1) && isImageDataAllPointsSame(imgData2) ) 
	{
		//check if exist some clear allowed line for moving
        var found=false;		
		var canvas = document.getElementById(obj1.frm);	
		var context = canvas.getContext("2d");	
		var nlen = canvas.width/global_seed_size;
		var mlen = canvas.height/global_seed_size;
		var arr = [];
		var j=m;
		for(var i=n;i<nlen;i++)
		{
			arr.push([i,j]);
			if((i==n2)&&(j==m2)) {found=true;break;}
			j++;
			if(j>=mlen) break;
		}
		
		if(found) //[n,m] right bottom [n2.m2]
		{
			arr.splice(arr.indexOf([n2,m2]),1);
			var res = findAllBackgroundCellInArray(arr);
			
			if((res.length == 1) && (arr.length==2))	return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
			return null;
			
						
		}	

		arr = [];
		var j=m;
		for(var i=n;i<nlen;i++)
		{
			arr.push([i,j]);
			if((i==n2)&&(j==m2)) {found=true;break;}
			j--;
			if(j<0) break;
		}
		
		if(found) //[n,m] right bottom [n2.m2]
		{
			arr.splice(arr.indexOf([n2,m2]),1);
			var res = findAllBackgroundCellInArray(arr);
			
			if((res.length == 1) && (arr.length==2))	return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
			return null;
						
		}

		arr = [];
		var j=m;
		for(var i=n;i>=0;i--)
		{
			arr.push([i,j]);
			if((i==n2)&&(j==m2)) {found=true;break;}
			j--;
			if(j<0) break;
		}
		
		if(found) //[n,m] right bottom [n2.m2]
		{
			arr.splice(arr.indexOf([n2,m2]),1);
			var res = findAllBackgroundCellInArray(arr);
			
			if((res.length == 1) && (arr.length==2))	return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
			return null;
						
		}

		arr = [];
		var j=m;
		for(var i=n;i>=0;i--)
		{
			arr.push([i,j]);
			if((i==n2)&&(j==m2)) {found=true;break;}
			j++;
			if(j>=mlen) break;
		}
		
		if(found) //[n,m] right bottom [n2.m2]
		{
			arr.splice(arr.indexOf([n2,m2]),1);
			var res = findAllBackgroundCellInArray(arr);
			
			if((res.length == 1) && (arr.length==2))	return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
			return null;
						
		}
		
	}
			
	
	else  if(isImageDataCellBackground(imgData2) && isImageDataAllPointsSame(imgData1) ) 
	{
		//check if exist some clear allowed line for moving
		
		if( n==n2 )
		{
			//check if exist some clear allowed vertical line for moving
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
		}
		
		
		
	}
	
	return null;
	

}


function jump_magnito(obj1, obj2)
{
	var imgData1 = getImageDataFromObject(obj1);
	var imgData2 = getImageDataFromObject(obj2);
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataCellBackground(imgData2) ) return null; 
	
	if ( isImageDataAllPointsSame(imgData1)  && isImageDataAllPointsSame(imgData2) )  return null;
	
	
	
	
	
	if( isImageDataCellPatterned(imgData1)  && isImageDataAllPointsSame(imgData2) )
	{
		
	}
	else if( isImageDataCellPatterned(imgData2)  && isImageDataAllPointsSame(imgData1) )
	{
		
	}
	else  if(isImageDataCellBackground(imgData1) && isImageDataAllPointsSame(imgData2) ) 
	{
		//check if exist some clear allowed line for moving
		
		if( n==n2 ) //up or down
		{
			//check if exist some clear allowed vertical line for moving
			
			//function check_vertical_cell_background(obj1, m, obj2, m2 ) //when first is bgcolor
			
			if( jump_check_vertical_cell_background(n, obj1, m, obj2, m2 ))
			{
				
				
				var canvas = document.getElementById(obj1.frm);
				var context = canvas.getContext("2d");
				
				//find in colored special n,m = 
				
				var r = findNMinColoredSpecial(n,m);
				
				glob_colored_special_arr[r].color = getColorFromLeftCanvas (n2*global_seed_size,m2*global_seed_size,1,1);
				
				r = findNMinColoredSpecial(n2,m2);
								
				glob_colored_special_arr[r].color =  getBackgroundColor();
				
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
				
		//var imgData2 = getImgDataFromColoredSpecial(n,m);
		//context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
			
			
			
			if( jump_check_horizontal_cell_background(m, obj1, n, obj2, n2 ))
			{
				
				
				var canvas = document.getElementById(obj1.frm);
				var context = canvas.getContext("2d");
				
				//find in colored special n,m = 
				
				var r = findNMinColoredSpecial(n,m);
				
				glob_colored_special_arr[r].color = getColorFromLeftCanvas (n2*global_seed_size,m2*global_seed_size,1,1);
				
				r = findNMinColoredSpecial(n2,m2);
								
				glob_colored_special_arr[r].color =  getBackgroundColor();
				
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
				
		//var imgData2 = getImgDataFromColoredSpecial(n,m);
		//context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
			
			
			
			
			
			
			
		}
	}
	else  if(isImageDataCellBackground(imgData2) && isImageDataAllPointsSame(imgData1) ) 
	{
		//check if exist some clear allowed line for moving
		
		if( n==n2 )
		{
			//check if exist some clear allowed vertical line for moving
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
		}
		
		
		
	}
	
	return null;
	
	
	/*****
		
	var canvas = document.getElementById(obj1.frm);
	var context = canvas.getContext("2d");
	if(isImageDataCellPatterned(imgData1) )
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImgDataFromColoredSpecial(n,m);
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
	}
	else if(isImageDataAllPointsSame(imgData1))
	{
		context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
		var imgData2 = getImageDataCellBackground();
		context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
		
		
		
		var r = findNMinColoredSpecial(n2,m2);
		if(r != -1)
		{
			var obj22 = glob_colored_special_arr[r];
			
			obj22.color = getColorFromLeftCanvas (obj22.obj.nm[0],obj22.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj22;
			
		}
		
		var r = findNMinColoredSpecial(n,m);
		if(r != -1)
		{
			var obj222 = glob_colored_special_arr[r];
			
			obj222.color = getBackgroundColor(); // getColorFromLeftCanvas (obj2.obj.nm[0],obj2.obj.nm[1],1,1);
			glob_colored_special_arr[r] = obj222;
			
		}
		
		
		
	}		
	
	*****/
		
	//return obj2;
}


function jump_check_vertical_cell_background(n, obj1, m, obj2, m2 ) //when first is bgcolor
			{
				//jhgkj
				
				if(m > m2) m2++;
				else if (m2 > m) m2--;
				
				var arr = [];
				if(m > m2)
				{
					for(var mm = m2; mm<=m; mm++) arr.push([n,mm]);
					
				}
				else if(m2 > m)
				{
					for(var mm = m; mm<=m2; mm++) arr.push([n,mm]);
					
				}
				
				var res = findAllBackgroundCellInArray(arr);
				
				if((res.length == 1) && (arr.length==2)) return true;
				
				return false;
			}




function jump_check_horizontal_cell_background(m, obj1, n, obj2, n2 ) //when first is bgcolor
			{
				//jhgkj
				
				if(n > n2) n2++;
				else if (n2 > n) n2--;
				
				var arr = [];
				if(n > n2)
				{
					for(var nn = n2; nn<=n; nn++) arr.push([nn,m]);
					
				}
				else if(n2 > n)
				{
					for(var nn = n; nn<=n2; nn++) arr.push([nn,m]);
					
				}
				
				var res = findAllBackgroundCellInArray(arr);
				
				if((res.length == 1) && (arr.length==2)) return true;
				
				return false;
			}


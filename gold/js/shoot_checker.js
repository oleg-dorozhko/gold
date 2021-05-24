//move when c b if b not placed and cdif(1)=b and c not single
function c(obj1)
{
	var imgData1 = getImageDataFromObject(obj1);
	return isImageDataAllPointsSame(imgData1);
}

function b(obj1)
{
	var imgData1 = getImageDataFromObject(obj1);
	return isImageDataCellBackground(imgData1);
}

function p(obj1)
{
	var imgData1 = getImageDataFromObject(obj1);
	return isImageDataCellPatterned(imgData1);
}

function single(obj1)
{
	var arrOkr = getOkrPlaceArray0(obj1.nm[2],obj1.nm[3]);
	var arr = findAllColoredCellInArray(arrOkr);
	if(arr.length > 0) 
	{
		return false;
							
	}	
	else 
	{
		var arr2 = findAllPatternedCellInArray(arrOkr);
		if(arr2.length > 0) 
		{
			return false;
			
		}
	}
	
	return true;
}
/***
function diff_1(obj1,obj2)
{
	var r= 1;
	
	var n1 = obj1.nm[2];
	var m1 = obj1.nm[3];
		
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	var rx = Math.max(n1,n2) - Math.min(n1,n2);	
	var ry = Math.max(m1,m2) - Math.min(m1,m2);	
	
	if( (r >= rx) && (r >= ry)  ) return true;

}
***/

function isHourse2(obj1,obj2)
{
	var n1 = obj1.nm[2];
	var m1 = obj1.nm[3];
		
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	var rx = Math.max(n1,n2) - Math.min(n1,n2);	
	var ry = Math.max(m1,m2) - Math.min(m1,m2);	
	
	if((rx == 2) && (ry==1)) return true;
	if((rx == 1) && (ry==2)) return true;
	
	return false;
}

function isJump(obj1,obj2)
{
	var n1 = obj1.nm[2];
	var m1 = obj1.nm[3];
		
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	var rx = Math.max(n1,n2) - Math.min(n1,n2);	
	var ry = Math.max(m1,m2) - Math.min(m1,m2);	
	
	var rv = false;
	if( (rx == 0) ) 
	{
		if( (ry == 1) ) return false;
		
		if(m1 > m2) 
		{
			for(var y=m2+1;y<m1;y++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",n1,y))) return true;
				
			}
		}
		else
		{
			for(var y=m1+1;y<m2;y++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",n1,y))) return true;
				
			}
		}
		
	}
	else if( (ry == 0) )
	{
		if(rx == 1)  return false;
		
		if(n1 > n2) 
		{
			for(var x=n2;x<n1;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,m1))) return true;
				
			}
		}
		else
		{
			for(var x=n1+1;x<n2;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,m1))) return true;
				
			}
		}
		
	}
	else if( (rx == ry )  ) 
	{
		if(ry == 1)  return false;
		
		
		if((n1 > n2) && (m1 > m2))
		{
			var y=m2+1;
			for(var x=n2+1;x<n1;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,y))) return true;
				y++;
				
			}
		}
		else if((n1 > n2) && (m1 < m2))
		{
			var y=m2-1;
			for(var x=n2+1;x<n1;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,y))) return true;
				y--;
				
			}
		}
		else if((n1 < n2) && (m1 > m2))
		{
			var y=m2+1;
			for(var x=n1+1;x<n2;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,y))) return true;
				y++;
				
			}
		}
		else if((n1 < n2) && (m1 < m2))
		{
			var y=m1+1;
			for(var x=n1+1;x<n2;x++)
			{
				if(!isImageDataCellBackground(getImageDataFrom("left_canvas",x,y))) return true;
				y++;
				
			}
		}
		
		
	}
	
	return false;
	
}

function getCheckboxVal(id)
{
	if( document.getElementById("coins_checkbox").checked) 	return document.getElementById(id+"_checkbox").checked;
	return true;
}

function diff_N(obj1,obj2)
{
	
	var n1 = obj1.nm[2];
	var m1 = obj1.nm[3];
		
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	var rx = Math.max(n1,n2) - Math.min(n1,n2);	
	var ry = Math.max(m1,m2) - Math.min(m1,m2);	
	
	var rv = false;
	
	if (rx == 0)  return ry;
	if (ry == 0)  return rx;
	if (rx == ry )  return ry;
	
	return rv;

}

function path(obj1,obj2)
{
	
}

function placed(obj1,obj2)
{
	return isWillSetOnOwnPlace(obj1, obj2);
}

function hourse(obj1,obj2) //throw jump (throw not b)
{
}

//atomic health
//long move vertical, horizontal, diagonal
//long jump vertical, horizontal, diagonal
//long jump independece
//long swap independece
//simple move dif(1) //move allowed when c b or p c (p b?) if b not placed and c not single
//simple jump dif(2)
//simple swap dif(1), dif(2)
//hourse swap
//hourse move	
//and combination of this
//atomic health







function shoot_check(arr_gun4)
{
	
	if(arr_gun4 == undefined) return null;
	
	if(arr_gun4 == null) return null;
	
	if(arr_gun4.length == 2 )
	{
		var obj1 = arr_gun4[0];
		
		var obj2 = arr_gun4[1];
		
		if(obj1 == null) return null;
		
		if(obj2 == null) return null;
	
		//alert('todo://jump pattern and colored Only not exact places! krepostnoe pravo eto kogda jump bacn on own color');
		
	//	if(document.getElementById("qflag1").checked == true ) all_checked=true;
		
		var imgData1 = getImageDataFromObject(obj1);
		var n1 = obj1.nm[2];
		var m1 = obj1.nm[3];
		
		var imgData2 = getImageDataFromObject(obj2);
		var n2 = obj2.nm[2];
		var m2 = obj2.nm[3];
		
		if ( (obj1.frm.indexOf("kard_")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
		{
			if (isWillSetOnOwnPlace(obj1, obj2)) return null;
			
			return null;// jump_rnd_back2_check(obj1, obj2);
			
		}
		
		
		if ( (obj2.frm.indexOf("kard_")!= -1 ) && (obj1.frm.indexOf("left_canvas")!= -1 ) )
		{
							
				return null;// jump_check(obj1);
				
		}
		
	
		
		if ( (obj1.frm.indexOf("left_canvas")!= -1 ) && (obj2.frm.indexOf("left_canvas")!= -1 ) )
		{
			
			if((n1 == n2) && (m1==m2)) return null;// jump_check(obj1);
			
			
			
				
			if( c(obj1) && b(obj2) && ( isFirstPatternAllows(obj1) || (!placed(obj1,obj2))) &&  (!single(obj1)) && diff_N(obj1,obj2) ) return obj2;
			
			if( b(obj1) && c(obj2) && ( isFirstPatternAllows(obj2) || (!placed(obj2,obj1)))  &&  (!single(obj2))  && diff_N(obj2,obj1) ) return obj1;
			
		
			
			//move or jump allowed when c b or p c (p b?) if b not placed and c not single and one from 8-side 
			
			// if( c(obj1) && b(obj2) && (!placed(obj1,obj2)) && (!single(obj1)) && diff_1(obj1,obj2) ) return obj2;
			
			// if( c(obj1) && b(obj2) && (!placed(obj1,obj2)) && (!single(obj1)) && diff_N(obj1,obj2) ) return obj2;
			
			//if( c(obj1) && b(obj2) && (!placed(obj1,obj2)) && (!single(obj1)) && diff_N(obj1,obj2) ) return obj2;
			 
			/*****
			if( isFirstPatternAllows(obj1)==false) 
			{
				if (isWillSetOnOwnPlace(obj1, obj2))	return null;
			}
			
			if( isFirstPatternAllows(obj2)==false)
			{
				if (isWillSetOnOwnPlace(obj2, obj1))	return null;
			}
			
			
			
			
			if( isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2) )
			{
				if(cmp(imgData1, imgData2)) return null;
				
				if(check_swamp(obj1, obj2)) return kosmik_swap_check(obj1, obj2, true);
				
				return null;
				
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
			{
				
				if(cmp(imgData1, imgData2)) return null; 
				
				if(check_swamp(obj1, obj2)) return kosmik_swap_check(obj1, obj2, true);
				
				
				return null;
				
			}
			
			
			if(isImageDataCellPatterned(imgData2) && isImageDataAllPointsSame(imgData1))
			{
								
				return move_check(obj2, obj1);
				
			}
			
			if(isImageDataCellPatterned(imgData1) && isImageDataAllPointsSame(imgData2))
			{
				
				return move_check(obj1, obj2);
				
			}
			
			if( isImageDataAllPointsSame(imgData2) && isImageDataCellBackground(imgData1)  )
			{
				
				var arrOkr = getOkrPlaceArray0(obj2.nm[2],obj2.nm[3]);
				var arr = findAllColoredCellInArray(arrOkr);
				if(arr.length > 0) 
				{
					return move_check(obj1, obj2);
										
				}	
				else 
				{
					var arr2 = findAllPatternedCellInArray(arrOkr);
					if(arr2.length > 0) 
					{
						return move_check(obj1, obj2);
						
					}
				}
				
				
				
				return null;
			}
			
			if( isImageDataAllPointsSame(imgData1) && isImageDataCellBackground(imgData2)  )
			{
								
				var arrOkr = getOkrPlaceArray0(obj1.nm[2],obj1.nm[3]);
			
				var arr = findAllColoredCellInArray(arrOkr);
				if(arr.length > 0) 
				{
					return move_check(obj1, obj2); //shashki tut
					
					
				}	
				else 
				{
					var arr2 = findAllPatternedCellInArray(arrOkr);
					if(arr2.length > 0) 
					{
						return move_check(obj1, obj2);
						
					}
				}
				
				return null;
			
			}
		**********/
			
		}
		
		
		
			
		
	}	
	
	
	return null;
	 
	
}



function move_check(obj1, obj2)
{
		
	var imgData1 = getImageDataFromObject(obj1);
	
	var imgData2 = getImageDataFromObject(obj2);
	
	//if(inExactPlaces(obj1)) return -1; 
	//if(inExactPlaces(obj2)) return -1;
	
	var n = obj1.nm[2];
	var m = obj1.nm[3];
	
	var n2 = obj2.nm[2];
	var m2 = obj2.nm[3];
	
	
	
	//restrictions
	
	//if( isFreeze(imgData1, n,m, imgData2, n2, m2)==false ) return -1;
	//if( isFreeze(imgData1, n, m)) return -1;
	//if( isFreeze(imgData2, n2, m2)) return -1;
	
	if( (obj1.frm!=obj2.frm) || (obj1.frm.indexOf("_canvas")==-1) ) return null;
	
	var mg = magnito_check(obj1,obj2);
	if( mg != null ) return mg;
	
	var da = diagon_alleya_check(obj1,obj2);
	if(da != null) return da;
	
	var jmg = jump_magnito_check(obj1,obj2);
	if( jmg != null ) return jmg;
	
	var jda = jump_diagon_alleya_check(obj1,obj2);
	if(jda != null) return jda;
	
	var mg2 = magnito_check(obj2,obj1);
	if( mg2 != null ) return mg2;
	
	var da2 = diagon_alleya_check(obj2,obj1);
	if(da2 != null) return da2;
	
	var jmg2 = jump_magnito_check(obj2,obj1);
	if( jmg2 != null ) return jmg2;
	
	var jda2 = jump_diagon_alleya_check(obj2,obj1);
	if(jda2 != null) return jda2;
	
	if(((n+2==n2)||(n2+2==n)||(n2+1==n)||(n+1==n2))&&((m+2==m2)||(m2+2==m)||(m2+1==m)||(m+1==m2)))
	{
	
	// if(n2 < n-1 || n2 > n+1) return null;
			
	// if(m2 < m-1 || m2 > m+1) return null;
	
	//if(isImageDataCellBackground(imgData1) ) return null; 
	
	//if( isImageDataCellPatterned(imgData1)  && isImageDataCellPatterned(imgData2) ) return null; 
	
	//if( isImageDataCellPatterned(imgData1)  && isImageDataCellBackground(imgData2) ) return null; 
	
	//if ( isImageDataAllPointsSame(imgData1)  && isImageDataAllPointsSame(imgData2) )  return null;
	
	
		
	return obj2;
	
	
	}
	
	return null;
}




function kosmik_swap_check(obj1, obj2, flag)
{
	
    if(obj1 == null) return null;
	
	if(obj2 == null) return null;
		
	var imgData1 = getImageDataFromObject(obj1);
	
	var imgData2 = getImageDataFromObject(obj2);
	
	
	
	if ( isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2) )
	{
			
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
		
			var color1 = null;
			var color2 = null;
			
			var obj111 = null;
			var obj222 = null;
			
			/*****
			
			var r1 = findNMinColoredSpecial(n,m);
			if(r1 != -1)
			{
				obj111 = glob_colored_special_arr[r1];
				
				color1 = obj111.color;
			}
			
			r2 = findNMinColoredSpecial(n2,m2);
			if(r2 != -1)
			{
				obj222 = glob_colored_special_arr[r2];
				
				color2 = obj222.color;	
			}
			
			
				obj111.color = color2; //getColorFromLeftCanvas (n2,m2,1,1);
				
				glob_colored_special_arr[r1] = obj111;
				
			
			
			
				
				obj222.color = color1; //getColorFromLeftCanvas (n,m,1,1);
				
				glob_colored_special_arr[r2] = obj222;
				
			
			
		*****/	
		
		
	}
	
	
	
	if     (
	
		(isImageDataCellPatterned(imgData1) && isImageDataCellPatterned(imgData2)) ||
		(isImageDataAllPointsSame(imgData1) && isImageDataAllPointsSame(imgData2))
		
    )	
	
	{
	/*****
			var n = obj1.nm[2];
			var m = obj1.nm[3];
			var n2 = obj2.nm[2];
			var m2 = obj2.nm[3];
				
			var canvas = document.getElementById("left_canvas");
			var context = canvas.getContext("2d");
			
			if(flag)
			{
				context.putImageData(imgData2, n*global_seed_size, m*global_seed_size );
				context.putImageData(imgData1, n2*global_seed_size, m2*global_seed_size );
			}
			*********/
			
			return obj2;
	
	}
	
	return null;
	
	
}












//todo lasso

//todo if not lasso then magnito 

function magnito_check(obj1, obj2)
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
			
			if( check_vertical_cell_background(n, obj1, m, obj2, m2 ))
			{
				
				
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
			
			
			
			if( check_horizontal_cell_background(m, obj1, n, obj2, n2 ))
			{
				
				
				
				
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



function jump_magnito_check(obj1, obj2)
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
				
				
				
				
				return obj2;
				
				
				
				
				
				
			}
			
			
			
		}
		else if(m==m2)
		{
			//check if exist some clear allowed  horizontal line for moving
			
			
			
			if( jump_check_horizontal_cell_background(m, obj1, n, obj2, n2 ))
			{
				
				
				
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





function diagon_alleya_check(obj1, obj2)
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
			if(res.length != arr.length) return null;
			
			return obj1; //move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
						
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
			if(res.length != arr.length) return null;
			
			return obj1; //move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
						
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
			if(res.length != arr.length) return null;
			
			return obj1; //move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
						
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
			if(res.length != arr.length) return null;
			
			return obj1; //move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
						
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



function jump_diagon_alleya_check(obj1, obj2)
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
			
			if((res.length == 1) && (arr.length==2))	return obj1; //return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
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
			
			if((res.length == 1) && (arr.length==2))	return obj1; //return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
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
			
			if((res.length == 1) && (arr.length==2))	return obj1; //return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);	
			
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
			
			if((res.length == 1) && (arr.length==2))	return obj1; //return move_diagon_alleya(context, n,m, imgData1, n2, m2, imgData2, obj2);		
			
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




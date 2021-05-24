function cloneColor(color)
{
	var c =[0,0,0,0];
	c[0] = Number(''+color[0]);
	c[1] = Number(''+color[1]);
	c[2] = Number(''+color[2]);
	c[3] = Number(''+color[3]);
	return c;
}

function clonePoint(point)
{
	var p =[0,0];
	p[0] = Number(''+point[0]);
	p[1] = Number(''+point[1]);
	
	return p;
}
function cloneZZZ(zzz)
{
	var pts = [];
	for(var i=0;i<zzz.length;i++)
	{
		
		pts.push(zzz[i]);
	}
	return pts;
}
function clonePoints(points)
{
	var pts = [];
	for(var i=0;i<points.length;i++)
	{
		p = clonePoint(points[i]);
		pts.push(p);
	}
	return pts;
}

function getColorIndex(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) &&
					(colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) &&
					(colors[i][3]== color[3])
					
		) 
			{
				return i;
			}
	}
	return null;
}

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) &&
					(colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) &&
					(colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}

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

function includesValue(arr, val)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i]==val) {
				return true;
			}
	}
	return false;
}

function getArrayOfAllColors(im0)
{
	
	var w = im0.width;
	var h = im0.height;
	
		
			var obj = {};
			var colors = [];

			for (var y = 0; y < h; y++) {
		

				for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"_"+im0.data[idx+1]+"_"+im0.data[idx+2]+"_"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						colors.push(col); 
						obj[key]= true;//{cnt:1,arr:col};
					
					}
					else
					{
						//var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						//obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
			//console.log ( "count="+colors.length);
			
			return colors;
}

function get_razn_colors(colors)
{
	razn_colors = null;
	razn_colors = [];
	
	
	var nn = 250/colors.length|0;
	
	
	for(var r=10;r<250;r+=nn)
	{ 
		for(var g=10;g<250;g+=nn)
		{ 
			for(var b=10;b<250;b+=nn)
			{ 
				razn_colors.push([r,g,b,255]);
			}
		}
	
	}	
	
	//лабиринт колода, ограниченная галерка, мув который не плюс 1, космический свап, 
	//магия, которая накопится в галерке применяется для всей колоды
	/*****
	
	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(r,0,0));
	}
	
	/****

	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(150,r,150));
		
	}	
	
	for(var r=10;r<256;r+=nn)
	{ 
		razn_colors.push(str_rgba(150,150,r));
	}
	
	*****/
	/****
	razn_colors.push(str_rgba(255,0,0));
	
	
	/*** 
	for(var g=10;g<239;g+=nn)
	{ 
		razn_colors.push(str_rgba(255,g,0));
	}
	
	razn_colors.push(str_rgba(255,255,0));
	
	for(var r=239;r<9;r-=nn)
	{
		razn_colors.push(str_rgba(r,255,0));
	}
	*****/
	//razn_colors.push(str_rgba(0,255,0));
	
	/*****
	for(var b=10;b<239;b+=nn)
	{
		razn_colors.push(str_rgba(0,255,b));
		
	}
	
	razn_colors.push(str_rgba(0,255,255));
	
		for(var g=239;g<9;g-=nn)
		{
			razn_colors.push(str_rgba(0,g,255));	
			 
		}
		
		razn_colors.push(str_rgba(0,0,255));
	
	for(var r=10;r<239;r+=nn)
	{ 
		razn_colors.push(str_rgba(r,0,255));
	}
	
	****/
	
	console.log("razn_colors.length="+razn_colors.length);
	
	shuffle(razn_colors);

	return razn_colors;
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

function shuffle_colors(global_cell_size)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	
	var w = canvas2.width;
	var h = canvas2.height;
	
	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var colors = getArrayOfAllColors(imgData2);
	
	var razn_colors = get_razn_colors(colors);
	
	for(var j=0;j<h;j+=global_cell_size)
	{
		for(var i=0;i<w;i+=global_cell_size)
		{
			var idx = (w * j + i) << 2;	
			
			var arr = [];
			arr[0] = imgData2.data[idx];	
			arr[1] = imgData2.data[idx+1];	
			arr[2] = imgData2.data[idx+2];
			arr[3] = imgData2.data[idx+3];	
			
			var n = getIndexOfColor(colors,arr);
			
			arr = razn_colors[n];
			
			imgData2 = fillRectangleFast( imgData2, i, j, global_cell_size, global_cell_size, arr );

		
			
			
		}
		
		
	}
	
	return imgData2;
}

function inverse(color)
{
	return [255-color[0],255-color[1],255-color[2],255];
}

function getIndexOfColor(colors,color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
		(colors[i][0]==color[0]) && 
						(colors[i][1]==color[1]) && 
						(colors[i][2]==color[2]) && 
						(colors[i][3]==color[3]) 
		
		) return i;
	}
}
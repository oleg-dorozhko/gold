function getResPngWrapper(canvas_id)
{
	
	var res_png=null;
	
	var canvas = document.getElementById( glob_mod_cli_canvas_id );
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0,0,canvas.width,canvas.height);
	
	
	return imageData;
	
	
}	


function fill(small_image,big_image)
{
	
	
	var w = big_image.width * small_image.width;
	var h = big_image.height * small_image.height;
					
					var newpng = getNewImageData(w,h);
					
				
					
					
	
		
		//16%3 = 012
		
		//logger_console_log("big_image.width="+big_image.width);
		//logger_console_log("small_image.width="+small_image.width);
		//logger_console_log("newpng.width="+newpng.width);
		
		//var testError = new Error('for test only');
		//testError.status = 500;
		//throw testError;
		
			for (var y = 0; y < big_image.height; y++) {
				
				for (var x = 0; x < big_image.width; x++) {
					
					
					var idxBig = ( big_image.width * y + x ) << 2;
					
					
					for (var m = 0; m < small_image.height; m++) {
						
						for (var n = 0; n < small_image.width; n++) {
							
								var idxSim = ( small_image.width * m + n ) << 2;
								
								k=x*small_image.width+n;
								p=y*small_image.height+m;
								var idxRes = newpng.width*p + k << 2;
								
								newpng.data[idxRes+0] = getColDec( big_image.data[idxBig+0] , small_image.data[idxSim+0]);
					
								newpng.data[idxRes+1] = getColDec( big_image.data[idxBig+1] , small_image.data[idxSim+1]);
								
								newpng.data[idxRes+2] = getColDec( big_image.data[idxBig+2] , small_image.data[idxSim+2]);
								
								newpng.data[idxRes+3] = 255;
								
						}
					}
					
					
				}
			}

			return newpng;
	
}











function generate_random_seed(params)
{
	
	
	console.log('in generate_random_seed: '+params);
		var wh = getRandomInt(3,20);
	
	
	var wh2 = getRandomInt(2,8);
	
	
	
	if(params)
	{
		wh0 = params[0];
		if(wh0==-1)
		{
		}
		else
		{
			if(wh<3) return -1;
			if(wh>20) return -2;
			wh = params[0];
		}
		
		 wh02 = params[1];
		 if(wh02== -1)
		 {
		 }
		 else
		 {
			if(wh2<2) -3;
			if(wh2>8) -4;
			wh2 = params[1];
		 }
		
	}
	
	
	var imageData =getNewImageData(wh,wh);
	
	
	
	var randoms = [];
	while(true)
	{
		var rgba = getRndColor();
		if(includesColor(randoms,rgba)==false)
		{
			randoms.push(rgba);
			if(randoms.length==wh2) break;
		}
	}
	
	
	var arr = [];
	
		for(var j=0;j<wh;j++)
		{
			for(var i=0;i<wh;i++)
			{
				
				//var imgData = context2.getImageData(i,j,1,1);
				var rgba = randoms[getRandomInt(0,randoms.length)];
				
				var obj = {};
				obj.i = i;
				obj.j = j;
				obj.r = rgba[0];
				obj.g = rgba[1];
				obj.b = rgba[2];
				obj.a = rgba[3];
					
				arr.push(obj);
					
			}
		}
	
		
		
		
		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			var dd = (obj.j*wh+obj.i)*4;
			imageData.data[dd]  = obj.r;
			imageData.data[dd+1]  = obj.g;
			imageData.data[dd+2]  = obj.b;
			imageData.data[dd+3]  = obj.a;
			
			var dd2 = (obj.i*wh+obj.j)*4;
			imageData.data[dd2]  = obj.r;
			imageData.data[dd2+1]  = obj.g;
			imageData.data[dd2+2]  = obj.b;
			imageData.data[dd2+3]  = obj.a;
		}
		
		return 	imageData;
			
	
}

function getNewImageData(w,h)
	{
	var cnv = document.createElement("canvas");
	cnv.width=w;
	cnv.height=h;
	var ctx = cnv.getContext("2d");
	return ctx.createImageData(w, h);
	}


// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRndColor()
{
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}

function includesColor(colors, color)
{
	for(var i=0;i<colors.length;i++)
	{
		if(
					(colors[i][0] == color[0]) && (colors[i][1] == color[1]) &&
					(colors[i][2] == color[2]) && (colors[i][3]== color[3])
					
		) 
			{
				return true;
			}
	}
	return false;
}

/////////////////////////////////////////////////////////////////////////////////

function median(im)
{

/********************* for oddd -----------

=========================
mod_median.js:25 w=9   w+1=10    (w+1)/2=5
mod_median.js:26 w-n=4  (w-n)/2=2
mod_median.js:24 =========================
mod_median.js:25 w=11   w+1=12    (w+1)/2=6
mod_median.js:27 w-(n+1)=4  (w-(n+1))/2=2
mod_median.js:24 =========================
mod_median.js:25 w=13   w+1=14    (w+1)/2=7
mod_median.js:26 w-n=6  (w-n)/2=3
mod_median.js:24 =========================
mod_median.js:25 w=15   w+1=16    (w+1)/2=8
mod_median.js:27 w-(n+1)=6  (w-(n+1))/2=3
mod_median.js:24 =========================

****************************************/
	
	//var canvas = document.getElementById("canvas");
	//var context = canvas.getContext("2d");
	
	var w = im.width;
	var h = im.height;
	
	
	
	if( h == 1 || w==1 )
	{
		
		errror("mod_median: median: error: too small size (need result height > 1 || width > 1)");
		return;
		
	}
	
	if (w%2==1)
	{
	
		var x0 = 0;
		
		var n = (w+1)/2;
		if(n%2==1)
		{
			var xlength = n;
			x0 = (w-xlength)/2;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var x0 = 0;
		
		var n = w/2;
		if(w%4==0)
		{
			var xlength = w/2;
			x0 = w/4;
		}
		else
		{
			var xlength = (n+1);
			x0 = (w-xlength)/2;
		}
		
	}
	
	if (h%2==1)
	{
	
		var y0 = 0;
		
		var m = (h+1)/2;
		if(m%2==1)
		{
			var ylength = m;
			y0 = (h-ylength)/2;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
		
		
		// console.log("w-n="+(w-n)+"  (w-n)/2="+((w-n)/2));
		// if(n%2==0) console.log("w-(n+1)="+(w-(n+1))+"  (w-(n+1))/2="+((w-(n+1))/2));
	
	}
	else
	{
		var y0 = 0;
		
		var m = h/2;
		if(h%4==0)
		{
			var ylength = h/2;
			y0 = h/4;
		}
		else
		{
			var ylength = (m+1);
			y0 = (h-ylength)/2;
		}
	}
	
	
		
		
	var newpng = 	getNewImageData(xlength,ylength);
		
		var m=0;
		var n=0;
			for (var y = y0; y < ylength*2; y++) {
				n=0;
				for (var x = x0; x < xlength*2; x++) {
					var idx = (w * y + x) << 2;
					var idx2 = (newpng.width * m + n) << 2;
					
				
					newpng.data[idx2] = im.data[idx];
					newpng.data[idx2+1] = im.data[idx+1];
					newpng.data[idx2+2] = im.data[idx+2];
					newpng.data[idx2+3] = im.data[idx+3];
					n++;
				}
				m++;
			}
			
	
	console.log("\nmedian\n");
	console.log("for w="+w+" h=" + h + " median()=[ from x0="+x0+"   y0="+y0+"   xlength="+xlength+"   ylength="+ylength+ "] ");
	
	return newpng;
	

			
			
}



function execute_script_generate_random_seed(params)
{
	return generate_random_seed(params);
}

function execute_script__median(res_png)
{
	return  median(res_png);
}

function execute_script_dark_lord(im)
{
	return  mod_cli_cryptography_unknown(im);
}

function execute_script_magik_rotate(res_png,params)
{
	return mod_cli_magik_rotate_magik_rotate(res_png,params);
}

function execute_script_upForImageData(res_png)
{
	return mod_cli_up_upForImageData(res_png);
}

function execute_script_smooth(res_png)
{
	return mod_cli_smooth_smooth(res_png);
}

function execute_script_rotate_ff(res_png)
{
	return mod_cli_rotate_ff__rotate_ff( res_png );
}

function execute_script_paint_over(res_png)
{
	return mod_cli_paint_over__paint_over(res_png);
}

function  execute_script_bothAxesMinus(res_png)
{
	return mod_cli_axes_bothAxesMinus(res_png);
}

function execute_script_nineth(res_png)
{
	return mod_cli_nn_nineth(res_png);
}

function execute_script_nonineth(res_png)
{
	return mod_cli_nn_nonineth(res_png);
}


function execute_script_plus(res_png)
{
	return mod_cli_plus_plus(res_png);	
}

function execute_script_mirror_right(res_png)
{
	return mod_cli_mirror_mirror_right(res_png);
}

function execute_script_mirror_down(res_png)
{
	return mod_cli_mirror_mirror_down(res_png);
}


var glob_mod_cli_canvas_id=null;
function getColDec( cccol, cccol1 )
	{
		var cccol2=0;
		if(cccol+cccol1>255) cccol2=    ((cccol+cccol1)-255)+10;
		else cccol2=cccol+cccol1;
		return cccol2;
	}
	


function execute_script(s)
{
	
	var arr = s.split(",");
	glob_mod_cli_canvas_id="canvas0"
	var res_png = getResPngWrapper();
	
	// if(res_png.width * 2 > 1600 || res_png.height * 2 > 1600 )	return null;
		
	// if(res_png.width * 2 > 1600 || res_png.height * 2 > 1600 )	return null;	
	
	for(var i=0;i<arr.length;i++)
	{
		arr[i]=arr[i].trim();
		
		if(arr[i].indexOf("generate random seed")===0)
		{
			var t = arr[i].replace("generate random seed",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=t.split(" ");
				if(params.length>0)
				{
					for(var ii=0;ii<params.length;ii++) params[ii]=Number(params[ii]);
					
				}
				else
				{
					params =[15,3];
				}
			}
			else
			{
				params =[15,3];
			}
			res_png = execute_script_generate_random_seed(params);
			
			
		}
		else if(arr[i]=="median")
		{
			
			res_png = execute_script__median(res_png);
			
		}
		else if(arr[i]=="cryptographic method two")
		{
			res_png = execute_script_dark_lord(res_png);
		}
		else if(arr[i].indexOf("magik rotate")===0)
		{
			var t = arr[i].replace("magik rotate",'');
			t=t.trim();
			var params=null;
			if(t.length>0)
			{
				params=Number(t);
				
			}
			else
			{
				params =1;
			}
			res_png = execute_script_magik_rotate(res_png,params);
			
		}
		else if(arr[i]=="up")
		{
			res_png = execute_script_upForImageData(res_png);
		}
		else if(arr[i]=="smooth")
		{
			
			res_png = execute_script_smooth(res_png);
			
		}
		else if(arr[i]=="rotate plus 45")
		{
			res_png = execute_script_rotate_ff(res_png);
		}
		else if(arr[i]=="filling")
		{
			var small_image=execute_script_generate_random_seed([5,5]);
			var big_image=execute_script_generate_random_seed([5,5]);
			res_png = fill(small_image,big_image);
		}
		else if(arr[i]=="paint over")
		{
		
			res_png = execute_script_paint_over(res_png);
		
		}
		else if(arr[i]=="nineth")
		{
		
			res_png = execute_script_nineth(res_png);
		
		}
		else if(arr[i]=="nonineth")
		{
		
			res_png = execute_script_nonineth(res_png);
		
		}
		
		else if(arr[i]=="plus")
		{
			
			
			res_png = execute_script_plus(res_png);
			
			
		}
		
		else if(arr[i]=="mirror right")
		{
			// if(res_png.width * 2 > 1200  )
			// {
				
				// res.writeHead( 500, { 'Content-Type':'text/plain' } );
				// res.end("mright: error: too big size (need result width * 2 <= 1200 )");
				// return;
				
			// }
			
			res_png = execute_script_mirror_right(res_png);
			
			
			
		}
		else if(arr[i]=="mirror down")
		{
			
			// if( res_png.height * 2 > 1200 )
			// {
				
				// res.writeHead( 500, { 'Content-Type':'text/plain' } );
				// res.end("mdown: error: too big size (need result height * 2 <= 1200)");
				// return;
				
			// }
			
			res_png = execute_script_mirror_down(res_png);
			
			
		}
		
		else if(arr[i]=="axes minus")
		{
		
		
		
			res_png = execute_script_bothAxesMinus(res_png);
		
		
		
		}
		
		
	}
	
	return res_png;
	
}


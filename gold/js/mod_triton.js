var PAUSED_BY_TRITON=212;
var PAUSE_TRITON_INTERVAL=5000;
var TRITON_WORKS=247;
var TRITON_WORKS_PAUSE_INTERVAL=5000;
var TRITON_MOTION_ANIMATING=409;
var TRITON_MOTION_ANIMATING_PAUSE_INTERVAL=500;
var mod_triton_global_state=null;
var mod_triton_global_dummy_fast_thread_x=0;
var mod_triton_global_dummy_fast_thread_y=0;
var mod_triton_global_dummy_fast_thread_first_x=0;
var mod_triton_global_dummy_fast_thread_first_y=0;
var mod_triton_global_dummy_fast_thread_imgData=null;
var mod_triton_global_dummy_fast_thread_in_cluster=[];
var mod_triton_global_dummy_fast_thread_border_cluster=[];
var mod_triton_global_dummy_fast_thread_color=null;
var mod_triton_global_dummy_fast_thread_arr2_all=[];
var mod_triton_global_dummy_fast_thread_radius=200;
var mod_triton_global_dummy_fast_thread_radius_counter=0;
var mod_triton_global_need_white_point_array=[];
var mod_triton_global_removed_x_y_obj = {};
var mod_triton_x;
var mod_triton_y;
var mod_triton_global_fill_color=[0,255,255,255]; //seawave

function mod_triton_init_dummy_fast_thread()
{
	mod_triton_global_state=null;
	mod_triton_global_dummy_fast_thread_x=0;
	mod_triton_global_dummy_fast_thread_y=0;
	mod_triton_global_dummy_fast_thread_first_x=0;
	mod_triton_global_dummy_fast_thread_first_y=0;
	mod_triton_global_dummy_fast_thread_imgData=null;
	mod_triton_global_dummy_fast_thread_in_cluster=[];
	mod_triton_global_dummy_fast_thread_border_cluster=[];
	mod_triton_global_dummy_fast_thread_color=null;
	mod_triton_global_dummy_fast_thread_arr2_all=[];
	mod_triton_global_dummy_fast_thread_radius=200;
	mod_triton_global_dummy_fast_thread_radius_counter=0;
	mod_triton_global_need_white_point_array=[];
	mod_triton_global_removed_x_y_obj = {};
}

function mod_triton_dummy_fast_thread ( callback )
{
	// if(global_state==TRITON_MOTION_ANIMATING)
	// {
		 // setTimeout(function(){  mod_triton_dummy_fast_thread ( callback )},TRITON_MOTION_ANIMATING_PAUSE_INTERVAL);
		 // return;
	 
	// }
	
	if(mod_triton_global_dummy_fast_thread_arr2_all.length==0)
	{
		callback();
		return;
	}
	
	mod_triton_global_dummy_fast_thread_radius_counter++;
	
			var M =  mod_triton_getRandomInt(0,mod_triton_global_dummy_fast_thread_arr2_all.length);

	
			var x = mod_triton_global_dummy_fast_thread_arr2_all[M][0];
			var y = mod_triton_global_dummy_fast_thread_arr2_all[M][1];
			
			if( mod_triton_global_dummy_fast_thread_radius_counter > mod_triton_global_dummy_fast_thread_radius 
			//(x>mod_triton_global_dummy_fast_thread_first_x+10)||(x<mod_triton_global_dummy_fast_thread_first_x-10)||
			//(y>mod_triton_global_dummy_fast_thread_first_y+10)||(y<mod_triton_global_dummy_fast_thread_first_y-10)
			)
			{
				callback();
				return;
			}
			else{
				
			var key = ''+x+'_'+y;
			
			if( mod_triton_global_removed_x_y_obj [ key ] == undefined )
			{
				
				
				//context2.fillStyle = 'white'; 
				//context2.fillRect( x,y, dx, dy );
				
				var arr = mod_triton_getSameColorNeighbors0( mod_triton_global_dummy_fast_thread_imgData, mod_triton_global_dummy_fast_thread_color, x, y, 1, 1 );
				for(var i=0;i<arr[0].length;i++) 
				{
					
					var x1 = arr[0][i][0];
					var y1 = arr[0][i][1];
					
					mod_triton_global_dummy_fast_thread_arr2_all.push([x1,y1]);
				}
				
				mod_triton_global_removed_x_y_obj [ key ] = true;
				
				if(arr[0].length==8)
					mod_triton_global_dummy_fast_thread_in_cluster.push([x,y]);
				else 
					mod_triton_global_dummy_fast_thread_border_cluster.push([x,y]);
			}
			
			}
			
			mod_triton_global_dummy_fast_thread_arr2_all.splice(M,1);
			mod_triton_global_dummy_fast_thread_imgData=mod_triton_fillRectangleFast(mod_triton_global_dummy_fast_thread_imgData,x,y,1,1,mod_triton_global_fill_color);//mod_triton_global_fill_color);
			
			mod_triton_global_need_white_point_array.push([x,y]);
			
			setTimeout( mod_triton_motion_animate, 200 );
			
			
			if(mod_triton_global_dummy_fast_thread_arr2_all.length==0) {callback();return;}
		
			else 
			{
				var canvas7 = document.getElementById("canvas0");
				var context7 = canvas7.getContext("2d");
				
				context7.putImageData(mod_triton_global_dummy_fast_thread_imgData,0,0);
				
				
				
				setTimeout( function(){  mod_triton_dummy_fast_thread( callback ) }, 200 );
				
			}
	
}
 
 

function mod_triton_motion_animate(x,y)
{
	
	if(mod_triton_global_state==TRITON_MOTION_ANIMATING) return;
	mod_triton_global_state=TRITON_MOTION_ANIMATING;
	
	while(	mod_triton_global_need_white_point_array.length>0)
	{
		var xy = mod_triton_global_need_white_point_array.shift();
		var x = xy[0];
		var y = xy[1];
		mod_triton_global_dummy_fast_thread_imgData=mod_triton_fillRectangleFast(mod_triton_global_dummy_fast_thread_imgData,x,y,1,1,[255,255,255,255]);
		var canvas7 = document.getElementById("canvas0");
		var context7 = canvas7.getContext("2d");
		context7.putImageData(mod_triton_global_dummy_fast_thread_imgData,0,0);	
	
		
	}
	mod_triton_global_state=null;
	
	
	
	
	
	// global_state=TRITON_MOTION_ANIMATING;
			
			// mod_triton_global_dummy_fast_thread_imgData=mod_triton_fillRectangleFast(mod_triton_global_dummy_fast_thread_imgData,x,y,1,1,[0,255,255,255]);
			// //global_fill_color);
			// var canvas7 = document.getElementById("canvas0");
			// var context7 = canvas7.getContext("2d");
					
			// context7.putImageData(mod_triton_global_dummy_fast_thread_imgData,0,0);	
		
	
	// setTimeout( function(){
		
		
		
			// mod_triton_global_dummy_fast_thread_imgData=mod_triton_fillRectangleFast(mod_triton_global_dummy_fast_thread_imgData,x,y,1,1,[255,255,255,255]);//global_fill_color);
			// var canvas7 = document.getElementById("canvas0");
			// var context7 = canvas7.getContext("2d");
					
			// context7.putImageData(mod_triton_global_dummy_fast_thread_imgData,0,0);	
		
			// global_state=null;
		
	// },TRITON_MOTION_ANIMATING_PAUSE_INTERVAL/2|0);
	
	

}
 
 function mod_triton_left_click(x,y,callback)
 {
  
	// if(global_state==PAUSED_BY_TRITON)
	// {
		// setTimeout( function() {
			 
			// global_state=null;
			// mod_triton_left_click(x,y,callback);
		
		// },PAUSE_TRITON_INTERVAL );
			
		// return; 
	// }
	 
		// var r=prompt("conti?","1");
		// if(r!="1")
		// {
			// setTimeout(function(){ doLeftClick(x,y,callback);},10000);
			// return;
		// } 
	 
	 
	// if(global_state==TRITON_WORKS) {

			
			// setTimeout(function(){
				
				// global_state=null;
				// mod_triton_left_click(x,y,callback);
				
										// },TRITON_WORKS_PAUSE_INTERVAL);
			// return; 
	// }
	
	// global_state=TRITON_WORKS;
	 

	 //get color from cnv7
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = mod_triton_getColorArrayFromImageData(imgData7, x, y);
		
		
		
		
	
		
					mod_triton_init_dummy_fast_thread();
						
					mod_triton_global_dummy_fast_thread_arr2_all = [[x,y,1]];

					
					mod_triton_global_dummy_fast_thread_imgData =imgData7;// imgData9;
					
					mod_triton_global_dummy_fast_thread_in_cluster = [];
					mod_triton_global_dummy_fast_thread_border_cluster = [];
					
					mod_triton_global_dummy_fast_thread_color = bgcolor;
					mod_triton_global_removed_x_y_obj = {};
					mod_triton_global_dummy_fast_thread_first_x=x;
					mod_triton_global_dummy_fast_thread_first_y=y;
					
					
					//var arr = getSameColorNeighbors0( global_dummy_fast_thread_imgData, global_dummy_fast_thread_color, x, y, 1, 1 );
							
					//if(arr[0].length==0) { callback(); return; }
					//mod_triton_global_fill_color=mod_triton_getRndColor();

				
							
					mod_triton_dummy_fast_thread (   function()   {
							
							var canvas7 = document.getElementById("canvas0");
							var context7 = canvas7.getContext("2d");
							
							context7.putImageData(imgData7,0,0);
							mod_triton_global_dummy_fast_thread_border_cluster.push([x,y]);
							mod_triton_post_bubabu(mod_triton_global_dummy_fast_thread_border_cluster,[255,255,255,255]);//global_fill_color); 

						//	global_state=null;
						
							callback();
										
										
					} );

 }
 
 

function hfhfbhr44(x,y,callback)
{
	
	if(global_state!=null) return;
	global_state=TRITON_WORKS;
	
	// og('in hfhfbhr44: x='+x+',y='+y);
	if((x==undefined)&&(y==undefined))
	{ 
		if((mod_triton_x==undefined)&&(mod_triton_y==undefined))
		{
			x=mod_triton_getRandomInt(0,document.getElementById("canvas0").width);
			y=mod_triton_getRandomInt(0,document.getElementById("canvas0").height);
			
		}
		else
		{
			x=mod_triton_x;
			y=mod_triton_y;
		}
	}
	
	mod_triton_x=x;
	mod_triton_y=y;
	
	var colors = mod_triton_get_near_not_stones(x,y);
	
	//og('in hfhfbhr44: '+ colors);
	// exit(1000,JSON.stringify(colors));
	
	
	if(colors.length>0)
	{
		
		x=colors[0];
		y=colors[1];
		
		mod_triton_left_click(x,y, function(){
			
			global_state=null;
			callback();
			
			
		});
		
		
	}
	else
	{
		global_state=null;
		callback();
		
	}
	

} 
 
 

////////////////////////////////////////////////////////////////////////////////
// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function mod_triton_getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function mod_triton_getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function mod_triton_getSameColorNeighbors0(snake_image_data, color, x, y,dx,dy)
{
	
	
		
	var arr2=[];
	var arr=[];
	//	if((x>=0) && (x<snake_image_data.width)&&(y>=0)&&(y<snake_image_data.height) )
	
	var arr0=null;							
	if((x>0) && (y>0) )
	{
			arr0=[x-dx,y-dy];
			var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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
	
	if((y>0) && (x<snake_image_data.width))
	{		
		arr0=[x,y-dy];
		var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
		
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
	
	
	
	if((y>0) && (x<snake_image_data.width-dx))
	{
	 arr0=[x+dx,y-dy];
	var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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
		
	if(	(x>0) && (y<snake_image_data.height))
	{
		arr0=[x-dx,y];
		var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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
		
	if(	(x<snake_image_data.width-dx) && (y<snake_image_data.height))
	{
		arr0=[x+dx,y];
		var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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
	
	if(	(x>0) && (y<snake_image_data.height-dy))
	{
	arr0=[x-dx,y+dy];
	var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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
	
	if(	(x<snake_image_data.width) && (y<snake_image_data.height-dy))
	{		
	arr0=[x,y+dy];
	var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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

	if(	(x<snake_image_data.width-dx) && (y<snake_image_data.height-dy))
	{
	arr0=[x+dx,y+dy];
	var color2 = mod_triton_getColorArrayFromImageData( snake_image_data, arr0[0], arr0[1] );
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


function mod_triton_fillRectangleFast(imgData2, x, y, n, m, col )
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


function mod_triton_getColorArrayFromImageData(imgData0, x, y)
{
	
		var idx = ( imgData0.width * y + x) << 2;	
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function mod_triton_post_bubabu(arr,color)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	for(var j=0;j<arr.length;j++)
	{
		var x=arr[j][0];
		var y=arr[j][1];
			
		imgData2 = mod_triton_fillRectangleFast(imgData2, x, y, 1, 1, color);	
			
	}
	context2.putImageData(imgData2,0,0);
	
}


/**
function mod_triton_get_near_stones(x0,y0)
{	
		var colors=[];
		var canvas = document.getElementById("canvas0");
		var ctx = canvas.getContext("2d");
		var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		var arr = mod_triton_getWHDNeighbors(x0, y0, 1, 1);
		
		
					for(var i=0;i<arr.length;i++)
					{
						var x = arr[i][0];
						var y = arr[i][1];
						
						if((x>=0) && (x<im.width)&&(y>=0)&&(y<im.height) )
						{
						
							//var color2 = getColorArrayFromImageData( im, x, y );
							var color =  mod_triton_getColorArrayFromImageData(im, x, y)
							
							if(is_stone(x,y,color))
							{
								colors.push([x,y]);
							} 
								
						}
					}
			return colors;					
								
}
**/

function mod_triton_is_neighbour_food( arr_i )
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(0,0,canvas.width,canvas.height);
		
		var color =  mod_triton_getColorArrayFromImageData(im, arr_i[0], arr_i[1]);
		if(mod_triton_white(color)) return false;
		if(mod_triton_red(color)) return false;
		if(mod_triton_grey(color)) return false;
		if(mod_triton_seawave(color)) return false;
		
	//message here
				
	return true;
	
}


function mod_triton_white(color2)
{
	var color=[255,255,255,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function mod_triton_seawave(color2)
{
	var color=[0,255,255,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function mod_triton_red(color2)
{
	var color=[255,0,0,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}

function mod_triton_grey(color2)
{
	var color=[127,127,127,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}




// https://renkport.ru/java/primer/zapolnenie-dvumernogo-massiva-po-spirali/
function mod_triton_get_ulitka(m,n) {
        //Заполним массив, количество строк мы обозначим m, а столбцов - n.
       // var m = 5;
      //  var n = 5;

        //С помощью переменной s задаются числа внутри массива,
        //начиная с 25 в данном случае.
        var s = m*n;

        //Объявляем и инициализируем массив.
        var arr = [];// new var[m][n];
		for(var i=0;i<m;i++) 
		{
			var arr2=[];
			for(var j=0;j<n;j++) arr2.push(0);
			arr.push(arr2);
		}	
			
			
        //Заполняем периметр массива по часовой стрелке.
        //Не забудьте поменять инкремент на декремент у переменной s.
        for (var y = 0; y < n; y++) {
            arr[0][y] = s;
            s--;
        }
        for (var x = 1; x < m; x++) {
            arr[x][n - 1] = s;
            s--;
        }
        for (var y = n - 2; y >= 0; y--) {
            arr[m - 1][y] = s;
            s--;
        }
        for (var x = m - 2; x > 0; x--) {
            arr[x][0] = s;
            s--;
        }

        //Периметр заполнен. Продолжаем заполнять массив и задаём
        //координаты ячейки, которую необходимо заполнить следующей.
        var c = 1;
        var d = 1;
        
        
        while (s > 1) {
            //В Java инициализированный интовый массив заполняется нулями.
            //Периметр мы заполнили числами, отличными от нулей.
            //Следующие циклы поочерёдно работают, заполняя ячейки.
            //Вложенный цикл останавливается, если следующая ячейка имеет 
            //значение, отличное от ноля. Ячейка, на которой остановился 
            //цикл, не заполняется. Из-за этого условие для выхода из внешнего
            //цикла - (s>1). Если Вы поставите 0, получится вечный цикл. 
            
            
            //Движемся вправо.
            while (arr[c][d + 1] == 0) {
                arr[c][d] = s;
                s--;
                d++;
            }

            //Движемся вниз.
            while (arr[c + 1][d] == 0) {
                arr[c][d] = s;
                s--;
                c++;
            }

            //Движемся влево.
            while (arr[c][d - 1] == 0) {
                arr[c][d] = s;
                s--;
                d--;
            }

            //Движемся вверх.
            while (arr[c - 1][d] == 0) {
                arr[c][d] = s;
                s--;
                c--;
            }
        }

        //При данном решении в центре всегда остаётся незаполненная ячейка.
        //Убираем её при помощи следующего цикла.
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
                if (arr[x][y] == 0) {
                    arr[x][y] = s;
                }
            }
        }
		var arr3=[];
		var xx=m/2|0;
		var yy=n/2|0;
        //Выводим массив в консоль.
        for (var x = 0; x < m; x++) {
            for (var y = 0; y < n; y++) {
				
				arr3.push([(x-xx),(y-yy),arr[x][y]]);
                if (arr[x][y] < 10) {
                    //Два пробела, чтобы в консоли столбцы были ровные.
                   // console.log(arr[x][y] + "["+(x-xx)+","+(y-yy)+"],  ");
                } else {
                    // console.log(arr[x][y] + "["+(x-xx)+","+(y-yy)+"], ");
                }
            }
             //console.log("");
        }
		//console.log(""+arr3);
		return arr3;
 }

function mod_triton_get_near_not_stones(x0,y0)
{	
	
	var r=false;	
	var xx=0;
	var yy=0;
	do 
	{
							
		var arr = mod_triton_get_ulitka(++xx,++yy);
		for(var i=0;i<arr.length;i++)
		{
			var arr2=[arr[i][0]+x0,arr[i][1]+y0];
			if(mod_triton_is_neighbour_food(arr2)) return arr2;	
		}	
		
		if(	mod_triton_check_all_white()	) throw new Exception("error: all white");
		
	}
	while(true);
	
								
}		

	
function mod_triton_getColorArrayFromImageDataByIndex(imgData0, idx)
{
	
		
		
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}
function mod_triton_getRndColor()
{
	var r = mod_triton_getRandomInt(0, 256);
	var g = mod_triton_getRandomInt(0, 256);
	var b = mod_triton_getRandomInt(0, 256);
	var a = 255;
	
	return [r,g,b,a];
	
}


 function mod_triton_check_all_white()
 {
	var canvas0 = document.getElementById("canvas0");
	var context0 = canvas0.getContext("2d");
	
	var imgData0 = context0.getImageData(0,0,canvas0.width,canvas0.height);
	
	for(var ind=0;ind<imgData0.data.length;ind+=4)
	{
		var color0 = mod_triton_getColorArrayFromImageDataByIndex(imgData0,ind);
		if(mod_triton_white(color0)==false)return false;
	}
	return true;
 }
	



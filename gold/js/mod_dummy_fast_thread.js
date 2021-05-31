var global_dummy_fast_thread_x=0;
var global_dummy_fast_thread_y=0;
var global_dummy_fast_thread_first_x=0;
var global_dummy_fast_thread_first_y=0;
var global_dummy_fast_thread_imgData=null;
var global_dummy_fast_thread_in_cluster=[];
var global_dummy_fast_thread_border_cluster=[];
var global_dummy_fast_thread_color=null;
var global_dummy_fast_thread_arr2_all=[];
var global_dummy_fast_thread_radius=200;
var global_dummy_fast_thread_radius_counter=0;
var global_removed_x_y_obj = {};

function init_dummy_fast_thread()
{
	global_dummy_fast_thread_x=0;
	global_dummy_fast_thread_y=0;
	global_dummy_fast_thread_first_x=0;
	global_dummy_fast_thread_first_y=0;
	global_dummy_fast_thread_imgData=null;
	global_dummy_fast_thread_in_cluster=[];
	global_dummy_fast_thread_border_cluster=[];
	global_dummy_fast_thread_color=null;
	global_dummy_fast_thread_arr2_all=[];
	global_dummy_fast_thread_radius=200;
	global_dummy_fast_thread_radius_counter=0;
	global_removed_x_y_obj = {};
}

function dummy_fast_thread ( callback )
{
	if(global_dummy_fast_thread_arr2_all.length==0)
	{
		callback();
		return;
	}
	
	global_dummy_fast_thread_radius_counter++;
	
			var M =  getRandomInt(0,global_dummy_fast_thread_arr2_all.length);

	
			var x = global_dummy_fast_thread_arr2_all[M][0];
			var y = global_dummy_fast_thread_arr2_all[M][1];
			
			if( global_dummy_fast_thread_radius_counter > global_dummy_fast_thread_radius 
			//(x>global_dummy_fast_thread_first_x+10)||(x<global_dummy_fast_thread_first_x-10)||
			//(y>global_dummy_fast_thread_first_y+10)||(y<global_dummy_fast_thread_first_y-10)
			)
			{
				callback();
				return;
			}
			else{
				
			var key = ''+x+'_'+y;
			
			if( global_removed_x_y_obj [ key ] == undefined )
			{
				
				
				//context2.fillStyle = 'white'; 
				//context2.fillRect( x,y, dx, dy );
				
				var arr = getSameColorNeighbors0( global_dummy_fast_thread_imgData, global_dummy_fast_thread_color, x, y, 1, 1 );
				for(var i=0;i<arr[0].length;i++) 
				{
					
					var x1 = arr[0][i][0];
					var y1 = arr[0][i][1];
					
					global_dummy_fast_thread_arr2_all.push([x1,y1]);
				}
				
				global_removed_x_y_obj [ key ] = true;
				
				if(arr[0].length==8)
					global_dummy_fast_thread_in_cluster.push([x,y]);
				else 
					global_dummy_fast_thread_border_cluster.push([x,y]);
			}
			
			}
			
			global_dummy_fast_thread_arr2_all.splice(M,1);
			global_dummy_fast_thread_imgData=fillRectangleFast(global_dummy_fast_thread_imgData,x,y,1,1,getWhiteSpaceColor());
			//global_dummy_fast_thread_imgData
			
			if(global_dummy_fast_thread_arr2_all.length==0) {callback();return;}
		
			else 
			{
				var canvas7 = document.getElementById("canvas0");
				var context7 = canvas7.getContext("2d");
				
				context7.putImageData(global_dummy_fast_thread_imgData,0,0);
				
				refresh_map();
				
				setTimeout( function(){  dummy_fast_thread( callback ) }, 5 );
		
			}
	
}
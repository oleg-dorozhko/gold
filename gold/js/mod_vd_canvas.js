var global_vd_canvas_actions_array=[];
var RENDER_VD_CANVAS_VELOCITY = 1;

function mod_canvas_getXY(x,y,callback)
{
	global_vd_canvas_actions_array.push([1,x,y,callback]);
	
}
function mod_canvas_setXY(x,y,color,callback)
{
	global_vd_canvas_actions_array.push([2,x,y,color,callback]);
	
}
function mod_canvas_get_part_image_data(x,y,w,h,callback)
{
	global_vd_canvas_actions_array.push([7,x,y,w,h,callback]);
	
}
function mod_canvas_get_all_image_data(callback)
{
	global_vd_canvas_actions_array.push([4,callback]);
	
}
function mod_canvas_set_all_image_data(im,callback)
{
	global_vd_canvas_actions_array.push([5,im,callback]);
	
}
function render()
{
	var canvas = document.getElementById("vd_canvas");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(0,0,canvas.width,canvas.height);
	
	if(global_vd_canvas_actions_array.length>0)
	{
		var obj_arr=global_vd_canvas_actions_array.shift();
		if(obj_arr[0]==1)
		{
			var ind=obj_arr[2]*canvas.width+obj_arr[1]<<2;
			var color = [im.data[ind],im.data[ind+1],im.data[ind+2],im.data[ind+3]];
			obj_arr[3](color);
		}
		else if(obj_arr[0]==2)
		{
			var ind=obj_arr[2]*canvas.width+obj_arr[1]<<2;
			var color =[obj_arr[3][0],obj_arr[3][1],obj_arr[3][2],obj_arr[3][3]];
			im.data[ind]=color[0];
			im.data[ind+1]=color[1];
			im.data[ind+2]=color[2];
			im.data[ind+3]=color[3];
			ctx.putImageData(im,0,0);
			obj_arr[4]();
		} 
		else if(obj_arr[0]==4)
		{
			
			obj_arr[1](im);
		} 
		else if(obj_arr[0]==7)
		{
			var im = ctx.getImageData(obj_arr[1],obj_arr[2],obj_arr[3],obj_arr[4]);
			obj_arr[5](im);
		} 
		else if(obj_arr[0]==5)
		{
			ctx.putImageData(obj_arr[1],0,0);
			obj_arr[2]();
		} 
	}
}

function tick()
{
	render();
}

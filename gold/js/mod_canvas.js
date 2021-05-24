var global_canvas0_actions_array=[];
var RENDER_VELOCITY = 1;

function mod_canvas_getXY(x,y,callback)
{
	global_canvas0_actions_array.push([1,x,y,callback]);
	
}
function mod_canvas_setXY(x,y,color,callback)
{
	global_canvas0_actions_array.push([2,x,y,color,callback]);
	
}
function mod_canvas_get_part_image_data(x,y,w,h,callback)
{
	global_canvas0_actions_array.push([7,x,y,w,h,callback]);
	
}
function mod_canvas_get_all_image_data(callback)
{
	global_canvas0_actions_array.push([4,callback]);
	
}

function mod_canvas_compare_image_data(im,callback)
{
	global_canvas0_actions_array.push([9,im,callback]);
	
}


function mod_canvas_set_all_image_data(im,callback)
{
	global_canvas0_actions_array.push([5,im,callback]);
	
}
function render()
{
	var canvas = document.getElementById("canvas0");
	var ctx = canvas.getContext("2d");
	var im=ctx.getImageData(0,0,canvas.width,canvas.height);
	
	if(global_canvas0_actions_array.length>0)
	{
		var obj_arr=global_canvas0_actions_array.shift();
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
		else if(obj_arr[0]==9)
		{
			var result = mod_canvas__compare_imgData(im,obj_arr[1]);
			obj_arr[2](result);
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


function mod_canvas_free_image_equal(data1, data2)
{
	if(data1 == null) return false;
	if(data2 == null) return false;
	if(data1.length != data2.length) return false;
			
	for(var j=0;j<data1.length;j++)
	{
		if(data1[j] != data2[j]) return false; 
		
	}
	return true;
}

function mod_canvas_cmp(im1, im2)
{
	if(im1 == null) return false;
	if(im2 == null) return false;
	return mod_canvas_free_image_equal(im1.data, im2.data);
}


function mod_canvas__compare_imgData(im,im2)
{
	
	
	return mod_canvas_cmp(im, im2);
}

function tick()
{
	render();
}

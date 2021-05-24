var global_buf = null;
function getBackgroundColorImgData()
{
	var canvas2 = document.createElement("canvas");
	canvas2.width = global_seed_size;
	canvas2.height = global_seed_size;
	
	canvas2.getContext("2d").fillStyle = "gold";
	canvas2.getContext("2d").fillRect(0,0,global_seed_size,global_seed_size);
	return canvas2.getContext("2d").getImageData( 0,0,global_seed_size,global_seed_size);
}


function hint( callback )
{
	var el = document.getElementById("left_canvas");
	var global_buf = cloneCanvas(el);
	
	//el.width=1;
	//el.height=1;
	//el.width=global_buf.width;
	//el.height=global_buf.height;
	var arr = [];
	for(var j=0;j<global_buf.height;j+=global_seed_size)
	{
		for(var i=0;i<global_buf.width;i+=global_seed_size)
		{
			var obj1 = arr_gun[0];
			var obj2 = {};
			obj2.frm = "left_canvas";
			obj2.nm = [i,j,i/global_seed_size,j/global_seed_size];
						
			
			if(shoot_check([obj1,obj2])!= null) arr.push([i,j]);
			
			
		}
	}
	
	for(var j=0;j<global_buf.height;j+=global_seed_size)
	{
		for(var i=0;i<global_buf.width;i+=global_seed_size)
		{
			/*****
			var obj1 = arr_gun[0];
			var obj2 = {};
			obj2.frm = "left_canvas";
			obj2.nm = [i,j,i/global_seed_size,j/global_seed_size];
						
			
			if(shoot_check([obj1,obj2])!= null) continue;
			*****/
			var found=false;
			for(var nn=0;nn<arr.length;nn++)
			{
				if((arr[nn][0]==i)&&(arr[nn][1]==j)) {found=true;break;}
			}
			
			if(found==false)
			{
				var imgDataBG = getBackgroundColorImgData();
				el.getContext("2d").putImageData(imgDataBG,i,j);
			}
		}
	}
	
	setTimeout( function()
	{
		var el = document.getElementById("left_canvas");
		el.width=global_buf.width;
		el.height=global_buf.height;
		var imgData = global_buf.getContext("2d").getImageData(0,0,global_buf.width,global_buf.height);
		el.getContext("2d").putImageData(imgData,0,0);
		
		callback();
		
	}, 1000 );
	//console.log(el);
}









function legki_spusk(  )
{
	var el = document.getElementById("left_canvas");
	var global_buf = cloneCanvas(el);
	
	var arr = [];
	for(var j=0;j<global_buf.height;j+=global_seed_size)
	{
		for(var i=0;i<global_buf.width;i+=global_seed_size)
		{
			var obj1 = arr_gun[0];
			var obj2 = {};
			obj2.frm = "left_canvas";
			obj2.nm = [i,j,i/global_seed_size,j/global_seed_size];
						
			
			if(shoot_check([obj1,obj2])!= null) arr.push([i,j]);
			
			
		}
	}
	
	if(arr.length==1) 
	{
		
		var obj2 = {};
		obj2.frm = "left_canvas";
		obj2.nm = [0,0,arr[0][0]/global_seed_size,arr[0][1]/global_seed_size];
		arr_gun.push(obj2);
		return true;
	}
	
	return false;
	
	
}
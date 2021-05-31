function get_good_white_place(im,x,y)
{
	var color2 = getColorArrayFromImageData(im,x,y);
	var res = [];			
	var arr = get_neighbours_points_pro(x,y);
	var colors = arr[1];
	var points = arr[0];
	for(var i=0;i<colors.length;i++)
	{
		var n = points[i][0];
		var m = points[i][1];
		var color0 = colors[i];
		if(compareColors(color0, color2)) continue;
		if(tr_black(color0)) continue;
		if(is_gold(color0)==true) continue;
		if(is_white(color0)==true) res.push( [n,m,color0] ); 
		
		
		
	}
	if(res.length==0) return null;
	var n = getRandomInt(0,res.length);
	return res[n];
}

//and we can here  midas too

function get_good_color_place(im,x,y)
{
	var color2 = getColorArrayFromImageData(im,x,y);
	var res = [];			
	var arr = get_neighbours_points_pro(x,y);
	var colors = arr[1];
	var points = arr[0];
	for(var i=0;i<colors.length;i++)
	{
		var n = points[i][0];
		var m = points[i][1];
		var color0 = colors[i];
		
		if(tr_black(color0)) continue;
		if(is_gold(color0)==true) continue;
		if(is_white(color0)==true) continue;
		if(compareColors(color0, color2)) res.push( [n,m,color0] ); 
		
		
	}
	if(res.length==0) return null;
	var n = getRandomInt(0,res.length);
	return res[n];
}



function create_new_stone()
{
	
	var canvas = document.getElementById("canvas0");
	var context = canvas.getContext("2d");
	var im = context.getImageData(0,0,canvas.width,canvas.height)
	var color7 = getColorArrayFromImageData(im,glob_x_left_top,glob_y_left_top);
	// var arr = get_neighbours_points_pro(x,y);
	// var colors = arr[1];
	// var points = arr[0];
	
	var n = getRandomInt(0,im.width);
	var m = getRandomInt(0,im.height);
	var color = getColorArrayFromImageData(im,n,m);
	
	var arr2 = get_good_white_place(im,glob_x_left_top,glob_y_left_top);
	if(arr2==null) return;
	
	var arr4 = get_good_color_place(im,glob_x_left_top,glob_y_left_top);
	if(arr4==null) {
		
		
		
		var arr7 = dummy_fast(arr2[0],arr2[1]);
		for(var i=0;i<arr7[1].length;i++)
		{
			var x = arr7[1][i][0];
			var y = arr7[1][i][1];
			
			var rc = []
			
			var arr77 = get_neighbours_points_pro(x,y);
			var colors77 = arr77[1];
			var points77 = arr77[0];
			for(var i=0;i<colors77.length;i++)
			{
				var n77 = points77[i][0];
				var m77 = points77[i][1];
				var color077 = colors77[i];
				if(tr_black(color077)) continue;
				//if(filter_include(n77,m77)==false) continue;
				//if(filter_exclude(n77,m77)==false) continue;
				if(is_white(color077)==true) continue;
				if(is_gold(color077)==true) continue;
				
				if(n77==glob_x_left_top&&m77==glob_y_left_top) continue;
				rc = [n77,m77,color077];
				break;
				
			}
			
			if(rc.length==0) continue;
			
			//glob_x_left_top=rc[0];
			//glob_y_left_top=rc[1];
			if(compareColors(rc[2], color7)) {arr4 = [rc[0],rc[1],color7]; break;} 
		}
		
	}
	
	set_pixel("canvas0", arr2[0],arr2[1], arr4[2]);
	set_pixel("canvas0", arr4[0],arr4[1], getWhiteSpaceColor());
	moves_counter_incr();
	f_send_to_server_changed_canvas( ()=> { refresh_map(); f_samson(); } )
}
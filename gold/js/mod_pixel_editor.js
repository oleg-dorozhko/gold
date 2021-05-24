function whenInEditModeClicked(e)
{
	global_cell_size = Number( document.getElementById("cell_size").value );
			
	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);

	var need_color = getColorArrayFromImageData(global_snake_image_data, x, y );
				
		var n = Number( document.getElementById("cell_size").value );
		global_first_click_obj = null;
		var old_cell_size_value = n;
		
		global_cell_size = n;
		
			var n=global_cell_size;
			var nnn=0;
			var mmm=0;
			var nnn4 = x % n;
			if(nnn4==0) nnn=x/n; else nnn=(x-nnn4)/n;
			var mmm4 = y % n;
			if(mmm4==0) mmm=y/n; else mmm=(y-mmm4)/n;
			x=nnn*n;
			y=mmm*n;
		
		var inputColorValue = document.getElementById("color").value.trim();
		if(inputColorValue=="")
		{
			
			var imgData = context2.getImageData(x,y,1,1);
			document.getElementById("color").value = getStrColorFromRGBAArray(imgData.data);
			var cnv = document.getElementById("got_color_canvas");
				cnv.width=50;
				cnv.height=50;
				
				var ctx = cnv.getContext("2d");
				
				
				ctx.fillStyle = document.getElementById("color").value.trim() ;
				ctx.fillRect(0,0,cnv.width,cnv.height); 
			
			return;
		}

		global_snake_fill_color=getColorArrayFromStrColor(document.getElementById("color").value.trim());
		if (
				(global_snake_fill_color[0]==need_color[0]) && 
				(global_snake_fill_color[1]==need_color[1]) && 
				(global_snake_fill_color[2]==need_color[2]) && 
				(global_snake_fill_color[3]==need_color[3]) 
			) return true;
			
			
			global_z80=[];
		
			global_snake_image_data = snake_pro( global_snake_image_data, need_color , x, y );
			
			global_snake_image_data = fillRectangleFast( global_snake_image_data, x, y, global_cell_size, global_cell_size, global_snake_fill_color );
			
			global_z80=[];
			
			context2.putImageData(global_snake_image_data,0,0);
	
}
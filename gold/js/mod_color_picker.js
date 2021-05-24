
	



function initColorPicker()
	{
		var canvas = document.getElementById("colorpicker");
		canvas.style='display:block';
		var img = new Image(); 
		img.onload = function() 
		{ 
			var ctx = canvas.getContext("2d");
			canvas.width = this.width;
			canvas.height = this.height;
			ctx.drawImage(this, 0, 0,canvas.width,canvas.height);
			
			canvas.onclick = function(e)
			{
				evt = (e) ? e : event;   
				if(evt.button == 2) return;
				
				var x = e.offsetX==undefined?e.layerX:e.offsetX;
				var y = e.offsetY==undefined?e.layerY:e.offsetY;
				
				var cnv = document.getElementById("got_color_canvas");
				cnv.width=50;
				cnv.height=50;
				
				var ctx = cnv.getContext("2d");
				var ctx0 = this.getContext("2d");
				var imgData = ctx0.getImageData(x,y,1,1);
				var got_color = getStrColorFromRGBAArray(imgData.data);
				ctx.fillStyle = got_color;
				ctx.fillRect(0,0,cnv.width,cnv.height); 
				//var hexcolor = "#" + toHex(imgData.data[0]) + toHex(imgData.data[1]) + toHex(imgData.data[2]);
				document.getElementById("color").value = got_color;
				
			}
			
		}
		img.src = 'images/colorpicker_image.png';
	}

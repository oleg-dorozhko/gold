function getNewImageData(w,h)
	{
	var cnv = document.createElement("canvas");
	cnv.width=w;
	cnv.height=h;
	var ctx = cnv.getContext("2d");
	return ctx.createImageData(w, h);
	}
	
function mod_cli_plus_plus(res_png)
	{
		var img = res_png;
		var newpng =  getNewImageData(res_png.width*2,res_png.height*2);
		

			for (var y = 0; y < img.height; y++) {
				for (var x = 0; x < img.width; x++) {
					
					var idx = (img.width * y + x) << 2;
					
					var new_idx = newpng.width * (y*2) + (x*2) << 2;
					var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
					
					newpng.data[new_idx] = img.data[idx];
					newpng.data[new_idx+1] = img.data[idx+1];
					newpng.data[new_idx+2] = img.data[idx+2];
					newpng.data[new_idx+3] = img.data[idx+3];
					
					newpng.data[new_idx+4] = img.data[idx];
					newpng.data[new_idx+5] = img.data[idx+1];
					newpng.data[new_idx+6] = img.data[idx+2];
					newpng.data[new_idx+7] = img.data[idx+3];
					
					newpng.data[new_idx2] = img.data[idx];
					newpng.data[new_idx2+1] = img.data[idx+1];
					newpng.data[new_idx2+2] = img.data[idx+2];
					newpng.data[new_idx2+3] = img.data[idx+3];
					
					newpng.data[new_idx2+4] = img.data[idx];
					newpng.data[new_idx2+5] = img.data[idx+1];
					newpng.data[new_idx2+6] = img.data[idx+2];
					newpng.data[new_idx2+7] = img.data[idx+3];
					
					
				}
			}
	
	return newpng;
	}
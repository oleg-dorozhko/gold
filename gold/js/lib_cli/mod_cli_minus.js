function getNewImageData(w,h)
	{
	var cnv = document.createElement("canvas");
	cnv.width=w;
	cnv.height=h;
	var ctx = cnv.getContext("2d");
	return ctx.createImageData(w, h);
	}
	
	
function minus( im )
{

	
		
		//here we create new png (same as result bufferedImage (in java))
		var newpng = getNewImageData(im.width/2|0,im.height/2|0);
		
		

		for (var y = 0; y < im.height; y+=2) {
			for (var x = 0; x < im.width; x+=2) {
				
				var idx = (im.width * y + x) << 2;
				
				var new_idx = newpng.width * (y/2) + (x/2) << 2;
				//var new_idx2 = newpng.width * (y*2+1) + (x*2) << 2;
				
				newpng.data[new_idx] = im.data[idx];
				newpng.data[new_idx+1] = im.data[idx+1];
				newpng.data[new_idx+2] = im.data[idx+2];
				newpng.data[new_idx+3] = im.data[idx+3];

				
				
			}
		}
		
		return newpng;
}



function getNewImageData(w,h)
	{
	var cnv = document.createElement("canvas");
	cnv.width=w;
	cnv.height=h;
	var ctx = cnv.getContext("2d");
	return ctx.createImageData(w, h);
	}
	
function mod_cli_mirror_mirror_right(imageData)
{
		
		
		var newpng = getNewImageData(imageData.width*2,imageData.height);
		
		
		

			for (var y = 0; y < newpng.height; y++) {
				
				n=0;
				for (var x = 0; x < newpng.width; x++) {
					
					var idx=null; 
					var new_idx1 = newpng.width * y + x << 2;
					if(x < imageData.width)
					{
					
						idx = (imageData.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						n++;
					}
					else
					{
						idx = (imageData.width * y + (n-1)) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						
						n--;

					}
					
					
					
				}
				
			}
			
			return newpng;
			
}

function mod_cli_mirror_mirror_down(imageData)
{

	var newpng = getNewImageData(imageData.width,imageData.height*2);
		
	
		var m=0;
		
		for (var x = 0; x < newpng.width; x++) {
			
			m=0;
			
			for (var y = 0; y < newpng.height; y++) {
				
				
				
					
					var idx = 0;
					
					var new_idx1 = newpng.width * y + x << 2;
					
					if(y < imageData.height)
					{
					
						idx = (imageData.width * y + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						m++;
					}
					else
					{
						idx = (imageData.width * (m-1) + x) << 2;
						
						newpng.data[new_idx1+0] = imageData.data[idx+0];
						newpng.data[new_idx1+1] = imageData.data[idx+1];
						newpng.data[new_idx1+2] = imageData.data[idx+2];
						newpng.data[new_idx1+3] = imageData.data[idx+3];
						
						m--;

					}
					
					
					
				}
				
			}
			
			return newpng;
}
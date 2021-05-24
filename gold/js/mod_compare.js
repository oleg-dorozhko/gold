
function vse_na_svoih(canvasL,canvasR)
{
	
	var contextL = canvasL.getContext("2d");
	var imgDataL = contextL.getImageData(0,0,canvasL.width, canvasL.height);
	
	
	var contextR = canvasR.getContext("2d");
	var imgDataR = contextR.getImageData(0,0,canvasR.width, canvasR.height);
	
	
	return cmp(imgDataL, imgDataR);
	
}


function free_image_equal(data1, data2)
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

function cmp(im1, im2)
{
	if(im1 == null) return false;
	if(im2 == null) return false;
	return free_image_equal(im1.data, im2.data);
}


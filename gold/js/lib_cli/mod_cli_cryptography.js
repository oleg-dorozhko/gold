function getNewImageData(w,h)
	{
	var cnv = document.createElement("canvas");
	cnv.width=w;
	cnv.height=h;
	var ctx = cnv.getContext("2d");
	return ctx.createImageData(w, h);
	}

	
function mod_cli_cryptography_unknown(im)
{
	var im2 = getNewImageData(im.width-1,im.height-1);//new PNG ( { width: im.width-1, height: im.height-1, filterType: 4	} );
	for(let i=0;i<im.data.length-4;i+=4) im2 = set_pixel(im2,i,get_f(im,i+4,i));
	return im2;
}

function get_pixel(imgData0, idx)
{
	
		var arr0 = [];
		arr0[0] = imgData0.data[idx];	
		arr0[1] = imgData0.data[idx+1];	
		arr0[2] = imgData0.data[idx+2];
		arr0[3] = imgData0.data[idx+3];	
		
		return arr0;
}

function substr_act(color,color2)
{
	var arr0 = [];
	arr0[0] = Math.abs(color[0]-color2[0]);
	arr0[1] = Math.abs(color[1]-color2[1]);
	arr0[2] = Math.abs(color[2]-color2[2]);
	arr0[3] = Math.abs(color[3]-color2[3]);
	return arr0;
}

function get_f(im,ind,ind2)
{
	return substr_act(get_pixel(im, ind),get_pixel(im, ind2));
}

function set_pixel(im0,idx,color)
{
	im0.data[idx] = color[0];
	im0.data[idx+1] = color[1];
	im0.data[idx+2] = color[2];
	im0.data[idx+3] = color[3];
	
	return im0;
}
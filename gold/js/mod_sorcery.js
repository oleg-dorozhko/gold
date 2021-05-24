function wizardry()
{
	//alert('OMG! I found a magik stone! \nOk. I\'ll put it in my pocket.\nJump on stone now!');
	addStone();
}

function addStone(wh, callback)
{
	//var wh=3;
			var x=glob_x_left_top;
			var y=glob_y_left_top;
			var scale_koeficient=2;
			var params = 'md5='+glob_session_id+'&x='+x+'&y='+y+'&scale_koeficient='+scale_koeficient+'&num_of_strawbery='+wh;	
			glob_x_left_top=x;
			glob_y_left_top=y;
			
			
			var xhr2 = new XMLHttpRequest();
			xhr2.open('POST', global_url_to_glab+'/add_boh_pixel', true);
			xhr2.responseType = "blob";
			xhr2.onload = function() {  
			
				if (xhr2.readyState != 4) return;

				if (xhr2.status != 200) {  var error2 = xhr2.status + ': ' + xhr2.statusText+': '+xhr2.response; onerror(error2); return; }
				
				var newImg = document.createElement("img");
								
				var urlCreator = window.URL || window.webkitURL;
				
				var imageUrl = urlCreator.createObjectURL(xhr2.response);
				
					newImg.onload = function() {	
					
					// showScaleDiv(this,glob_x_left_top,glob_y_left_top);
					
					
					
					var canvas = document.getElementById("pixels");
					if(canvas == null) throw new Error("Canvas pixels not found");
					
					var ctx = canvas.getContext("2d");
					canvas.width = newImg.width;
					canvas.height = newImg.height;
					ctx.drawImage(newImg, 0, 0,canvas.width,canvas.height);
					getChaosedLabirint(function(){
					
						
						callback();
					
					}
					);
					
					
					
					
					
					
				}	
				newImg.src = imageUrl;	
					
			}
						
			xhr2.send(params);	
				
}

function free_prev_labirint( callback )
{
	//reinitialization server-side stones
	// var params='md5='+glob_session_id;
	// var xhr = new XMLHttpRequest();
	// xhr.open('POST', global_url_to_glab+'/clear_stones', true);
	// xhr.onload = function(e) {  

		// if (xhr.readyState != 4) return;
	
		// if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; if(onerror)onerror(error); throw new Error(error);  }
		
		
		callback();
		
		
	// }

	// xhr.send(params);
	
	
	
	
	
}

 
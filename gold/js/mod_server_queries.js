var global_url_to_server='https://patterns-editor.herokuapp.com/';
function do_server_query(n,callback)
{
	if(n==undefined) n=0;
	//var query = (''+document.getElementById("query_for_server").value).trim();
	var txt = "commands=generate random seed 9 5, mirror right, mirror down, axes minus, axes minus, mirror right, mirror down, axes minus, plus,plus,plus,median,rotate plus 45,median,plus";
	//var txt = "commands="+query;
	var url = global_url_to_server+'execute_script';
	
	 textToServerAndReturnBlob(txt, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				console.log('do_server_query: img.height='+img.height);
				whenPastingFinished(img);
				
	//canvas_for_filtering
	
	// var tex=document.createElement("canvas");
			// tex.width=img.width;
		// tex.height=img.height;
		// tex.getContext("2d").drawImage(img,0,0);
		// var tim = tex.getContext("2d").getImageData(0,0,tex.width,tex.height);
				
	
	// global_ish_colors = getColors(tim);
	
	// var r2canvas = document.getElementById("myCanvas79");
	// r2canvas.width = tim.width;
	// r2canvas.height = tim.height;
	
	
				// imageToCanvas(img, "canvas0", function() { 
					
				
					// //var canvas45=document.getElementById("myCanvas4");
					// canvas45.width=document.getElementById("canvas0").width;
					// canvas45.height=document.getElementById("canvas0").height;
					
					
					// var imgData=document.getElementById("canvas0").getContext("2d").getImageData(0,0,document.getElementById("canvas0").width,document.getElementById("canvas0").height);
					
					
					// canvas45.getContext("2d").putImageData(imgData,0,0);
				
				
				if	(callback	) callback(img);
				
				// });	
				
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
	
	
	
}



function do_server_command4(im,s,callback)
{
	ident2(im, global_url_to_server+'ident', function(data2){
					
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	var md5=data2;

	 textToServerAndReturnBlob(txt+'&md5='+data2, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				
						if	(callback	) callback(img);
							
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
});	

}


function do_server_command2(im,s,callback)
{
	ident2(im, global_url_to_server+'ident', function(data2){
					
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	var md5=data2;

	 textToServerAndReturnBlob(txt+'&md5='+data2, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				imageToCanvas(img, "canvas0", function() { 
				prepare_yellow();
						if	(callback	) callback(img);
							});
				//whenPastingFinished(img);
				
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
});				
					

}

function do_server_command(s)
{
	
	var txt = "commands="+s;
	var url = global_url_to_server+'execute_script';
	
	 textToServerAndReturnBlob(txt, url, 
	
	function( blob_from_server ) {
			getImageFromBlob( blob_from_server, function(img) {
				
				
				whenPastingFinished(img);
				
								
			});	
		}, function(msg) {
			
			
			console.log("transform(): Was error: "+msg);
			throw new Error(msg);
			
		}); 
	
	
	
	
}

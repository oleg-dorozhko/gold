function rename()
{
//always create new json
	var filename=prompt("Enter unique name for your own base");
	if(filename==null) return;
	
	var folder_name=prompt("Enter your folder name for your bases");
	if(folder_name==null) return;
	
	var pswd=prompt("Enter your password for your folder");
	if(pswd==null) return;
	
	create_new_base(pswd, filename, folder_name, document.getElementById('canvas0'), whenRenamed, whenErrorRenamed);
	
	
//always save png as file on server with new_linked_json_name

}

function whenRenamed()
{
	
	//reloading created json
	
	
	
	
}

function whenErrorRenamed()
{
}

function f_doLeftClick(x,y,callback)
{
	 
	 if(global_state==PAUSED)
	 {
		 setTimeout(function(){global_state=null;
										f_doLeftClick(x,y,callback);
										},PAUSE_INTERVAL);
			return; 
	 }
	 
		// var r=prompt("conti?","1");
		// if(r!="1")
		// {
			// setTimeout(function(){ doLeftClick(x,y,callback);},10000);
			// return;
		// } 
	 
	 
	if(global_do_work==true) {

			global_state=PAUSED;  
			setTimeout(function(){
				global_state=null;
										f_doLeftClick(x,y,callback);
										},PAUSE_INTERVAL);
			return; 
	}
	
	//global_do_work=true;
	 

	 //get color from cnv7
	var canvas7 = document.getElementById("canvas0");
	var context7 = canvas7.getContext("2d");
	var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);

	var bgcolor = getColorArrayFromImageData(imgData7, x, y);
		
		
		
		
	
		
					init_dummy_fast_thread();
						
					global_dummy_fast_thread_arr2_all = [[x,y,1]];

					
					global_dummy_fast_thread_imgData =imgData7;// imgData9;
					
					global_dummy_fast_thread_in_cluster = [];
					global_dummy_fast_thread_border_cluster = [];
					
					global_dummy_fast_thread_color = bgcolor;
					global_removed_x_y_obj = {};
					global_dummy_fast_thread_first_x=x;
					global_dummy_fast_thread_first_y=y;
					
					
					//var arr = getSameColorNeighbors0( global_dummy_fast_thread_imgData, global_dummy_fast_thread_color, x, y, 1, 1 );
							
					//if(arr[0].length==0) { callback(); return; }
					global_fill_color=getRndColor();

				
							
					dummy_fast_thread (   function()   {
							
							var canvas7 = document.getElementById("canvas0");
							var context7 = canvas7.getContext("2d");
							
							context7.putImageData(imgData7,0,0);
							global_dummy_fast_thread_border_cluster.push([x,y]);
							post_bubabu(global_dummy_fast_thread_border_cluster,getWhiteSpaceColor());//global_fill_color); 
							refresh_map();
							global_do_work=false;
						
							callback();
										
										
					} );
		
		
		
}


function create_new_base( pswd, filename, folder_name, canvas, onsuccess, onerror  )
{
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', 'php/check_errors.php?folder_name='+folder_name+'&password='+pswd+'&filename='+filename);
	xhr2.onload = function ()
	{
		if (xhr2.status != 200) 
		{
			alert('mod_base:create_new_base(...): unknown error ' + xhr2.status + ': ' + xhr2.statusText);
			console.log('mod_base:create_new_base(...): unknown error ' + xhr2.status + ': ' + xhr2.statusText);
			if( onerror)  onerror();
		}
		else
		{
			if((""+xhr2.response).indexOf("check_errors.php:error:")!=-1)
			{
				alert(xhr2.response);
				console.log(xhr2.response);
			}
			else
			{
			
				var imageStr = canvas.toDataURL(); //  = "data:image/png...."
			
				var formData = new FormData();
	
				formData.append( "password", pswd );	
				formData.append( "folder_name", folder_name );
				formData.append( "filename", filename );
				formData.append( "img0", imageStr );
				
				// отослать
						
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "php/create_new_base.php");
				xhr.onload = function()
				{
							
					console.log("#4 " + xhr.response);
							
					if((""+xhr.response).indexOf("create_new_base.php::error")!=-1)
					{
						alert("was error on server");
						console.log('mod_base:create_new_base(...): unknown error ' + xhr.status + ': ' + xhr.statusText);
					}
					else
					{
					
						console.log("ok\n " + xhr.response);
						
						onsuccess(xhr.responseText);
							
					}
							
				}
				xhr.send(formData);
			}	
			
			
		}
	}
	
	xhr2.send();
	
	
}

function robot_home()
{
	avtomatik_move_to();
	f_samson();
	
}




function keys()
{
//if json not exist return
//else add keys as removed clusters and new base name
}
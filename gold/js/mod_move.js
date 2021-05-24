function left(ind,num)
{
	
	//move selected left
	var pts = clonePoints(global_table_of_clusters[ind].points);
	for(var j=0;j<pts.length;j++) 
	{	
		var new1=pts[j][0]-num;
		pts[j]=[new1,pts[j][1]];
	}
	global_table_of_clusters[ind].points=pts;	
								
}

function right(ind,num)
{
	var pts = clonePoints(global_table_of_clusters[ind].points);
	for(var j=0;j<pts.length;j++) 
	{	
		var new1=pts[j][0]+num;
		pts[j]=[new1,pts[j][1]];
	}
	global_table_of_clusters[ind].points=pts;	
}

function up(ind,num)
{
	var pts = clonePoints(global_table_of_clusters[ind].points);
	for(var j=0;j<pts.length;j++) 
	{	
		var new1=pts[j][1]-num;
		pts[j]=[pts[j][0],new1];
	}
	global_table_of_clusters[ind].points=pts;	
}

function down(ind,num)
{
	var pts = clonePoints(global_table_of_clusters[ind].points);
	for(var j=0;j<pts.length;j++) 
	{	
		var new1=pts[j][1]+num;
		pts[j]=[pts[j][0],new1];
	}
	global_table_of_clusters[ind].points=pts;	
}

function move()
{
	
	 show_move_dialog(function()
	 {
		 
		ddraw();
		redrawPixels_main(null, glob_x_left_top,glob_y_left_top);
		 
		 
	 });
}

function show_move_dialog(callback)
{
	simple_modal_window( 'move_dialog.html',   function(data) 
	{
		if(document.getElementById("modal_window_move_dialog")==null) 
		{
			var div = document.createElement("div");
			div.id = "modal_window_move_dialog";
			document.body.appendChild(div);
		}
			
		
		document.getElementById("modal_window_move_dialog").innerHTML = data;
		
		document.getElementById("modal_window_move_dialog_move").onclick = function() 
		{
			
			if(document.getElementById("modal_window_move_dialog_move"))
			{
				//get selected and move it
				
				
					while(last_point_array.length>0)
					{
						var e = last_point_array[0];
						var xy = getExactXY(last_point_array[0]);
						var x = xy[0];
						var y = xy[1];
								
						var sele0 = findClusterIndexByPoint([x,y]);
						if(sele0==null) return -1;	
						
						last_point_array.splice(0,1);
						var canvas1 = document.getElementById('move_'+x+'_'+y);
						if(canvas1!=null)
						{
							document.getElementById("moves").removeChild(canvas1);
						}
						
						ddraw();
						redrawPixels_main(null, x,y);
				
						var left1 = Number(document.getElementById("steps_to_left").value);	
									
						if(left1>0)
						{
							left(sele0,left1);
						}
						
						var right1 = Number(document.getElementById("steps_to_right").value);	
									
						if(right1>0)
						{
							right(sele0,right1);
						}
						
						var top1 = Number(document.getElementById("steps_to_top").value);	
									
						if(top1>0)
						{
							up(sele0,top1);
						}
						
						var down1 = Number(document.getElementById("steps_to_down").value);	
									
						if(down1>0)
						{
							down(sele0,down1);
						}
						

						
						
						
							
					}
					
					//close after moving
						if(document.getElementById("modal_window_move_dialog"))
								document.body.removeChild(document.getElementById("modal_window_move_dialog"));
							
							
					callback();		
								
			}					
		
		
		
		
		}
		
		
			document.getElementById("modal_window_move_dialog_close").onclick = function(){
				if(document.getElementById("modal_window_move_dialog"))
					document.body.removeChild(document.getElementById("modal_window_move_dialog"));
			}
		
		
	});
	
	
	
}
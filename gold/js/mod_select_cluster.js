function whenUserClickOnSelectClusterButton(e)
{
	//////////////////////////
	// update_table_of_zapret();
	//////////////////////////
	
	//if(global_ramka==true)
	//{
	//	setTimeout( function(e2){ return function(){whenUserClickOnCanvas(e2);}(e), 100 } );
	//	return;
	//}
			
	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;
	
	global_cell_size = Number( document.getElementById("cell_size").value );
	
	var n=global_cell_size;
	var nnn=0;
	var mmm=0;
	var nnn4 = x % n;
	if(nnn4==0) nnn=x/n; else nnn=(x-nnn4)/n;
	var mmm4 = y % n;
	if(mmm4==0) mmm=y/n; else mmm=(y-mmm4)/n;
	x=nnn*n;
	y=mmm*n;
		
		
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var _color = getColorArrayFromImageData(global_snake_image_data, x, y );
	
	return __whenUserClickOnSelectClusterButton(x,y);
	
}

var global_cluster_number = null;

function __whenUserClickOnSelectClusterButton(x,y)
{
	
	
	var clusters = findNotInUseClustersIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(clusters != null)
	{
		if(clusters.length!=0)
		{
			return __whenUserClickOnNotInUseClusterButton(clusters);
		}
	}
	
	return -77;
	
	
	var sele0 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(sele0==null) return -1;
	
	if( global_table_of_clusters[sele0].selected==false)
	{
		global_table_of_clusters[sele0].selected=true;
		post_bubabu(global_table_of_clusters[sele0].points,global_table_of_clusters[sele0].color);
		post_alpha_bubabu(global_table_of_clusters[sele0].points,global_table_of_clusters[sele0].color);
		return 1;
	}
	else{
		global_table_of_clusters[sele0].selected=false;
		post_bubabu(global_table_of_clusters[sele0].points,global_table_of_clusters[sele0].color);
		
		return 1;
		
	}
	
}





function __whenUserClickOnNotInUseClusterButton(clusters)
{
	
	
	console.log("clusters NOT in use: "+clusters);

	var max_points = 0;
	var max_index = -1;
	
		for(var i=0;i<clusters.length;i++)
		{
			
			var mp = global_table_of_clusters[clusters[i]].points.length;
			
			if(max_points<mp) 
			{
				max_points=mp; 
				max_index=i; 
			}
				
		}
		
	var colors = [global_table_of_clusters[clusters[max_index]].color];
		
	
	console.log("colors for clusters:"+colors);
	

	if(colors.length==0)
	{
		return -3;
	}
	
	
	
	
	/*
	
	var sele1 = null;
	sele1 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(sele1==null)
	{
		
		return -37;
	}
	
	global_table_of_clusters.splice(sele1,1);
	
	*/
	
	if(colors.length==1)
	{
		
		var color = colors[0];
						
						color[0]=Number(color[0]);
						color[1]=Number(color[1]);
						color[2]=Number(color[2]);
						color[3]=Number(color[3]);
						
						
						for(var i=0;i<clusters.length;i++)
						{
							if(includesColor([global_table_of_clusters[clusters[i]].color],color)==true)
							{
								global_table_of_clusters[clusters[i]].in_use=true;
								global_table_of_clusters[clusters[i]].selected=false;
								post_bubabu(global_table_of_clusters[clusters[i]].points,global_table_of_clusters[clusters[i]].color);//[255,255,0,255]
								
								
									
								
								
								
								
								
							}
							
						}
				return 1;		
		
	}
		return -127;
	if(colors.length>1)
	{
		
		
		showAbsoluteDivWith( "choose_one_colors_div.html","choose_one_color",  function(modal_window_id) 
		{
			
		//var list = document.getElementById(modal_window_id).childNodes;
			//var myNode = document.getElementById(modal_window_id);
			//while (myNode.firstChild) {
			//	myNode.removeChild(myNode.firstChild);
			//}		
			
				var div2 = document.getElementById("colors_div");
				
				for(var i=0;i<colors.length;i++)
				{
					var canvas=document.createElement("canvas");
					canvas.id="canvas_"+colors[i].join("_");
					canvas.width=100;
					canvas.height=100;
					var context = canvas.getContext("2d");
					context.fillStyle='rgba('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+',255)'; 
					context.fillRect(0,0,canvas.width, canvas.height);
					
					canvas.onclick = function()
					{
						var color = this.id.replace('canvas_','').split("_");
						
						color[0]=Number(color[0]);
						color[1]=Number(color[1]);
						color[2]=Number(color[2]);
						color[3]=Number(color[3]);
						
						document.body.removeChild(document.getElementById("modal_window_choose_one_color"));
						
						
						for(var i=0;i<clusters.length;i++)
						{
							if(includesColor([global_table_of_clusters[clusters[i]].color],color)==true)
							{
								global_table_of_clusters[clusters[i]].in_use=true;
								global_table_of_clusters[clusters[i]].selected=false;
								post_bubabu(global_table_of_clusters[clusters[i]].points,global_table_of_clusters[clusters[i]].color);//[255,255,0,255]
								
								
								
								
							}
							
						}
						
						return 1;
		
						
					}
					
					div2.appendChild(canvas);
				

						
		
		
		
		
				}
			
		});
			

		
		
	}
	
	
}

function whenUserClickOnJoinClusterButton(e)
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
	
	var sele = findSelectedClusterIndexes();
	if(sele==null) return;
	if(sele.length==0) return;
	if(sele.length==1) return;
	
		
		// var clusters = getNearClustersFor(sele[0]);
		// if(clusters==null) return;
		
		
		var colors = [];
		for(var i=0;i<sele.length;i++)
		{
			if(includesColor(colors, global_table_of_clusters[sele[i]].color)==true) continue;
			
			colors.push(JSON.parse(JSON.stringify(global_table_of_clusters[sele[i]].color)));
			
		}
		
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
						//alert(color);
						
						document.body.removeChild(document.getElementById("modal_window_choose_one_color"));
						var sele = findSelectedClusterIndexes();
						var all_points = [];
						for(var i=0;i<sele.length;i++)
						{
							var pts = JSON.parse(JSON.stringify(global_table_of_clusters[sele[i]].points));
							global_table_of_clusters[sele[i]].in_use=false;
							global_table_of_clusters[sele[i]].selected=false;
							for(var j=0;j<pts.length;j++) all_points.push([pts[j][0],pts[j][1]]);
							//r+=global_table_of_clusters[used_clusters[i]].color[0];
							//g+=global_table_of_clusters[used_clusters[i]].color[1];
							//b+=global_table_of_clusters[used_clusters[i]].color[2];
							//a+=255;
							//n++;
							//if(ilim<n) break;
						}
						
						var cluster = {};
						cluster.color = JSON.parse(JSON.stringify(color));// [r/n|0,g/n|0,b/n|0,a/n|0];
						cluster.points = JSON.parse(JSON.stringify(all_points));
						cluster.selected=false;
						cluster.in_use=true;	
						global_table_of_clusters.push(cluster);
						
						
							//cluster.color
							post_bubabu(global_table_of_clusters[global_table_of_clusters.length-1].points,color);//[255,255,0,255]
							
							sound();
						
									
						if(end_of_game()==true)
						{
							alert('Well done, commander!');
							global_in_game=false;
						}
						
											
						
						return;
						
						
						/**
						var colors = [color];
						for(var i=0;i<clusters.length;i++)
						{
							if(includesColor(colors, global_table_of_clusters[clusters[i]].color)==true) 
							{
								
								
								
							}
							
							colors.push(JSON.parse(JSON.stringify(global_table_of_clusters[clusters[i]].color)));
							
						}
						**/
						
						
						
						
						
						
						
					}
					
					div2.appendChild(canvas);
				

						
		
		
		
		
				}
			
		});
			

		
		
	
	

	
}
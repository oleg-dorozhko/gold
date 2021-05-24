function old_whenUserClickOnSplitClusterButton(e)
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
	
	var ind =findClusterIndexByPoint([x,y]);
	if(ind==null)
	{
		alert('not found cluster');
		return -4;
	}
	

	
	if(global_table_of_clusters[ind].zzz==null) return -1;
	if(global_table_of_clusters[ind].zzz.length==0) return -2;
		
	var sele = JSON.parse(JSON.stringify(global_table_of_clusters[ind].zzz));
	
	
	for(var i=0;i<sele.length;i++)
	{
		if(global_table_of_clusters[sele[i]]!=null)
		{
			global_table_of_clusters[sele[i]].in_use=true;
			global_table_of_clusters[sele[i]].selected=false;
			/**
			for(var n=0;n<global_table_of_clusters[sele[i]].points.length;n++)
			{
				var point = global_table_of_clusters[sele[i]].points[n];
				var pointIndex = getPointIndex(global_table_of_clusters[ind].points, point);
				if(pointIndex==null)
				{
					
				}
				else
				{
					global_table_of_clusters[ind].points.splice(pointIndex,1);
				}
			
			}
			**/
			
			//if(global_table_of_clusters[sele[i]].zzz==null) global_table_of_clusters[sele[i]].zzz=[];
			//if(includesValue(global_table_of_clusters[sele[i]].zzz, ind)==false) global_table_of_clusters[sele[i]].zzz.push(ind);
			post_bubabu(global_table_of_clusters[sele[i]].points,global_table_of_clusters[sele[i]].color);
		}
	}
	
	global_table_of_clusters[ind].in_use=false;
	global_table_of_clusters[ind].selected=false;
	//global_table_of_clusters.splice(ind,1);
	return 1;
	

	
}






function whenUserClickOnSplitClusterButton(e)
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
	return -10;
	return __whenUserClickOnSplitClusterButton(x,y);
	
}

var global_cluster_number = null;

function __whenUserClickOnSplitClusterButton(x,y)
{
	
	var clusters = findNotInUseClustersIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(clusters == null) return -1;
	
	if(clusters.length==0)
	{
		return -4;
	}
	
	//clusters = filterSplitAcceptedClusters( clusters, global_cluster_number );
		
	if(clusters.length==0)
	{
		return -5;
	}
	
	console.log("clusters NOT in use: "+clusters);

	
	var colors = [];
		//var colors = [JSON.parse(JSON.stringify(global_table_of_clusters[sele[0]].color))];
		for(var i=0;i<clusters.length;i++)
		{
			if(includesColor(colors, global_table_of_clusters[clusters[i]].color)==true) continue;
			//if(includesColor(colors, global_table_of_clusters[sele[0]].color)==true) continue;
			colors.push(JSON.parse(JSON.stringify(global_table_of_clusters[clusters[i]].color)));
			
		}
	/**
	**/
	
	console.log("colors for clusters:"+colors);
	

	if(colors.length==0)
	{
		return -3;
	}
	
	
	
	
	
	var sele1 = null;
	sele1 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();

	
	
	
	
	
	
	//if(sele.length==0) return;
	//if(sele.length==1) 
	
	//global_cluster_number = sele0;
	
	//var clusters = getNearClustersFor(global_cluster_number);
	//if(clusters==null) return;
	
	
	
	// setTimeout( function(){ drawClusters(JSON.parse(JSON.stringify(clusters)),'magenta',500, global_cell_size, global_cell_size); }, 10 );
	
	
	
	
	//post_bubabu(global_table_of_clusters[global_cluster_number].points,[255,255,255,255]);
							
						
	
	/**
	
	
	return 1;
	
		var sele = [];
		sele.push(sele0);
		var clusters = getNearClustersFor(sele[0]);
		if(clusters==null) return;
		clusters.push(sele[0]);
			
		//	setTimeout( function(){ drawClusters(JSON.parse(JSON.stringify(clusters)),'magenta',500, global_cell_size, global_cell_size); }, 10 );
		
		var colors = [];
		//var colors = [JSON.parse(JSON.stringify(global_table_of_clusters[sele[0]].color))];
		for(var i=0;i<clusters.length;i++)
		{
			if(includesColor(colors, global_table_of_clusters[clusters[i]].color)==true) continue;
			//if(includesColor(colors, global_table_of_clusters[sele[0]].color)==true) continue;
			colors.push(JSON.parse(JSON.stringify(global_table_of_clusters[clusters[i]].color)));
			
		}
		
		
		if(colors.length==2)
		{
			
			var color = [];
			color[0]=Number(colors[0][0]);
			color[1]=Number(colors[0][1]);
			color[2]=Number(colors[0][2]);
			color[3]=Number(colors[0][3]);
			
			
			//var sele = findSelectedClusterIndexes();
						
			//			var clusters = getNearClustersFor(sele[0]);
			//			if(clusters==null) return;
						
						var all_points = [];
						//var pts = JSON.parse(JSON.stringify(global_table_of_clusters[sele[0]].points));
						//for(var j=0;j<pts.length;j++) all_points.push([pts[j][0],pts[j][1]]);
						global_table_of_clusters[sele[0]].in_use=false;
						global_table_of_clusters[sele[0]].selected=false;
						//post_bubabu(global_table_of_clusters[sele[0]].points,global_table_of_clusters[sele[0]].color);
						
						
						//var colors = [color];
						for(var i=0;i<clusters.length;i++)
						{
							//if(includesColor(colors, global_table_of_clusters[clusters[i]].color)==true) 
							{
								var pts = JSON.parse(JSON.stringify(global_table_of_clusters[clusters[i]].points));
								global_table_of_clusters[clusters[i]].in_use=false;
								global_table_of_clusters[clusters[i]].selected=false;
								//post_bubabu(global_table_of_clusters[clusters[i]].points,global_table_of_clusters[clusters[i]].color);
								
								for(var j=0;j<pts.length;j++) all_points.push([pts[j][0],pts[j][1]]);
							}
								
							
							//colors.push(JSON.parse(JSON.stringify(global_table_of_clusters[clusters[i]].color)));
							
						}
						
						
						var cluster = {};
						cluster.color = JSON.parse(JSON.stringify(color));// [r/n|0,g/n|0,b/n|0,a/n|0];
						cluster.points = JSON.parse(JSON.stringify(all_points));

						
						if(cluster.zzz == null) cluster.zzz = [];
						
						for(var jjj=0;jjj<clusters.length;jjj++)
						{
							if(includesValue(cluster.zzz, clusters[jjj])==false) 
							{
								 cluster.zzz.push(clusters[jjj]);
							}
							else{
								//alert('error: zzz contain sele0');
								//return;
							}
						}
						
						cluster.selected=false;
						cluster.in_use=true;	
						global_table_of_clusters.push(cluster);
						
						//get_only_less8neighbors_points(cluster.color,cluster.points,global_cell_size,global_cell_size);
							//cluster.color
							post_bubabu(global_table_of_clusters[global_table_of_clusters.length-1].points,cluster.color);//[255,255,0,255]
							
						
						
								
						
						return 1;
			
			
			
		}
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
								
								
									if(sele1!=null){
		
		
								global_table_of_clusters[sele1].in_use=false;
								global_table_of_clusters[sele1].selected=false;
							
								
								
							}
	
								
								
								
								
								
							}
							
						}
				return 1;		
		
	}
	
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
								
								
								
									if(sele1!=null){
		
		
		global_table_of_clusters[sele1].in_use=false;
		global_table_of_clusters[sele1].selected=false;
	
		
		
	}
	
								
								
								
							}
							
						}
						
						return 1;
		
						
					}
					
					div2.appendChild(canvas);
				

						
		
		
		
		
				}
			
		});
			

		
		
	}
	
	
}

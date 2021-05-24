function findMaximumPointsFigure()
{
	var max_points=0;
	var max_index= -1;
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		
		if(global_table_of_clusters[i].in_use==false) continue;
		
		var mp = global_table_of_clusters[i].points.length;
		
		if( max_points < mp ) {
				max_points = mp;
				max_index = i;
		}
			
	}
	
	return max_index;
	
}

function matrix_move()
{
	

	
	global_cluster_number = findMaximumPointsFigure();
	
	__whenMatrixMove(global_cluster_number);
	
}


function __whenMatrixMove(global_cluster_number)
{
	
	
	
	var clusters = getNearClustersFor(global_cluster_number);
	if(clusters==null) return;
	
	console.log("clusters in use: "+clusters);
	if(clusters.length==0)
	{
		return -4;
	}
	
	// setTimeout( function(){ drawClusters(JSON.parse(JSON.stringify(clusters)),'magenta',500, global_cell_size, global_cell_size); }, 10 );
	
	var colors = [];
		//var colors = [JSON.parse(JSON.stringify(global_table_of_clusters[sele[0]].color))];
		for(var i=0;i<clusters.length;i++)
		{
			if(includesColor(colors, global_table_of_clusters[clusters[i]].color)==true) continue;
			//if(includesColor(colors, global_table_of_clusters[sele[0]].color)==true) continue;
			colors.push(cloneColor(global_table_of_clusters[clusters[i]].color));
			
		}
	/**
	**/
	
	console.log("colors for clusters:"+colors);
	
	if(colors.length==0)
	{
		return -3;
	}
	
	
	
	
	if(colors.length==1)
	{
		
		
		
		
		
		
		
		
		
						var color = colors[0];
						
						color[0]=Number(color[0]);
						color[1]=Number(color[1]);
						color[2]=Number(color[2]);
						color[3]=Number(color[3]);
						
						
						
						var cluster_0 = cloneCluster(global_table_of_clusters[global_cluster_number]);
						
						var indexes=[];
						for(var i=0;i<clusters.length;i++)
						{
							var index0 = clusters[i];
							if(includesColor([global_table_of_clusters[index0].color],color)==true)
							{
								if(includesValue(indexes, index0)==false) indexes.push(index0);
								
							}
						}
						
						for(var i=0;i<indexes.length;i++)
						{
						    
							var pts = global_table_of_clusters[indexes[i]].points;
						
								for(var j=0;j<pts.length;j++) 
								{	
							
								//	if(getPointIndex(cluster_0.points, pts[j])==null)
							
												cluster_0.points.push([pts[j][0],pts[j][1]]);
								}
								
								global_table_of_clusters[indexes[i]].in_use=false;
								global_table_of_clusters[indexes[i]].selected=false;
						
						}
						
						cluster_0.color = cloneColor(color);
						
						cluster_0.zzz = [];//[global_cluster_number];
						cluster_0.in_use=true;
						cluster_0.selected=false;
						global_table_of_clusters.push(cluster_0);
						
						post_bubabu(cluster_0.points,cluster_0.color);//[255,255,0,255]
						
		
		
		
						global_table_of_clusters[global_cluster_number].in_use=false;
						global_table_of_clusters[global_cluster_number].selected=false;
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		return 1;
	}
	

	
	else if(colors.length>1)
	{
		
		
	
						var color_index = getRandomInt(0,colors.length);
						var color = [];
						color[0]=Number(colors[color_index][0]);
						color[1]=Number(colors[color_index][1]);
						color[2]=Number(colors[color_index][2]);
						color[3]=Number(colors[color_index][3]);
						
						var cluster_0 = cloneCluster(global_table_of_clusters[global_cluster_number]);
						
						
						var indexes = [];
						for(var i=0;i<clusters.length;i++)
						{
							var index0 = clusters[i];
							if(includesColor([global_table_of_clusters[index0].color],color)==true)
							{
								if(includesValue(indexes, index0)==false) indexes.push(index0);
								
							}
						}
						
						for(var i=0;i<indexes.length;i++)
						{
						    
							var pts = global_table_of_clusters[indexes[i]].points;
						
								for(var j=0;j<pts.length;j++) 
								{	
							
								//	if(getPointIndex(cluster_0.points, pts[j])==null)
							
												cluster_0.points.push([pts[j][0],pts[j][1]]);
								}
								
								
								global_table_of_clusters[indexes[i]].in_use=false;
								global_table_of_clusters[indexes[i]].selected=false;
						
						
						}
						
						
						cluster_0.color = cloneColor(color);
						
						cluster_0.zzz = [];//[global_cluster_number];
						cluster_0.in_use=true;
						cluster_0.selected=false;
						
						
						post_bubabu(cluster_0.points,cluster_0.color);//[255,255,0,255]
						
						global_table_of_clusters.push(cluster_0); //nikomu ne skazhem cho tut takoe
						
						global_table_of_clusters[global_cluster_number].in_use=false;
						global_table_of_clusters[global_cluster_number].selected=false;
							
				
						
		
		
		
		return 1;
			
			
	}
			

		
	return -12;
	
	
	
}

function whenUserClickOnReturnClusterButton(e)
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
	
	return __whenUserClickOnReturnClusterButton(x,y);
	
}

var global_cluster_number = null;

function __whenUserClickOnReturnClusterButton(x,y)
{
	var sele0 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(sele0==null) return -1;
	
	global_cluster_number = sele0;
	
	
	
	if(global_ordered=='ordered')
	{
		
		var p1 = global_table_of_clusters[global_cluster_number].points.length;
	
		var max_points=0;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(max_points<mp) 
								max_points=mp;
				
		}
	
		var min_points=max_points;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(min_points>mp) 
								min_points=mp;
				
		}
		
		if(p1>min_points)
		{
			
			
			return -161;
			
		}
	
	}
	
	
	
	
	
	var clusters = getNearClustersFor(global_cluster_number);
	if(clusters==null) return;
	

	
	
	/*
	
	console.log("clusters in use: "+clusters);
	if(clusters.length==0)
	{
		alert("The end");
		return -4;
	}
	*/
	
	global_table_of_clusters[global_cluster_number].in_use--;
	draw();
	return 1;
}

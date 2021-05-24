function drawClusters(clusters,strColor,ms, dx, dy)
{
	if(clusters.length>0)
	{
		var i = clusters[0];
		var points = global_table_of_clusters[i].points;
		
		for(var i=0;i<points.length;i++)
		{
			var canvas2 = document.getElementById("canvas0");
			var context2 = canvas2.getContext("2d");
			context2.fillStyle = strColor; //'rgba('+(255-color[0])+','+(255-color[1])+','+(255-color[2])+',1)'; 
			var p = points[i];
			context2.fillRect( p[0], p[1], dx, dy );
													
		}
		
		clusters.splice(0,1);
		
		setTimeout( function(){ drawClusters(clusters,strColor,ms, dx, dy); }, ms );
	}
}

function drawCenter(x,y)
{
	var arr = getAllMiddleOfColorOfPoint(x,y);
	post_bubabu(arr[1],[255,0,0,255]); 	
}

function getColorsAroundCluster(cluster_num)
{
	
	var arr = dummy_fast_pro(global_table_of_clusters[cluster_num].points[0][0],global_table_of_clusters[cluster_num].points[0][1]);
	
	var colors = [];
	var clusters = [];
	var _clusters = [];
	
	for(var i=0;i<arr[2].length;i++)
	{
		var sele0 = findClusterIndexByPoint(arr[2][i]);//findSelectedClusterIndexes();
		if(sele0==null) return -1;
		
		if(includesValue(clusters,sele0)==false) clusters.push(sele0);
		
		
	}
		for(var i=0;i<clusters.length;i++)
		{
			var ind = getColorIndex(colors,global_table_of_clusters[clusters[i]].color);
			if(ind == null)
			{
				colors.push(global_table_of_clusters[clusters[i]].color);
				_clusters.push([clusters[i]]);
			}
			else
			{
				_clusters[ind].push(clusters[i]);
			}
		}
		var obj_arr =[];
		for(var i=0;i<_clusters.length;i++)
		{
			var obj = {};
			obj.color=cloneColor(colors[i]);
			obj.clusters=cloneZZZ(_clusters[i]);
			obj.mp=raschet_mp(_clusters[i]);//global_table_of_clusters[b].points.length
			obj_arr.push(obj);
		}
		
		for(var i=0;i<obj_arr.length;i++)
		{
			var arr = obj_arr[i].clusters;
			arr.sort(function(a,b){
			
				return global_table_of_clusters[b].points.length - global_table_of_clusters[a].points.length;
			
			});
			obj_arr[i].clusters=cloneZZZ(arr);
		}
		
		obj_arr.sort(function(a,b){
			
			return b.mp - a.mp;
			
		});
		
		
		
	return obj_arr;
}

function raschet_mp(zzz)
{
	var mp=0;
	for(var i=0;i<zzz.length;i++) mp += global_table_of_clusters[zzz[i]].points.length;
	return mp;
}

function drawBorder(cluster_num)
{
	
	
	var arr = dummy_fast(global_table_of_clusters[cluster_num].points[0][0],global_table_of_clusters[cluster_num].points[0][1]);
	
	var points=[];
	for(var i=0;i<arr[1].length;i++)
	{
		if(getPointIndex( global_table_of_clusters[cluster_num].points, arr[1][i])==null) continue;
		points.push( arr[1][i]);
	}
	
	post_bubabu(points,[255,0,0,255]); 
	
	/**
	
	var kromka = getBorderPointsFrom(global_table_of_clusters[cluster_num].points,
	global_table_of_clusters[cluster_num].color,
	global_cell_size, global_cell_size
	
	);
	
		var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
				var y1=kromka[i][1];
				points.push([x1,y1])
			}
	
	
	
	post_bubabu(points,[255,0,0,255]); 
	
	**/
	
	
	
	
	
	
	
	
	
	
	/*
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var imgData2 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	
	var color = global_table_of_clusters[cluster_num].color;//getColorArrayFromImageData(imgData2, x, y);
	var points = global_table_of_clusters[cluster_num].points;
	var result_points=[];
	
	for(var i=0;i<points.length;i++)
	{
		var x1=points[i][0];
		var y1=points[i][1];
		
		var arr =  getSameColorNeighborsPro( imgData2, color, x1,y1, global_cell_size, global_cell_size );
		if(arr[1].length>0)
		{
			for(var j=0;j<arr[1].length;j++)
			{
				var point = [ x1, y1 ];
			
				if( getPointIndex(result_points, point)==null) result_points.push( point );
			}
		}
	
		
	}
	
		
	post_bubabu(result_points,[255,0,0,255]); 
				
	//var arr = dummy_fast(global_table_of_clusters[cluster_num].points[0][0],global_table_of_clusters[cluster_num].points[0][1]);
	/*	
	
	var pts = global_table_of_clusters[cluster_num].points;
	var arr2=[];					
	for(var j=0;j<pts.length;j++) 
	{	
		arr2.push([pts[j][0],pts[j][1]]); 
		
	}
	
	for(var i=0;i<arr[1].length;i++)
	{
		arr2.push([arr[1][i][0],arr[1][i][1]]); 
	}
			
	
	global_table_of_clusters[cluster_num].points=arr2;
			
	
	/*
	var kromka = getBorderPointsFrom(global_table_of_clusters[cluster_num].points,
	global_table_of_clusters[cluster_num].color,
	global_cell_size, global_cell_size
	
	);
	
		var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
				var y1=kromka[i][1];
				points.push([x1,y1])
			}
	*/		
	
	//var arr = dummy_fast(x,y);
	//if(arr[1].length>1)	post_bubabu(arr[1],[255,0,0,255]); 
				
		
}

function getBorderPointsFromFast(num,points)
{
	var result_points=[];
	
	for(var i=0;i<points.length;i++)
	{
		var x1=points[i][0];
		var y1=points[i][1];
		
		
		
		var arr = getSameIndexNeighborsPro(num, x1, y1, global_cell_size, global_cell_size);
		if(arr[1].length>0)
		{
			for(var j=0;j<arr[1].length;j++)
			{
				result_points.push([arr[1][j][0],arr[1][j][1],arr[1][j][2]]);
			}
		}
	
		
	}
	return result_points;
}

function redrawAllAround(num)
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	
	var kromka = getBorderPointsFromFast(num,global_table_of_clusters[num].points);
	for(var i=0;i<kromka.length;i++)
	{
		
			//context2.fillStyle = strColor; //'rgba('+(255-color[0])+','+(255-color[1])+','+(255-color[2])+',1)'; 
			var color = [255,255,255,255];
			if(global_table_of_clusters[kromka[i][2]].in_use==true)  color=global_table_of_clusters[kromka[i][2]].color;
			context2.fillStyle = 'rgba('+color[0]+','+color[1]+','+color[2]+','+(color[3]/255)+')'; 
			context2.fillRect( kromka[i][0], kromka[i][1], global_cell_size, global_cell_size );
	}
}

function ddraw()
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	context2.fillStyle = 'white'; 
	context2.fillRect( 0,0, canvas2.width,canvas2.height );
	
	var level = get_current_level();
	//sort bigger first
	
	var unsorted=[];
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			
			if( global_table_of_clusters[i].in_use==level)
			{
				unsorted.push(i);
				
			}
			
		}
		
		if(global_sort_direction=='decrease')
	{
		unsorted.sort(function(a,b) //sort bigger first
		{
			return global_table_of_clusters[b].points.length - global_table_of_clusters[a].points.length;
			
			
		});
		
	}
	else if(global_sort_direction=='increase')
	{
			unsorted.sort(function(a,b) //sort bigger first
		{
			return global_table_of_clusters[a].points.length - global_table_of_clusters[b].points.length;
			
			
		});
	}	
		
		for(var i=0;i<unsorted.length;i++)
		{
			post_bubabu(global_table_of_clusters[unsorted[i]].points,global_table_of_clusters[unsorted[i]].color);
		}
	
		
}
	
function draw()
{
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	context2.fillStyle = 'white'; 
	context2.fillRect( 0,0, canvas2.width,canvas2.height );
	var unsorted=[];
	var levels=get_levels_for_d_array();
	for(var j=0;j<levels.length;j++)
	{
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			
			if( global_table_of_clusters[i].in_use==levels[j])
			{
				unsorted.push(i);
				
			}
			
		}
	}
	if(global_sort_direction=='decrease')
	{
	unsorted.sort(function(a,b) //sort bigger first
		{
			return global_table_of_clusters[b].points.length - global_table_of_clusters[a].points.length;
			
			
		});
	}
	else if(global_sort_direction=='increase')
	{
			unsorted.sort(function(a,b) //sort bigger first
		{
			return global_table_of_clusters[a].points.length - global_table_of_clusters[b].points.length;
			
			
		});
	}
		for(var i=0;i<unsorted.length;i++)
		{
			post_bubabu(global_table_of_clusters[unsorted[i]].points,global_table_of_clusters[unsorted[i]].color);
		}
		
}
	
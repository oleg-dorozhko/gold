
function help()
{
	//
	//miceliumDrawAllInnersByColor(0, [255,0,127,255]);
	//ordinaryDrawAllInnersByColor(0, [255,0,127,255]);
	//drawAllBorders(0);
	//drawMinBorderFromAllBorders();
	drawMinVolumeFromAllVolumes();
}
	function drawMinBorderFromAllBorders()
	{
		var arr_of_points=[];
		var max = 0;
		var max_index=0;
		for(var j=0;j<global_table_of_clusters.length;j++)
		{
			if(global_table_of_clusters[j]==null) continue;
			
			if(global_table_of_clusters[j].in_use==false) continue;
			
			var kromka = getBorderPointsFrom(global_table_of_clusters[j].points,
			global_table_of_clusters[j].color,
			global_cell_size, global_cell_size
			);
			
			var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
		var y1=kromka[i][1];
				points.push([x1,y1])
			}
			if(points.length > max) 
			{
				max=points.length;
				max_index=j;
			}
			
			arr_of_points.push([j,points,kromka]);
			//post_bubabu(points,[0,0,0,255]); 
		}
		
		var min=max;
		var min_index=max_index;
		for(var i=0;i<arr_of_points.length;i++)
		{
			
			if(arr_of_points[i][1].length < min) 
			{
				min=arr_of_points[i][1].length;
				min_index=i;
			}
		}
		post_bubabu(arr_of_points[min_index][1],[255,0,0,255]); 
		
		setTimeout(function(arr_of_points,min_index)
		{
			
			return function(){
				
				//var j = arr_of_points[min_index][0];
				//post_bubabu(arr_of_points[min_index][2],[255,255,255,255]);//global_table_of_clusters[j].color);
				
				var kromka = arr_of_points[min_index][2];
				
				var canvas2 = document.getElementById("canvas0");
				var context2 = canvas2.getContext("2d");	
				
				//var n=0;
				for(var j=0;j<kromka.length;j++)
				{
					var x=kromka[j][0];
					var y=kromka[j][1];
					var color = kromka[j][2];	
						
						context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
						context2.fillRect(x,y,global_cell_size, global_cell_size);
							
				//n++;
				//if(n>200) break;
				}

				
				
				
				
				
			}
			
		}(arr_of_points,min_index),1000);
	}
	


	function getMinBorderIndexFromAllBorders()
	{
		var arr_of_points=[];
		var max = 0;
		var max_index=0;
		for(var j=0;j<global_table_of_clusters.length;j++)
		{
			if(global_table_of_clusters[j]==null) continue;
			
			if(global_table_of_clusters[j].in_use==false) continue;
			
			var kromka = getBorderPointsFrom(global_table_of_clusters[j].points,
			global_table_of_clusters[j].color,
			global_cell_size, global_cell_size
			);
			
			var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
		var y1=kromka[i][1];
				points.push([x1,y1])
			}
			if(points.length > max) 
			{
				max=points.length;
				max_index=j;
			}
			
			arr_of_points.push([j,points,kromka]);
			//post_bubabu(points,[0,0,0,255]); 
		}
		
		var min=max;
		var min_index=max_index;
		for(var i=0;i<arr_of_points.length;i++)
		{
			
			if(arr_of_points[i][1].length < min) 
			{
				min=arr_of_points[i][1].length;
				min_index=i;
			}
		}
		
		return arr_of_points[min_index][2];
		
		//post_bubabu(arr_of_points[min_index][1],[0,0,0,255]); 
		/*
		setTimeout(function(arr_of_points,min_index)
		{
			
			return function(){
				
				//var j = arr_of_points[min_index][0];
				//post_bubabu(arr_of_points[min_index][2],[255,255,255,255]);//global_table_of_clusters[j].color);
				
				var kromka = arr_of_points[min_index][2];
				
				var canvas2 = document.getElementById("canvas0");
				var context2 = canvas2.getContext("2d");	
				
				//var n=0;
				for(var j=0;j<kromka.length;j++)
				{
					var x=kromka[j][0];
					var y=kromka[j][1];
					var color = kromka[j][2];	
						
						context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
						context2.fillRect(x,y,global_cell_size, global_cell_size);
							
				//n++;
				//if(n>200) break;
				}

				
				
				
				
				
			}
			
		}(arr_of_points,min_index),3000);
		*/
	}
	

	
	
	
	
	
	
	
	function drawAllBorders(borders_j)
	{
		
		if(borders_j==global_table_of_clusters.length) return;
		
		
		var arr_of_points=[];
		var max = 0;
		var max_index=0;
		for(var j=0;j<global_table_of_clusters.length;j++)
		{
			j=borders_j;
			if(global_table_of_clusters[j]==null) continue;
			
			if(global_table_of_clusters[j].in_use==false) continue;
			
			var kromka = getBorderPointsFrom(global_table_of_clusters[j].points,
			global_table_of_clusters[j].color,
			global_cell_size, global_cell_size
			);
			
			var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
		var y1=kromka[i][1];
				points.push([x1,y1])
			}
			var min_index=0;
			arr_of_points.push([j,points,kromka]);
			
				post_bubabu(points,[255,255,255,255]); 
			
			
			
			setTimeout(function(arr_of_points,min_index)
		{
			
			return function(){
				
				//var j = arr_of_points[min_index][0];
				//post_bubabu(arr_of_points[min_index][2],[255,255,255,255]);//global_table_of_clusters[j].color);
				
				var kromka = arr_of_points[min_index][2];
				
				var canvas2 = document.getElementById("canvas0");
				var context2 = canvas2.getContext("2d");	
				
				//var n=0;
				for(var j=0;j<kromka.length;j++)
				{
					var x=kromka[j][0];
					var y=kromka[j][1];
					var color = kromka[j][2];	
						
						context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
						context2.fillRect(x,y,global_cell_size, global_cell_size);
							
				//n++;
				//if(n>200) break;
				}

				
				setTimeout( function(borders_j){
					
					return function(){drawAllBorders(borders_j)};
					
				}(borders_j+1), 5000);
				
				
				
			}
			
		}(arr_of_points,min_index),3000);
			
			
			
			
			break;
			
			
			
		}
		
	
	}
	
	
	
	
	
	
	
	
	//[255,255,255,255]
	function drawAllInnersByColor(borders_j, color)
	{
		
		if(borders_j==global_table_of_clusters.length) return;
		
		
		var arr_of_points=[];
		var max = 0;
		var max_index=0;
		for(var j=0;j<global_table_of_clusters.length;j++)
		{
			j=borders_j;
			if(global_table_of_clusters[j]==null) continue;
			
			if(global_table_of_clusters[j].in_use==false) continue;
			
			var kromka = getBorderPointsFrom(global_table_of_clusters[j].points,
			global_table_of_clusters[j].color,
			global_cell_size, global_cell_size
			);
			
			var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
		var y1=kromka[i][1];
				points.push([x1,y1])
			}
			var min_index=0;
			arr_of_points.push([j,points,kromka]);
			
				post_bubabu(points,color); 
			var color1 = global_table_of_clusters[j].color;
			
			
			setTimeout(function(points,color1)
		{
			
			return function(){
				
					post_bubabu(points,color1); 
				
				setTimeout( function(borders_j){
					
					return function(){drawAllInnersByColor(borders_j, color)};
					
				}(borders_j+1,color), 500);
				
				
				
			}
			
		}(points,color1),300);
			
			
			
			
			break;
			
			
			
		}
		
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//[255,255,255,255]
	function ordinaryDrawAllInnersByColor(borders_j, color)
	{
		
		if(borders_j==global_table_of_clusters.length) return;
		
		
		var arr_of_points=[];
		var max = 0;
		var max_index=0;
		for(var j=0;j<global_table_of_clusters.length;j++)
		{
			j=borders_j;
			if(global_table_of_clusters[j]==null) continue;
			
			if(global_table_of_clusters[j].in_use==false) continue;
			
			var kromka = getBorderPointsFrom(global_table_of_clusters[j].points,
			global_table_of_clusters[j].color,
			global_cell_size, global_cell_size
			);
			
			var points=[];
			for(var i=0;i<kromka.length;i++)
			{var x1=kromka[i][0];
		var y1=kromka[i][1];
				points.push([x1,y1])
			}
			var min_index=0;
			arr_of_points.push([j,points,kromka]);
			///////////////////////////////////////
			//	post_bubabu(points,color); 
			post_bubabu(global_table_of_clusters[j].points,color);
			////////////////////////////////
			var color1 = global_table_of_clusters[j].color;
			
			
			setTimeout(function(points,color1)
		{
			
			return function(){
				
					post_bubabu(points,color1); 
				
				setTimeout( function(borders_j,color){
					
					return function(){ordinaryDrawAllInnersByColor(borders_j, color)};
					
				}(borders_j+1,color), 500);
				
				
				
			}
			
		}(global_table_of_clusters[j].points,color1),300);
			
			
			
			
			break;
			
			
			
		}
		
	
	}
	
	
	
	
	
	
	
	
	
	function drawMinVolumeFromAllVolumes()
	{
	
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
		var min_index= -1;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(min_points>mp) 
			{
								min_points=mp;
								min_index=i;
			}
				
		}
		
		
			var kromka = getBorderPointsFrom(global_table_of_clusters[min_index].points,
			global_table_of_clusters[min_index].color,
			global_cell_size, global_cell_size
			);
			
		
		var points=[];
		
		for(var i=0;i<kromka.length;i++)
		{
			
			var x1=kromka[i][0];
			var y1=kromka[i][1];
			
			points.push([x1,y1]);
			
		}
			
		
		
		
		post_bubabu( points, [255,0,0,255] ); 
		
		setTimeout( function( kromka, points )
		{
			
			return function(){
				
				
				
				
				var canvas2 = document.getElementById("canvas0");
				var context2 = canvas2.getContext("2d");	
				
				
				for(var j=0;j<kromka.length;j++)
				{
					var x=kromka[j][0];
					var y=kromka[j][1];
					var color = kromka[j][2];	
						
						context2.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]/255+')'; 
						context2.fillRect(x,y,global_cell_size, global_cell_size);
							
				
				}

				for(var j=0;j<global_table_of_clusters.length;j++)
				{
					if(global_table_of_clusters[j]==null) continue;
					
					if(global_table_of_clusters[j].in_use==true) continue;
					
					
					post_bubabu(global_table_of_clusters[j].points,[255,255,255,255]); 
				}
				
				
				
				
			}
			
		}(kromka, points),1000);
	}
	
	
	

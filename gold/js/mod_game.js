function get_array_of_one_color_all_points(im0,color,dx,dy)
{
var w = im0.width;
	
	var h = im0.height;
	var n=0;
	var arr = [];

			for (var y = 0; y < h; y+=dy) {
		

			for (var x = 0; x < w; x+=dx) {
				
				var i =(w * y + x) << 2;
					var col = [im0.data[i], im0.data[i+1],im0.data[i+2],im0.data[i+3]]; 
					if(
				(col[0] == color[0] )&&
				(col[1] == color[1] )&&
				(col[2] == color[2] )&&
				(col[3] == color[3] )				)
					
					arr.push([x,y]);
					
				//	n++;
					
					
				}
			}
			
			return arr;	
			
}		
			
			
function get_array_of_all_colors_all_points(im0,dx,dy)
{
	
	var w = im0.width;
	
	var h = im0.height;
	
	var lim = w*h*4;
	
	var arr2 = [];

			for (var i = 0; i < lim; i+=4) {
		

			
					
					var col = [im0.data[i], im0.data[i+1],im0.data[i+2],im0.data[i+3]]; 
						
					arr2.push(col); 
									
					
					
					
					
				
			}
			
	
	var n=0;
	var arr = [];

			for (var y = 0; y < h; y+=dy) {
		

			for (var x = 0; x < w; x+=dx) {
				
				var i =(w * y + x) << 2;
					var col = [im0.data[i], im0.data[i+1],im0.data[i+2],im0.data[i+3]]; 
					
					arr.push([x,y,col]);
					
				//	n++;
					
					
				}
			}
			
		
			
			return arr;	
			
		
}

function get_array_of_all_colors_all_points_thread2( im0, w, h, dx, dy, arr2, onsuccess )
{
	var n=0;
	for (var y = 0; y < h; y+=dy) 
	{
		for (var x = 0; x < w; x+=dx) 
		{
			var idx =(w * y + x) << 2;
			
			var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
				
			arr2.push([x,y,col]);
			n++;
		}
		
		setTimeout( show_progress, 200+n );
	}
	
	onsuccess(arr2);
}

function get_array_of_all_colors_all_points_thread( im0, w, h, lim, n, arr2, onsuccess )
{
	if(n<lim)
	{
		var col = [im0.data[n], im0.data[n+1],im0.data[n+2],im0.data[n+3]];
		var y = n/w|0;
		var x =	n%w;
		arr2.push([x,y,col]);
		n+=4;
		
		setTimeout( function() { 
		
					get_array_of_all_colors_all_points_thread( im0, w, h, lim, n, arr2, onsuccess );
									
								}, 1);
		
	}
	else
	{
		onsuccess(arr2);
	}
}
function get_array_of_colors(im0)
{
	
	
	
	var w = im0.width;
	var h = im0.height;
	
			var obj = {};
			var arr = [];

			for (var y = 0; y < h; y++) {
		

			for (var x = 0; x < w; x++) {
				
					
					var idx = (w * y + x) << 2;
					
					var key = ""+im0.data[idx]+"-"+im0.data[idx+1]+"-"+im0.data[idx+2]+"-"+im0.data[idx+3];
					
					if (obj[key]==undefined) { 
					
						
						var col = [im0.data[idx], im0.data[idx+1],im0.data[idx+2],im0.data[idx+3]]; 
						arr.push(col); 
						obj[key]= {cnt:1,arr:col};
					
					}
					else
					{
						var obj4 = {cnt:obj[key].cnt+1,arr:obj[key].arr};
						obj[key] = obj4;
					}
					
					
					
					
					
				}
			}
			
		
			
			return arr;
}

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function in_global_table_of_zapret(index)
{

	for(var i=0; i<global_table_of_zapret.length;i++)
	{
		var obj = global_table_of_zapret[i];
		if(obj.index==index)	return JSON.parse(JSON.stringify(obj.zzz));
	}
	
	return null;
	
	
}

function remove_zapret(ind)
{
	for(var i=0; i<global_table_of_zapret.length;i++)
	{
		var obj = global_table_of_zapret[i];
		for(var j=0;j<obj.zzz.length;j++)
		{
			if(obj.zzz[j]==ind) { obj.zzz.splice(j,1); remove_zapret(ind); }
		}
		
	}
}

function update_table_of_zapret()
{
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	var im = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var colors = get_array_of_colors(im);
		
			
	for(var i=0; i<global_table_of_zapret.length;i++)
	{
		var obj = global_table_of_zapret[i];
				

		for(var n=0;n<obj.zzz.length;n++)
		{
			
			var zapret_color = obj.zzz[n];
	
			var found=false;
			
			for(var j=0;j<colors.length;j++)
			{
				
				
				if(
				zapret_color[0] == colors[j][0] &&
				zapret_color[1] == colors[j][1] &&
				zapret_color[2] == colors[j][2] &&
				zapret_color[3]== colors[j][3]
				
				) {found=true;break;}
				
			}
			
			if(found==false) 
			{
				
				obj.zzz.splice(n,1);
							
			}	
			
			
		}
		
		

		
	}
	
	
}

function fill_table_of_zapret_old(colors)
{
	var toz = [];
	
	for (var i = 0; i < colors.length; i++) {
		var obj = {};
		obj.color = JSON.parse(JSON.stringify(colors[i]));	
		obj.zzz = [];
		var n = getRandomInt(0, 6);
		for(var j=0;j<n;j++)
		{
			var zap = getRandomInt(0, colors.length);
			obj.zzz.push(JSON.parse(JSON.stringify(colors[zap])));
		}
		toz.push(obj);
	}
	return toz;
}


function fill_table_of_zapret_lvl_0()
{
	
	global_table_of_zapret = [];
	
	var lim = global_table_of_clusters.length/3|0;
	
	var n=0;
		
	while(true)
	{
					
		var index = getRandomInt(0, global_table_of_clusters.length);
		
		if( in_global_table_of_zapret(index) == null )
		{
			var obj = {};
			obj.index = index;
			obj.zzz = [];
			global_table_of_zapret.push(obj);
			
			n++;	
			if(n==lim) break;
		}
				
				
	}
	
}



function fill_table_of_zapret_lvl_1()
{
	
	var temporary_global_table_of_zapret = [];  //JSON.parse(JSON.stringify(global_table_of_zapret));
			
	var n = 0;
	
	var lim = (global_table_of_clusters.length/3|0);
		
	while(true)
	{
					
		var index = getRandomInt(0, global_table_of_clusters.length);
		
		if( in_global_table_of_zapret(index) == null )
		{
			var obj = {};
			obj.index = index;
			obj.zzz = [];
			temporary_global_table_of_zapret.push(obj);
			
			n++;	
			if(n==lim) break;		
		}
				
		
	}
	
	
	
	for (var i = 0; i < temporary_global_table_of_zapret.length; i++) 
	{
		var obj0 = global_table_of_zapret[i];
		var obj1 = temporary_global_table_of_zapret[i];
			
		var obj2 = {};
		obj2.index = obj1.index;
		obj2.zzz = [obj0.index];
		
		temporary_global_table_of_zapret[i] = obj2;
		
	}
	
	for (var i = 0; i < global_table_of_zapret.length; i++) 
	{
		var obj0 = global_table_of_zapret[i];
			
		var obj2 = {};
		obj2.index = obj0.index;
		obj2.zzz = [];
		
		temporary_global_table_of_zapret.push(obj2);
		
	}
	
	global_table_of_zapret=JSON.parse(JSON.stringify(temporary_global_table_of_zapret));
	
	
}



function fill_table_of_zapret_lvl_2()
{
	
	var temporary_global_table_of_zapret = [];  //JSON.parse(JSON.stringify(global_table_of_zapret));
			
	var n = 0;
	
	var lim = (global_table_of_clusters.length/3|0);
		
	while(true)
	{
					
		var index = getRandomInt(0, global_table_of_clusters.length);
		
		if( in_global_table_of_zapret(index) == null )
		{
			var obj = {};
			obj.index = index;
			obj.zzz = [];
			temporary_global_table_of_zapret.push(obj);
			
			n++;	
			if(n==lim) break;		
		}
				
		
	}
	var n=0;
	for (var i = 0; i < global_table_of_zapret.length; i++) 
	{
		var obj0 = global_table_of_zapret[i];
		if(obj0.zzz.length>0)
		{
			var obj1 = temporary_global_table_of_zapret[n];
				
			var obj2 = {};
			obj2.index = obj1.index;
			obj2.zzz = [obj0.index];
			
			temporary_global_table_of_zapret[n] = obj2;
			
			n++;
		}
		
	}
	
	/***
	for (var i = 0; i < temporary_global_table_of_zapret.length; i++) 
	{
		var obj0 = global_table_of_zapret[i];
		var obj1 = temporary_global_table_of_zapret[i];
			
		var obj2 = {};
		obj2.index = obj1.index;
		obj2.zzz = [obj0.index];
		
		temporary_global_table_of_zapret[i] = obj2;
		
	}
	***/
	
	for (var i = 0; i < global_table_of_zapret.length; i++) 
	{
		var obj0 = global_table_of_zapret[i];
			
		var obj2 = {};
		obj2.index = obj0.index;
		obj2.zzz =  JSON.parse(JSON.stringify(obj0.zzz));
		
		temporary_global_table_of_zapret.push(obj2);
		
	}
	
	global_table_of_zapret=JSON.parse(JSON.stringify(temporary_global_table_of_zapret));
	
	
}


function fill_table_of_zapret()
{
	global_table_of_zapret = [];
	
	fill_table_of_zapret_lvl_0();
	
	fill_table_of_zapret_lvl_1();
	
	fill_table_of_zapret_lvl_2();
	
}

function findNotInUseClustersIndexByPoint(point)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	var clusters =[];
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i]==null) continue;
		
		if(global_table_of_clusters[i].in_use==global_level) continue;
		
		var points = global_table_of_clusters[i].points;
		
		for(var j=0;j<points.length;j++)
		{
			
			if(( points[j][0] == point[0]) && (points[j][1] == point[1] )) 
			{
				if(includesValue(clusters,i)==false)  clusters.push(i);
			}
			
		}
	}
	
	return clusters;
	
}

function findClusterIndexByPoint(point)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		
		if(global_table_of_clusters[i]==null) continue;
		if(global_table_of_clusters[i].in_use!=global_level) continue;
		
		var points = global_table_of_clusters[i].points;
		
		for(var j=0;j<points.length;j++)
		{
			
			if(( points[j][0] == point[0]) && (points[j][1] == point[1] )) return i;
			
		}
	}
	
	return null;
	
}




function findAllInnerClustersIndexByPoint(point)
{
	
	
	
	var all_inner_clusters=[];	
		
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			
			
			var points = global_table_of_clusters[i].points;
			
			for(var j=0;j<points.length;j++)
			{
				
				if(( points[j][0] == point[0]) && (points[j][1] == point[1] )) 
				{
					if(includesValue(all_inner_clusters,i)==false) all_inner_clusters.push(i);
				}
					
				
			}
		}
		
		return all_inner_clusters;
		
		/*
		var max_points=0;
		var max_index=0;
		for(var i=0;i<all_inner_clusters.length;i++)
		{
			
			
			var mp = global_table_of_clusters[all_inner_clusters[i]].points.length;
			
			if(max_points<mp) {max_points=mp;max_index=i;}
				
		}
		
		
		
		
	
		[max_index];
		*/
	
}


























function get_clusters_for_points(points)
{
	var clusters = [];
	for(var i=0;i<points.length;i++)
	{
		var ind = findClusterIndexByPoint(points[i]);
		if(includesValue(clusters, ind)==false) clusters.push(ind);
	}
	return clusters;
}

function getNearClustersFor(ind0)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	if(global_table_of_clusters[ind0]==null) return null;
	
	var color = global_table_of_clusters[ind0].color;
	var points = global_table_of_clusters[ind0].points;
	
	//now we get okruzhauschie clusters
	var points2 = get_near_non_color_points(color,points,global_cell_size,global_cell_size);
	
	var ind_arr=[];
	for(var j=0;j<points2.length;j++)
	{	
		var ind = findClusterIndexByPoint(points2[j]);
		if(ind0==ind) continue;
		if(ind==null) continue;
		if(global_table_of_clusters[ind].in_use!=global_level)  continue;
		
		var found=false;
		for(var jj=0;jj<ind_arr.length;jj++)
		{
			if(ind_arr[jj]==ind)
			{
				found=true;
				break;
			}
			
		}
		if(found==false)
		{
			ind_arr.push(ind);
		}

	}
	
	return 	ind_arr;
	
}


function getNearNotInUseClustersFor(ind)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	if(global_table_of_clusters[ind]==null) return null;
	
	var color = global_table_of_clusters[ind].color;
	var points = global_table_of_clusters[ind].points;
	
	//now we get okruzhauschie clusters
	var points2 = get_near_non_color_points(color,points,global_cell_size,global_cell_size);
	
	var ind_arr=[];
	for(var j=0;j<points2.length;j++)
	{	
		var ind = findClusterIndexByPoint(points2[j]);
		
		if(ind==null) continue;
		if(global_table_of_clusters[ind].in_use==global_level)  continue;
		
		var found=false;
		for(var jj=0;jj<ind_arr.length;jj++)
		{
			if(ind_arr[jj]==ind)
			{
				found=true;
				break;
			}
			
		}
		if(found==false)
		{
			ind_arr.push(ind);
		}

	}
	
	return 	ind_arr;
	
}







function getByColorsNearClustersFor(ind)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	if(global_table_of_clusters[ind]==null) return null;
	
	var color = global_table_of_clusters[ind].color;
	var points = global_table_of_clusters[ind].points;
	
	//now we get okruzhauschie clusters
	var colors = get_near_non_colors(color,points,global_cell_size,global_cell_size);
	
	var ind_arr=[];
	for(var j=0;j<colors.length;j++)
	{	
		var indexes = findClusterIndexesByColor(colors[j]);
		
		if(indexes == null) continue;
		
		for(var jj=0;jj<indexes.length;jj++)
		{
			var iii = indexes[jj];
			if(global_table_of_clusters[iii]==null) continue;
			if(global_table_of_clusters[iii].in_use!=global_level)  continue;
			
			if(includesValue(ind_arr, iii)==false) ind_arr.push(iii);
			
			
		}
		

	}
	
	return 	ind_arr;
	
}


function findSelectedClusterIndexes()
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	var clusters = [];
	for( var i=0; i<global_table_of_clusters.length; i++ )
	{
		
		if(global_table_of_clusters[i]==null) continue;
		
		
		if(global_table_of_clusters[i].in_use!=global_level) continue;
		
		if(global_table_of_clusters[i].selected==true) clusters.push(i);
	
		
	}
	
	return clusters;
}

function findClusterIndexesByColor(color)
{
	if(global_table_of_clusters==null) 
	{
		alert('Error: global_table_of_clusters==null');
		return null;
	}
	
	var clusters = [];
	for( var i=0; i<global_table_of_clusters.length; i++ )
	{
		if(global_table_of_clusters[i]==null) continue;
		
		if(global_table_of_clusters[i].in_use!=global_level) continue;
		
		var _color = global_table_of_clusters[i].color;
		
		if(
				(_color[0] == color[0]) &&
				(_color[1] == color[1]) &&
				(_color[2] == color[2]) &&
				(_color[3]== color[3])
				
		) 
		{
			clusters.push(i);
		}
		
	}
	
	return clusters;
}


function cloneCluster(c)
{
	var cluster = {};
	
	cluster.color =  cloneColor(c.color);
	cluster.points = clonePoints(c.points);
    cluster.zzz = cloneZZZ(c.zzz);		
	cluster.in_use=c.in_use;
	cluster.selected=c.selected;
		
	return cluster;
}

function dadada__Thread( onsuccess )
{
	
	if(global_dadada_colors.length>0)
	{
		var i=0;
		
		var clusters = global_table_of_clusters;
		
		var x = global_dadada_colors[i][0];
		var y = global_dadada_colors[i][1];
			
		var points = bububa(x,y,global_dadada_colors[i][2],global_cell_size,global_cell_size);

		var cluster = {};
		cluster.color =  JSON.parse(JSON.stringify(global_dadada_colors[i][2]));
		cluster.points = JSON.parse(JSON.stringify(points));
        cluster.zzz = [];		
		cluster.in_use=1;
		cluster.selected=false;
		clusters.push(cluster);
		
		
		
		for(var j=0;j<points.length;j++)
		{
			var ind=null;
			for(var i=0;i<global_dadada_colors.length;i++)
			{
						
					if( points[j][0] == global_dadada_colors[i][0] && points[j][1]  == global_dadada_colors[i][1] ) 
					{
						ind = i;
						break;
					}
					
			}
				
				if(ind!=null) 
				{
					global_dadada_colors.splice(i,1);
				}
			
			
			
		}
		
		global_table_of_clusters = clusters;
		
		setTimeout( function(){dadada__Thread(onsuccess);}, 1);
		
		return;
	}	

	else
	{
		
		//global_table_of_clusters = clusters;
		
		onsuccess(global_table_of_clusters);
	}
	
}

























function dadada(im, onsuccess)
{
	
	
	global_snake_image_data = im;
	
	global_cell_size = Number( document.getElementById("cell_size").value );
	
	var clusters = [];
	
	var colors = get_array_of_all_colors_all_points(im,global_cell_size,global_cell_size); 
	var ccc=0;
	for(var i=0;i<colors.length;i++)
	{
		var x = colors[i][0];
		var y = colors[i][1];
		
		
		
		var points = bububa(x,y,colors[i][2],global_cell_size,global_cell_size);
		/***
		setTimeout( function(points,color27) {
				return function() {
					
				var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	
	
	for(var j=0;j<points.length;j++)
	{
		var x27=points[j][0];
		var y27=points[j][1];
			
			
			context2.fillStyle='rgba('+color27[0]+','+color27[1]+','+color27[2]+',255)'; 
			context2.fillRect(x27,y27,global_cell_size, global_cell_size);
				
	
	}	
					
			//context2.fillStyle=col;//'rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'; //'black';
			//context2.fillRect(x,y,global_cell_size, global_cell_size);
			
			
				}
			}(points,[getRandomInt(0,256),getRandomInt(0,256),0,255]), ccc);
			
			ccc += 50;
			
			
			
				setTimeout( function(points27,color27) {
				return function() {		post_bubabu(points27,color27);  }
			}(JSON.parse(JSON.stringify(points)),[255,255,0,127]), 500);   //[getRandomInt(0,256),getRandomInt(0,256),0,255]
			ccc++;
			//if(ccc==2)return;
		**/
		var cluster = {};
		cluster.color =  JSON.parse(JSON.stringify(colors[i][2]));
		cluster.points = JSON.parse(JSON.stringify(points));
        cluster.zzz = [];		
		cluster.in_use=1;
		cluster.selected=false;
		clusters.push(cluster);
		
		
		
		for(var j=0;j<points.length;j++)
		{
			var ind=null;
			for(var i=0;i<colors.length;i++)
			{
						
					if( points[j][0] == colors[i][0] && points[j][1]  == colors[i][1] ) 
					{
						ind = i;
						break;
					}
					
			}
				
				if(ind!=null) 
				{
					colors.splice(i,1);
				}
			
			
			
		}
		
		i= -1;
		
		
		
	}
//	console.log("found "+ccc+" clusters");
//	global_alert_work=false;

	if(onsuccess) onsuccess( clusters);
	
	else return clusters;
	
}

function __zastavka()
{
	var img = new Image();
		img.onload = function()
		{
			var canvas = document.getElementById("canvas0");
			canvas.width = this.width;
			canvas.height = this.height;
			var context = canvas.getContext("2d");
			context.drawImage(this,0,0);
			
				
			
			
		}
		img.src = "images/paste_and_fight.png";
}

function end_of_game()
{
	
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	
	var colors = getArrayOfAllColors(context2.getImageData(0,0,canvas2.width,canvas2.height));
	
	if(colors.length==1)
	{
		//var img = new Image();
		//img.onload = function()
		{
		//	var canvas = document.getElementById("canvas0");
		//	canvas.width = this.width;
		//	canvas.height = this.height;
		//	var context = canvas.getContext("2d");
		//	context.drawImage(this,0,0);
			
			//setTimeout( 
			zastavka();
			//, 
			//3000 );
			
			
			
			
		}
		//img.src = "images/her_ass.png";
	}
		
		
	
}

/*
function game_move()
{
	var color = [255,255,255,255];
	global_cell_size = Number( document.getElementById("cell_size").value );
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");	
	var im0 = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var points = [];
	var colors = get_array_of_all_colors_all_points(im0,global_cell_size,global_cell_size);
	for(var i=0;i<colors.length;i++)
	{
		var x = colors[i][0];
		var y = colors[i][1];
		var _color = colors[i][2];
	
		if(
			_color[0] == color[0] &&
			_color[1] == color[1] &&
			_color[2] == color[2] &&
			_color[3]== color[3]
		) 
		{
			points.push([x,y]);
		}
	}
	
	if(points.length>0)
	{
		var ind = getRandomInt(0,points.length);
		
		ind = findClusterIndexByPoint(points[ind]);
		
		global_table_of_clusters[ind].in_use=true;
		
		post_bubabu(global_table_of_clusters[ind].points,global_table_of_clusters[ind].color);
			
		//sound2();
		
	}
	if(global_in_game==true)
	setTimeout( game_move, global_game_delay );
}
*/

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////  views  ////////////////////////////////
///////////////////////////////////////////////////////////////
function showAbsoluteDivWith(html, id, callback)
{	
	var div = document.getElementById('modal_window_'+id);
	if(div!=null)
	{
		document.body.removeChild(div);
	}
	
	var id = modal_window(html, id,	callback);
	
	
	
	
	
	
}

function show_zapret_div(indexes)
{
	global_ramka=true;
	global_cell_size = Number( document.getElementById("cell_size").value );
	
	var div = document.getElementById("zapret_colors");
	if(div!=null)
	{
		document.body.removeChild(div);
	}
	
	
		var div = document.createElement("div");
		div.id="zapret_colors";
		
		for(var i=0;i<indexes.length;i++)
		{
			
			var ind = indexes[i];
			
				var color = global_table_of_clusters[ind].color;
				////////////////////////////////////////////////
				var inv_color = [(255-color[0]),(255-color[1]),(255-color[2]),255]; 
		
	
		
		var points = get_only_less8neighbors_points(color,JSON.parse(JSON.stringify(global_table_of_clusters[ind].points)),global_cell_size,global_cell_size);
		
		post_bubabu(points,inv_color);//[255,255,0,255]
		
		//////////////////////////////////////////////
		setTimeout( function( points, _color ) { return function() { 
	
				post_bubabu(points,_color);
				var div = document.getElementById("zapret_colors");
				if(div!=null)
				{
					document.body.removeChild(div);
				}
				global_ramka=false;
				
		}  } ( JSON.parse(JSON.stringify(points)), color) , 1000 );
		
		
		
			var canvas=document.createElement("canvas");
			canvas.width=70;
			canvas.height=70;
			var context = canvas.getContext("2d");
			context.fillStyle='rgba('+color[0]+','+color[1]+','+color[2]+',255)'; 
			context.fillRect(0,0,canvas.width, canvas.height);
			div.appendChild(canvas);	
			
		}
	document.body.appendChild(div);
	//alert(colors);
}

















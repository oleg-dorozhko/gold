var global_direction_key=null;

function filterSplitAcceptedClusters( clusters, global_cluster_number )
{
	if(global_direction_key=='none') return clusters;
	
	var canvas2 = document.getElementById("canvas0");
	var w = canvas2.width;
	var h = canvas2.height;
	var p1 = global_table_of_clusters[global_cluster_number].points.length;
	if(global_direction_key=='increase')
	{
		// for(var i=0;i<clusters.length;i++)
		// {
			// if(clusters[i]==global_cluster_number) continue;
			// var mp = clusters[i].points.length;
			// if(mp>p1) return false;
		// }
		
		var min_points=w*h;
		for(var i=0;i<clusters.length;i++)
		{
			if(clusters[i]==global_cluster_number) continue;
			
			if(global_table_of_clusters[clusters[i]].in_use==true) continue;
			
			var mp = global_table_of_clusters[clusters[i]].points.length;
			
			if(p1<mp) clusters.splice(i,1);
				
		}
	
		return clusters;
		
		
		
		
		
		
		
		
		
		
		return clusters;
	}
	else
	{
		if(global_direction_key=='decrease')
		{
			// for(var i=0;i<clusters.length;i++)
			// {
				// if(clusters[i]==global_cluster_number) continue;
				// var mp = clusters[i].points.length;
				// if(mp<p1) return false;
			// }
			return clusters;
		}
	}
	
	return false;
}

function checkRemoveAccepted(global_cluster_number)
{
	if(global_direction_key=='none') return true;
	
	if(global_table_of_clusters==null) 
	{
		return false;
	}
	
	var canvas2 = document.getElementById("canvas0");
	var w = canvas2.width;
	var h = canvas2.height;
			
	var p1 = global_table_of_clusters[global_cluster_number].points.length;
	
	if(global_direction_key=='increase')
	{
		
		var max_points=0;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			if(i==global_cluster_number) continue;
			
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(max_points<mp) 
								max_points=mp;
				
		}
	
		if(p1>=max_points) return true;
		
		return false;
	}
	else
	{
		if(global_direction_key=='decrease')
		{
			var min_points=w*h;
			for(var i=0;i<global_table_of_clusters.length;i++)
			{
				if(i==global_cluster_number) continue;
				
				if(global_table_of_clusters[i].in_use==false) continue;
				
				var mp = global_table_of_clusters[i].points.length;
				
				if(min_points>mp) 
					
								min_points=mp;
					
			}
	
			if(p1<=min_points) return true;
		}
		
		return false;
	}
}
/*
function define_current_conf()
{
	var conf=[];
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i]==null) continue;
		if(global_table_of_clusters[i].in_use==false)
		{
			conf.push(i);
		}
	}
	return conf;
}

function get_conf_json()
{
	return JSON.parse(global_json_conf).next;
}


function compareConf(obj,arr)
{
	if((obj.conf.length>0)&&(obj.conf.length<=arr.length))
	{
		
		for(var i=0;i<obj.conf.length;i++)
		{
			var found=false;
			for(var j=0;j<arr.length;j++)
			{
				if(obj.conf[i]==arr[j])
				{
					found=true;
					break;
				}
			}
			if(found==false) return false;
		}
		
		return true;
	}
	
	return false;
}
*/
/*
function next()
{
	var result=null;
	var conf = define_current_conf();
	if(conf.length==0) return result;
	console.log('configuration of removed clusters is: '+conf);
	var conf_json = get_conf_json();
	if(conf_json==undefined) return result;
	for(var i=0;i<conf_json.length;i++)
	{
		if(compareConf(conf_json[i],conf)==true)
		{
			return {'index':i,'conf_json':conf_json};
		}
	}
	return null;
}
*/

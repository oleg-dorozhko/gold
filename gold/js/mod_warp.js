var global_json_base=null;

function warp(obj)
{
    //  {  'index' : i,  'conf_json':conf_json }  ;	
	console.log(obj.json_keys[obj.index]);
	startFrame(obj.json_keys[obj.index].folder, obj.json_keys[obj.index].password, obj.json_keys[obj.index].name);
}

function getWarpUrlByName(name)
{
	var folder_name = get_json_folder();
	if(folder_name==null) return null;
	return "data/"+folder_name+"/"+name+".json";
}

function get_json_folder()
{
	if(global_json_base==null) return null;
	return global_json_base.folder;
}

function get_json_keys()
{
	if(global_json_base==null) return null;
	return global_json_base.keys;
}


function define_current_keys()
{
	var level = get_current_level();
	var keys=[];
	for(var i=0;i<global_table_of_clusters.length;i++)
	{
		if(global_table_of_clusters[i]==null) continue;
		if(global_table_of_clusters[i].in_use!=level && (level==1)) //will works only for 1 level
		{
			keys.push(i);
		}
	}
	return keys;
}


function compareKey(obj,arr)
{
	if((obj.key.length>0)&&(obj.key.length<=arr.length))
	{
		
		for(var i=0;i<obj.key.length;i++)
		{
			var found=false;
			for(var j=0;j<arr.length;j++)
			{
				if(obj.key[i]==arr[j])
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


function next()
{
	var result=null;
	var keys = define_current_keys();
	if(keys.length==0) return result;
	console.log('configuration of removed clusters is: '+keys);
	var json_keys = get_json_keys();
	if(json_keys==undefined) return result;
	if(json_keys==null) return result;
	for(var i=0;i<json_keys.length;i++)
	{
		if(compareKey(json_keys[i],keys)==true)
		{
			return {'index':i,'json_keys':json_keys};
		}
	}
	return null;
}
<?php
	
	
	$arr = scandir("../images");
	
	$arr2 = array();
	for($i=0;$i<count($arr);$i++)
	{
		if($arr[$i]==".") continue;
		if($arr[$i]=="..") continue;
		$arr2[] = $arr[$i];
	}
		
	$n = rand( 0, count($arr2)-1 );
	
	echo explode(".", $arr2[$n])[0];		//without extension
		

?>
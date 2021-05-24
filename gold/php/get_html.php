<?php

header("Expires: Tue, 03 Jul 2001 06:00:00 GMT"); // *
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

	$param1 = "";
	$param2 = "";

	
	if( isset($_POST['param1']) && isset($_POST['param2']) )
	{
		if($_POST['param1'] == 'root_content')
		{
		    $param1 = $_POST['param1'];			
			$param2 = $_POST['param2'];
			
			if($param2 == "admin1")
			{
				//podmena mod na adminski i sboku pripeku
				echo file_get_contents("../html/_index.html");
				die();
			}
			else
			{
				//podmena mod na levelski
				echo file_get_contents("../html/_index.html");
				die();
			}				
			
			
		}
	}
		
	print_r($_POST);
	
	var_dump($_POST);

	echo "server:get_html():error: param1=[$param1], param2=[$param2]";

?>
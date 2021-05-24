<?php

	if(isset($_GET['img']))
	{
		$img = trim($_GET['img']);
		
		if(file_exists("../images/$img")===false) die();
		
		$im = imagecreatefrompng("../images/$img");
		
		header('Content-Type: image/png');
		imagepng($im);
		imagedestroy($im);
	}
	
?>
<?php

	include('lib/GIFEncoder.class.php');

	function _make_gif($delay_set)
	{

		$counter = 0;	
		
		for($i=0; $i<10000;$i++)
		{
			$imgpath = '../png/save_canvas'.$i.".png";
			if(file_exists($imgpath))
			{
				$counter ++;
			}
		}

		echo "<br>counter=$counter";
		$arr = explode(",",$delay_set);	
		echo "<br>";

		$frames = array();
		$framed = array();
		
		$nn = 0;	
		for($i=0; $i<10000;$i++)
		{
			$imgpath = '../png/save_canvas'.$i.".png";
			
			if(file_exists($imgpath))
			{
				if(filesize($imgpath)==0) continue;
				
				try
				{
				
					// Open the first source image and add the text.
					$image = imagecreatefrompng($imgpath);
					//$text_color = imagecolorallocate($image, 200, 200, 200);
					//imagestring($image, 5, 5, 5,  $text, $text_color);

					// Generate GIF from the $image
					// We want to put the binary GIF data into an array to be used later,
					//  so we use the output buffer.
					ob_start();
					imagegif($image);
					$frames[]=ob_get_contents();

					if($nn == $counter-1) $framed[]=intval($arr[1]); 
					else $framed[]=intval($arr[0]); 

					$nn++;

					// Delay in the animation.
					ob_end_clean();

				}
				catch(Exception $e)
				{
					echo $e->getMessage();
				}

			}
			
		}
		
	/****
	$imgpath = "../png/base64_link.png";

	// Open the first source image and add the text.
	$image = imagecreatefrompng($imgpath);
	//$text_color = imagecolorallocate($image, 200, 200, 200);
	//imagestring($image, 5, 5, 5,  $text, $text_color);

	// Generate GIF from the $image
	// We want to put the binary GIF data into an array to be used later,
	//  so we use the output buffer.
	ob_start();
	imagegif($image);
	$frames[]=ob_get_contents();
	$framed[]=300;

	// Delay in the animation.
	ob_end_clean();
		
		/******

	// And again..
	// Open the first source image and add the text.
	$image = imagecreatefrompng('source02.png');
	$text_color = imagecolorallocate($image, 200, 200, 200);
	imagestring($image, 5, 20, 20,  $text, $text_color);

	// Generate GIF from the $image
	// We want to put the binary GIF data into an array to be used later,
	//  so we use the output buffer.
	ob_start();
	imagegif($image);
	$frames[]=ob_get_contents();
	$framed[]=40;

	// Delay in the animation.
	ob_end_clean();

	*****/

	/****

	$ERR = Array (
	'ERR00'=> 'Does not supported function for only one image!',
	'ERR01'=>'Source is not a GIF image!',
	'ERR02'=>'Unintelligible flag ',
	'ERR03'=>'Does not make animation from animated GIF source',
	);
	*****/
	
	if(count($frames)>0)
	{

		// Generate the animated gif and output to screen.
		$gif = new GIFEncoder($frames,$framed,0,2,0,0,0,'bin');
		//echo $gif->GetAnimation();

		$fp = fopen('../animations/animegif.gif', 'w');
		fwrite($fp, $gif->GetAnimation());
		fclose($fp);

		for($i=0; $i<10000;$i++)
		{
			$imgpath = '../png/save_canvas'.$i.".png";
			
			if(file_exists($imgpath)) unlink($imgpath);
			
		}
	
	}

}
	

if(isset($_GET['admin']))
{
	if($_GET['admin']=='admin1')
	{
		_make_gif("100,200");
		
		for($i=0; $i<10000;$i++)
		{
			$imgpath = '../png/save_canvas'.$i.".png";
			
			if(file_exists($imgpath)) unlink($imgpath);
			
		}
		
	}
}

?>
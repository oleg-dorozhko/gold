<?php

include('make_gif.php');

// var_dump($_POST); 

//die();

	$res = "";
	
	if(isset($_POST['last_image']) && ($_POST['last_image']=='last_image'))
	{
		foreach($_POST as $key => $val)
		{
			if(strpos($key,"save_canvas")=== FALSE) continue;
			
			// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
			$baseFromJavascript = $val; //"data:image/png;base64,BBBFBfj42Pj4"; // $_POST['base64']; //your data in base64 'data:image/png....';
			// We need to remove the "data:image/png;base64,"
			$base_to_php = explode(',', $baseFromJavascript);
			// the 2nd item in the base_to_php array contains the content of the image
			$data = base64_decode($base_to_php[1]);
			// here you can detect if type is png or jpg if you want
			$filepath = "../png/".$key.".png"; // or image.jpg

			// Save the image in a defined path
			file_put_contents($filepath,$data);
		
		}
		
		_make_gif($_POST['delay_set']);
		
		return;
		
		
	}
	else
	{
		foreach($_POST as $key => $val)
		{
			if(strpos($key,"save_canvas")=== FALSE) continue;
			
				//echo "\n<br>key=$key\n<br>value=$val";
				// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
				$baseFromJavascript = $val; //"data:image/png;base64,BBBFBfj42Pj4"; // $_POST['base64']; //your data in base64 'data:image/png....';
				// We need to remove the "data:image/png;base64,"
				$base_to_php = explode(',', $baseFromJavascript);
				// the 2nd item in the base_to_php array contains the content of the image
				$data = base64_decode($base_to_php[1]);
				// here you can detect if type is png or jpg if you want
				$filepath = "../png/".$key.".png"; // or image.jpg

				// Save the image in a defined path
				file_put_contents($filepath,$data);
				
				
			
			
		}
		
		echo "index=".$_POST['next_index'];
		
		return;
	}

	
	
	// 

	
	/******

	// A few settings
	$image = 'cricci.jpg';

	// Read image path, convert to base64 encoding
	$imageData = base64_encode(file_get_contents($image));

	// Format the image SRC:  data:{mime};base64,{data};
	$src = 'data: '.mime_content_type($image).';base64,'.$imageData;

	// Echo out a sample image
	echo '<img src="', $src, '">';

	******/
	
	
?>


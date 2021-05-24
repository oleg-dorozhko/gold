<?php

include('make_gif.php');

// var_dump($_POST); 

//die();

if(isset($_POST['submit_btn']) && isset($_POST['link_text']))
{
	$res = "";
	
	
	
	foreach($_POST as $key => $val)
	{
		if( strpos($key, "img_name_base64_") !== FALSE ) 
		{
			$key2 = str_replace("img_name_base64_","",$val);
			$res .=  "<br>[key=$key][key2=$key2]";
			
			// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
			$baseFromJavascript = $_POST["base64_".$key2]; //"data:image/png;base64,BBBFBfj42Pj4"; // $_POST['base64']; //your data in base64 'data:image/png....';
			// We need to remove the "data:image/png;base64,"
			$base_to_php = explode(',', $baseFromJavascript);
			// the 2nd item in the base_to_php array contains the content of the image
			$data = base64_decode($base_to_php[1]);
			// here you can detect if type is png or jpg if you want
			$filepath = "../png/"."base64_".$key2.".png"; // or image.jpg

			// Save the image in a defined path
			file_put_contents($filepath,$data);
			
			
			
		}
		
		
		
	}

	echo $res;
	// _make_gif($_POST["link_text"]);	

}
else
{
	echo "error on server - no post";
}
	
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


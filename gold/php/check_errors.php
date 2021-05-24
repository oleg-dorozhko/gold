<?php
			/**
	 * Checks if a folder exist and return canonicalized absolute pathname (long version)
	 * @param string $folder the path being checked.
	 * @return mixed returns the canonicalized absolute pathname on success otherwise FALSE is returned
	 */
	function folder_exist($folder)
	{
		// Get canonicalized absolute pathname
		$path = realpath($folder);

		// If it exist, check if it's a directory
		if($path !== false AND is_dir($path))
		{
			// Return canonicalized absolute pathname
			// return $path;
			return true;
		}

		// Path/folder does not exist
		return false;
	}

	function getCurrentRightPassword($folder_name)
	{
		return trim(file_get_contents("../data/".$folder_name."/passwords.txt"));
	}
	
	if(isset($_GET['password']) && isset($_GET["folder_name"]) && isset($_GET["filename"]))
	{
		
		
		$folder_name = $_GET['folder_name'];
		if(folder_exist("../data/".$folder_name)===false)
		{
			die("check_errors.php::error::folder [$folder_name] not found");
			//mkdir("../images/".$folder_name, 0777);
		}
		
		$pswd = $_GET['password'];
		
		if($pswd!= getCurrentRightPassword($folder_name))
		{
			die("check_errors.php::error::Wrong password [$pswd] for folder [$folder_name]");
		}			
		
		
		$filename = $_GET['filename'];
		$fulljsonname ="../data/".$folder_name."/$filename.json";
		if(file_exists($fulljsonname)!==false)
		{
			die("check_errors.php::error::file [$$fulljsonname] found");
			
		}
		
		$fullpngname ="../images/patterns/".$folder_name."/$filename.png";
		if(file_exists($fullpngname)!==false)
		{
			die("check_errors.php::error::file [$$fullpngname] found");
			
		}
		
		/**
			
			$val = $_POST["img0"];
			// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
			$baseFromJavascript = $val; //"data:image/png;base64,BBBFBfj42Pj4"; // $_POST['base64']; //your data in base64 'data:image/png....';
			// We need to remove the "data:image/png;base64,"
			$base_to_php = explode(',', $baseFromJavascript);
			// the 2nd item in the base_to_php array contains the content of the image
			$data = base64_decode($base_to_php[1]);
			// here you can detect if type is png or jpg if you want
			
		//	$key = "f_".time()."_".getAbrakadabra(10);
			//$folder_num = time();
			//time()
		//	$filepath = "../images/".$folder_name."/".$key.".png"; // or image.jpg
			
			$filepath = $fullpngname;
		 
			
			// Save the image in a defined path
			file_put_contents($filepath,$data);
			
			
			$data= '  { "imageUrl": "images/patterns/'."$folder_name/$filename.png".'" }	';
			
			// Save the json of base  in a defined path
			file_put_contents($fulljsonname,$data);
	**/	

/**		
			$file = '../jar/dov_patterns_gifmaker.jar';
			$newfile = '../images/'.$folder_name.'/dov_patterns_gifmaker.jar';

			if (!copy($file, $newfile)) {
				echo "save_image_on_server.php::error:: $file";
			}
			else
			{
				$file = '../bat/dov_patterns_gifmaker.bat';
				$newfile = '../images/'.$folder_name.'/dov_patterns_gifmaker.bat';

				if (!copy($file, $newfile)) {
					echo "save_image_on_server.php::error:: $file";
				}
				else
				{
					echo "$key.png";
				}
			}
**/			
			echo ("check_errors.php::success");

	}
	else 
	{ 
		echo "check_errors.php::error::wrong parameters error";
		
	}
?>
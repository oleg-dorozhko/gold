<?php
    
	function filter($s)
	{
		$s = trim($s);
		$c = str_repeat("_",strlen($s));
		
		for($i=0;$i<strlen($s);$i++)
		{
			for($n=ord('A');$n<ord('Z')+1;$n++)
			{
				if($s{$i}=="".chr($n))
				{
					$c{$i} = $s{$i};
				}
			}
			
			for($n=ord('a');$n<ord('z')+1;$n++)
			{
				if($s{$i}=="".chr($n))
				{
					$c{$i} = $s{$i};
				}
			}
			
			for($n=ord('0');$n<ord('9')+1;$n++)
			{
				if($s{$i}=="".chr($n))
				{
					$c{$i} = $s{$i};
				}
			}
			
			if($s{$i} == "_") $c{$i} = $s{$i};
			
			
		}
		
		return $c;
		
	}
	
	
	function echoRandomLabirint()
	{
		$arr = scandir("../images/labirint");
		
		$arr_names = array();
			
		for($i=0;$i<count($arr);$i++)
		{
			$fname = $arr[$i];
			if($fname == '.') continue;
			if($fname == '..') continue;
				
			$arr_names[] = $fname;
				
		}	
		
		echo "images/labirint/".$arr_names[rand(0,count($arr_names)-1)];
	}
	
	if(isset($_GET['labirint']))
	{
		$labirint = filter($_GET['labirint']);
		
		if($labirint != "random") 
		{
			$arr = scandir("../images/labirint");
		
			$arr_names = array();
				
			for($i=0;$i<count($arr);$i++)
			{
				$fname = $arr[$i];
				if($fname == '.') continue;
				if($fname == '..') continue;
				
				if( strpos($fname, $labirint) === FALSE) continue;	
				$arr_names[] = $fname;
				break;
					
			}	
			
			if(count($arr_names)==1) 	
			{
				echo "images/labirint/".$arr_names[0];
				return;
			}
			
		}
		
		
	}
	
	echoRandomLabirint();
	

	//echo "images/labirint/labirint_17_size.png";
	//get_labirint_image_path.php

?>
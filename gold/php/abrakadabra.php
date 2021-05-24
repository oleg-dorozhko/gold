<?php
	//abracadabra
	function abracadabra($len)
	{
		$a= array();
		$a[]='b'; $a[]='c'; $a[]='d'; $a[]='f'; $a[]='g'; $a[]='h'; $a[]='j'; $a[]='k'; $a[]='l';
		$a[]='m'; $a[]='n'; $a[]='p'; $a[]='r'; $a[]='s'; $a[]='t'; $a[]='q'; 
		$a[]='x'; $a[]='z';$a[]='w';$a[]='v';
		$b = array();
		$b[]='a';
		$b[]='e';
		$b[]='o';
		$b[]='u';
		$b[]='i';
		$b[]='y';
		$s = '';
		for($i=0;$i<$len;$i++)
		{
			if($i % 2 == 0) $s .= $a[rand(0, count($a)-1)]; 
			else $s .= $b[rand(0, count($b)-1)];
		}
		//s += (''+(new Date().getTime());
		//console.log(s;
		return $s;
	}
	
	function geninteger($n)
	{
		$s = "".rand(1,9);
		$m = rand(1,$n-1);
		
		for($i=0;$i<$m;$i++)
		{
			$s .= rand(0,9);
		}
		
		return $s;
	}

	function genfloat($n)
	{
		$s = "".rand(1,9);
		$m = rand(1,$n-1);
		
		for($i=0;$i<$m;$i++)
		{
			$s .= rand(0,9);
		}
		
		$fl = intval($s) / pow( 10, rand(1,strlen($s)) ); 
		
		return ""+$fl;
	}

	function genboolean()
	{
		$m = rand(0,1);
		if($m == 0) return "FALSE";
		return "TRUE";
	}
	
	function getAbrakadabra($len)
	{
		return abracadabra($len);
	}
	
	/********

	if(isset($_GET['get']) && isset($_GET['len']))
	{
		$len = $_GET['len'];
		if($_GET['get']=='integer') echo geninteger($len);
		else if($_GET['get']=='float') echo genfloat($len);
		else if($_GET['get']=='string') echo abracadabra($len);
	}
	else
	{	
		if(isset($_GET['len'])) echo abracadabra(intval($_GET['len']));
		else if(isset($_GET['get']))
		{
			if($_GET['get']=='integer') echo geninteger(20);
			else if($_GET['get']=='float') echo genfloat(20);
			else if($_GET['get']=='string') echo abracadabra(40);
		}
		else echo "<br>abrakadabra said: ".abracadabra(16);	
	}
	
	******/

?>
<?php 

	if(isset($_GET['folder']))
	{
		
		require_once "db.php";

		// Указываем кодировку, в которой будет получена информация из базы
		@mysqli_query ($db, 'set character_set_results = "utf8"');

		$folder = $_GET['folder'];
		
		
		// Получаем IP-адрес посетителя
		$visitor_ip = $_SERVER['REMOTE_ADDR'];
		
		// и сохраняем текущую дату
		$date = date("Y-m-d");
		
		$fdate = date("Y-m-d-H-i-s");
		
		mysqli_query($db, "INSERT INTO `simple_php_counter_all_about_visits` VALUES ( null, '$folder','$date','$fdate','$visitor_ip' )");
		
		
		
		
		
		//$res = mysqli_query($db, "SELECT * FROM `simple_php_counter_ips` WHERE (`folder`='$folder' AND `date`='$date')") or die ("Проблема при подключении к БД");

		
		
		//echo "<br>visitor_ip= [$visitor_ip] ";
		
		

		// Узнаем, были ли посещения за сегодня
		$res = mysqli_query($db, "SELECT `visit_id` FROM `simple_php_counter_visits` WHERE (`folder`='$folder' AND `date`='$date')") or die ("Проблема при подключении к БД");

		// Если сегодня еще не было посещений
		if (mysqli_num_rows($res) == 0)
		{
			// Очищаем таблицу ips
			mysqli_query($db, "DELETE FROM `simple_php_counter_ips` WHERE `folder`='$folder'");

			// Заносим в базу IP-адрес текущего посетителя
			mysqli_query($db, "INSERT INTO `simple_php_counter_ips` VALUES (NULL,'$folder','$visitor_ip')");

			// Заносим в базу дату посещения и устанавливаем кол-во просмотров и уник. посещений в значение 1
			$res_count = mysqli_query($db, "INSERT INTO `simple_php_counter_visits` SET `date`='$date',`folder`='$folder', `hosts`=1,`views`=1");
		}

		// Если посещения сегодня уже были
		else
		{
			// Проверяем, есть ли уже в базе IP-адрес, с которого происходит обращение
			$current_ip = mysqli_query($db, "SELECT `ip_id` FROM `simple_php_counter_ips` WHERE (`folder`='$folder' AND `ip_address`='$visitor_ip')");

			// Если такой IP-адрес уже сегодня был (т.е. это не уникальный посетитель)
			if (mysqli_num_rows($current_ip) == 1)
			{
				// Добавляем для текущей даты +1 просмотр (хит)
				mysqli_query($db, "UPDATE `simple_php_counter_visits` SET `views`=`views`+1 WHERE (`folder`='$folder' AND `date`='$date')");
			}

			// Если сегодня такого IP-адреса еще не было (т.е. это уникальный посетитель)
			else
			{
				// Заносим в базу IP-адрес этого посетителя
				mysqli_query($db, "INSERT INTO `simple_php_counter_ips` SET `ip_address`='$visitor_ip',`folder`='$folder'");

				// Добавляем в базу +1 уникального посетителя (хост) и +1 просмотр (хит)
				mysqli_query($db, "UPDATE `simple_php_counter_visits` SET `hosts`=`hosts`+1,`views`=`views`+1 WHERE `date`='$date'");
			}
		}
	
	}

?>
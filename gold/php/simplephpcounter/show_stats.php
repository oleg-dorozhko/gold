<?php

	if(isset($_GET['folder']))
	{
		require_once "db.php";
		// Указываем кодировку, в которой будет получена информация из базы
		@mysqli_query ($db, 'set character_set_results = "utf8"');
		$date = date("Y-m-d");
		$folder = $_GET['folder'];
		// Извлекаем статистику по текущей дате (переменная date попадает сюда из файла count.php, который, в свою очередь, подключается в каждом из 4 обычных файлов)
		$res = mysqli_query($db, "SELECT `folder`,`views`, `hosts` FROM `simple_php_counter_visits` WHERE  (`folder`='$folder' AND `date`='$date')");
		$row = mysqli_fetch_assoc($res);

		echo '<p>Уникальных посетителей: ' . $row['hosts'] . '<br />';
		echo 'Просмотров: ' . $row['views'] . '</p>';
	}
?>
<?php

	// Хост (обычно localhost)
	$db_host = "localhost";

	// Имя базы данных
	//$db_name = "stats";
	$db_name = "s954447o_databas";

	// Логин для подключения к базе данных
	//$db_user = "root";
	$db_user = "s954447o_databas";

	// Пароль для подключения к базе данных
	$db_pass = "*p98wp]G";

	$db = mysqli_connect ($db_host, $db_user, $db_pass, $db_name) or die ("Невозможно подключиться к БД");

?>
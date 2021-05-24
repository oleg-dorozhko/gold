<?php include '../db.php'; ?>

<!DOCTYPE html>
<html>
<head>
<title>Simple PHP counter admin panel</title>
<meta charset="utf-8">
</head>
<body>
<h2>Статистика</h2>
<select id='sfolder' name='folder' onchange='set_interval_link()'>
<option selected value='giprozhorka'>giprozhorka</option>
<option value='labirint'>labirint</option>
</select>

<p><a href="?interval=1<?php echo '&folder='.get_folder() ?>">За сегодня</a></p>
<p><a href="?interval=7<?php echo '&folder='.get_folder() ?>">За последнюю неделю</a></p>
<p><a href="?interval=62<?php echo '&folder='.get_folder() ?>">За прошлый месяц</a></p>
<p><a href="?interval=31<?php echo '&folder='.get_folder() ?>">За этот месяц</a></p>

<script>

	init_interval_link();

	function init_interval_link()
	{
		//alert();
		
		var what_find='<?php echo get_folder() ?>';
		document.getElementById("sfolder").value=what_find;
		var lnk = document.getElementsByTagName("a");
		for(var i=0;i<lnk.length;i++)
		{
			//console.log(lnk[i].href.indexOf('interval'));
			if(lnk[i].href.indexOf('?interval=')!=-1)
			{
				var arr = lnk[i].href.split('?');
				var arr2 = arr[1].split('&');
				if(arr2[1]==undefined)  arr2[1]='folder='+document.getElementById("sfolder").value;
				else  arr2[1]='folder='+document.getElementById("sfolder").value;
				
				lnk[i].href=arr[0]+'?'+arr2[0]+'&'+arr2[1];//'&folder=';
			}
		}
	}

	function set_interval_link()
	{
		
		var lnk = document.getElementsByTagName("a");
		for(var i=0;i<lnk.length;i++)
		{
			//console.log(lnk[i].href.indexOf('interval'));
			if(lnk[i].href.indexOf('?interval=')!=-1)
			{
				var arr = lnk[i].href.split('?');
				var arr2 = arr[1].split('&');
				if(arr2[1]==undefined)  arr2[1]='folder='+document.getElementById("sfolder").value;
				else  arr2[1]='folder='+document.getElementById("sfolder").value;
				
				lnk[i].href=arr[0]+'?'+arr2[0]+'&'+arr2[1];//'&folder=';
			}
		}
	}

</script>

<table style="border: 1px solid silver;">

<tr>
    <td style="border: 1px solid silver;">Дата</td>
	<td style="border: 1px solid silver;">Сайт</td>
    <td style="border: 1px solid silver;">Уникальных посетителей</td>
    <td style="border: 1px solid silver;">Просмотров</td>
</tr>


<?php


function get_folder() 
{
	if (isset($_GET['folder']))
	{
		return "".$_GET['folder'];
	}
	return "giprozhorka";
}


require_once "../db.php"; 

// Если в массиве GET есть элемент interval (т.е. был клик по одной из ссылок выше)
if (isset($_GET['interval']) && isset($_GET['folder']))
{
	$interval = intval($_GET['interval']);
	
	$folder = $_GET['folder'];
	
    // Если в качестве параметра передано не число
    if (!is_numeric ($interval))
    {
        echo '<p><b>Недопустимый параметр!</b></p>';
    }
	else
	{
		
		// Указываем кодировку, в которой будет получена информация из базы
		@mysqli_query ($db, 'set character_set_results = "utf8"');

	
		if($interval == 62)
		{
			$md=intval(date("m"));
			// Получаем из базы данные, отсортировав их по дате в обратном порядке в количестве interval штук
			$res = mysqli_query($db, "SELECT * FROM `simple_php_counter_visits` WHERE (MONTH(date)='$md'-1) AND `folder`='$folder'");
		}
		else if($interval == 31)
		{
			$md=intval(date("m"));
			// Получаем из базы данные, отсортировав их по дате в обратном порядке в количестве interval штук
			$res = mysqli_query($db, "SELECT * FROM `simple_php_counter_visits` WHERE (MONTH(date)='$md') AND `folder`='$folder'");
		}
		else if($interval == 7)
		{
			
			//$data = date("Y-m-d");	
	
			$year= intval(date("Y"));
			$month= intval(date("m"));
			$day = intval(date("d")); 
			
			
			if(($year%4)==0) $value = (31*($month-1)-$month/2+$day)/7;
			else{
				if($month>2) $day = $day-1;
				$value = (31*($month-1)-$month/2+$day)/7;
			}
			$value=intval(date("W"));
			// echo "[$value]";
			$wd=$value;
		

			// Получаем из базы данные, отсортировав их по дате в обратном порядке в количестве interval штук
			$res = mysqli_query($db, "SELECT * FROM `simple_php_counter_visits` WHERE `folder`='$folder' AND (WEEK(date)='$wd'-1)");
			
		}else if($interval == 1)
		{
			$doy=intval(date("z"))+1;;
			// Получаем из базы данные, отсортировав их по дате в обратном порядке в количестве interval штук
			$res = mysqli_query($db, "SELECT * FROM `simple_php_counter_visits` WHERE `folder`='$folder' AND (DAYOFYEAR(date)='$doy')");
		}
		
		// Формируем вывод строк таблицы в цикле
		while ($row = mysqli_fetch_array($res))
		{
			echo '<tr>
					 <td style="border: 1px solid silver;">' . $row['date'] . '</td>
					 <td style="border: 1px solid silver;">' . $row['folder'] . '</td>
					 <td style="border: 1px solid silver;">' . $row['hosts'] . '</td>
					 <td style="border: 1px solid silver;">' . $row['views'] . '</td>
				 </tr>';
		}
	}
}

?>

</table>
</body>
</html>
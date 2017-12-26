<?php 
	session_start();
	$token = "ZghZi_hIZH_hknk_nkZkhZ_kgZKhp_KZPyt-FZvHZ>_<M>YRZ";
	if (isset($_SESSION['login'])) {
		echo '<script type="text/javascript">var userName = "'.$_SESSION['login'].'";</script>';
		if ($_SESSION['login'] == 'master') {
			include('master.php');
		} else if ($_SESSION['login'] == 'viewer') {
			include('view.php');
		} else {
			include('client.php');
		}
	} else {
		include('login.php');
	}

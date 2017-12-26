<?php
	// kick any hacker try to access without login
	if (!isset($token) || $token != 'ZghZi_hIZH_hknk_nkZkhZ_kgZKhp_KZPyt-FZvHZ>_<M>YRZ') {
		exit("I like a hacker, but not here!");
	}
?>

<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>KHMT2 | 20/10</title>

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<!-- Sweetalert CSS -->
		<link rel="stylesheet" href="css/sweetalert2.min.css">
		<!-- Master CSS -->
		<link rel="stylesheet" href="css/master.css">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
		<!-- pre loading -->
		<div class="preloading">
			<div></div>
		</div>

		<!-- img question -->
		<img src="img/ready.jpg" class="bg"></img>

		<!-- chat box -->
		<div class="chat-box-bg"></div>
		<div class="chat-box">
			<div class="msg">
				<div class="txt">
				<!-- hiden this line to fix bug animation, don't remove me -->
				<br>
				Auto running is started, 3s per message.
				<br>
				20/10 Chúc các bạn gái lớp mình luôn cư­ời tư­ơi, cư­ời duyên, cư­ời e thẹn, cư­ời trẻ trung và cư­ời các kiểu hoài hoài trong ngày hôm nay.
				</div>
			</div>
		</div>


		<!-- pick point box -->
		<table class="pick-point">
			<tr>
				<td class="active">200</td>
				<td>200</td>
				<td>200</td>
				<td>200</td>
			</tr>
			<tr>
				<td>200</td>
				<td>200</td>
				<td>200</td>
				<td>200</td>
			</tr>
			<tr>
				<td>200</td>
				<td>200</td>
				<td>200</td>
				<td>200</td>
			</tr>
		</table>

		<!-- status - team -heath -->
		<div class="bg-status"></div>
		<div class="status">
			<div class="heath-1"></div>
			<div class="vs"></div>
			<div class="heath-2"></div>
			<div class="team-1">Team 1: <b class="point-1">100</b></div>
			<div class="team-2">Team 2: <b class="point-2">100</b></div>
		</div>

		<!-- question - time -->
		<div class="bg-question"></div>
		<div class="question">
			<div class="quest-num">Câu: 1</div>
			<div class="time">60</div>
		</div>

		<!-- audio -->
		<audio id="mp3" loop="true">
			<source src="m.mp3" type="audio/mp3">
		</audio>

		<!-- jQuery -->
		<script src="js/jquery.min.js"></script>
		<!-- Bootstrap JavaScript -->
		<script src="js/bootstrap.min.js"></script>
		<!-- Sweetalert  -->
		<script src="js/sweetalert2.min.js"></script>
		<!-- Master  -->
		<script src="js/master.js"></script>
	</body>
</html>
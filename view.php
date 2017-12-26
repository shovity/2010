<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Show Question</title>
	<style type="text/css">
		body {
			overflow: hidden;
			margin: 0;
		}

		img {
			width: 100%;
			height: 100vh;
			margin: 0;
		}
	</style>
	<script src="js/jquery.min.js"></script>
	<script type="text/javascript">
		$('document').ready(function () {
			setInterval(function () {
				$.get('app/server.php?request=get-img', function (result) {
					$('#img').attr('src', result);
				});
			}, 1000);
		});
	</script>
</head>
<body>
	<img id="img" src="img/ready.jpg">
</body>
</html>
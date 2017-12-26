<!DOCTYPE html>
<html lang="vi">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Login page</title>

		<!-- Sweetalert CSS -->
		<link rel="stylesheet" href="css/sweetalert2.min.css">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->

		<style type="text/css">
			/*remove select dotted boder*/
			:focus {outline:none;}
			::-moz-focus-inner {border:0;}

			#login-msg {
				text-align: left;
			}

			.swal2-modal .swal2-file::placeholder, .swal2-modal .swal2-input::-moz-placeholder, .swal2-modal .swal2-textarea::-moz-placeholder {
			    color: #777;
			}

			.swal2-modal .swal2-file::-moz-placeholder, .swal2-modal .swal2-input::-moz-placeholder, .swal2-modal .swal2-textarea::-moz-placeholder {
			    color: #777;
			}
		</style>
	</head>
	<body>

		<!-- jQuery -->
		<script src="js/jquery.min.js"></script>
		<!-- Sweetalert  -->
		<script src="js/sweetalert2.min.js"></script>
		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
 		<script src="Hello World"></script>



 		<script type="text/javascript">
 			swal({
 				title: 'Đăng nhập',
			  	html:
			  	'<p id="login-msg">Không đăng nhập thì chỉ được xem thôi<br>' +
			  	'Chúc vui vẻ! </p>' +
			  	'<input id="swal-input1" class="swal2-input" placeholder="Tài khoản">' +
    			'<input id="swal-input2" class="swal2-input" placeholder="Mật khẩu" type="password">',
			  	showCancelButton: true,
			 	confirmButtonText: 'Đăng nhập',
			 	showLoaderOnConfirm: true,
			 	allowOutsideClick: false,

			  	preConfirm: function() {
			    	return new Promise(function(resolve, reject) {
			    		var user = $('#swal-input1').val();
				        var password = $('#swal-input2').val();
				        if (user != '' && password != null) {
				        	$.ajax({
				        		"url": "app/server.php?request=login&user="+user+"&password="+password,
				        		"error": function () {
				        			reject("Can't connect to server!");
				        		},
				        		"success": function (result) {
				        			if (result == '0') {
				        				reject("Tài khoản hoặc mật khẩu không đúng!");
				        			} else {
				        				resolve("Đăng nhập thành công: " + user);
				        			}
				        		}
				        	});
				        } else {
				        	reject("Tài khoản hoặc mật khẩu trống!");
				        }
			    	});
			  	}
	
			}).then(function(msg) {
				
				swal({
			    	type: 'success',
			    	title: 'Đăng nhập thành công',
			    	html: msg
			  	}).then(function () {
			  		location.reload();
			  	});
			  	
			})
 		</script>
	</body>
</html>
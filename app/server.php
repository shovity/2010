<?php
	if (isset($_GET['request'])) {
		$request = $_GET['request'];
		switch ($request) {
			case 'stop-1':
				$data = json_decode(file_get_contents('realTimeData.json'));
				$data->status = 'stop-1';
				file_put_contents(__DIR__.'/realTimeData.json', json_encode($data));
				break;
			case 'stop-2':
				$data = json_decode(file_get_contents('realTimeData.json'));
				$data->status = 'stop-2';
				file_put_contents(__DIR__.'/realTimeData.json', json_encode($data));
				break;
			case 'stop-m':
				$data = json_decode(file_get_contents('realTimeData.json'));
				$data->status = 'stop-m';
				file_put_contents(__DIR__.'/realTimeData.json', json_encode($data));
				break;

			case 'running':
				$data = json_decode(file_get_contents('realTimeData.json'));
				$data->status = 'running';
				file_put_contents(__DIR__.'/realTimeData.json', json_encode($data));
				break;

			case 'get-status':
				$data = json_decode(file_get_contents('realTimeData.json'));
				echo $data->status;
				break;

			case 'logout':
				session_start();
				session_unset();
				header('location: ../index.php');
				break;

			case 'login':
				sleep(1);
				$account = json_decode(file_get_contents(__DIR__.'/account.json'));
				$user = $_GET['user'];
				$password = $_GET['password'];
				if (isset($account->$user) && $account->$user == $password) {
					// set session
					session_start();
					$_SESSION['login'] = $user;
					echo 1;
				} else {
					echo 0;
				}
				break;

			case 'get-user':
				session_start();
				echo $_SESSION['login'];
				break;

			case 'loadQuestion':
				$data = json_decode(file_get_contents('../questions/questionData.json'));
				var_dump($data);
				break;

			case 'get-data-point':
				$data = json_decode(file_get_contents('/pointData.json'));
				var_dump($data);
				break;

			case 'pushPoint':
				$pointData = $_GET['pointData'];
				file_put_contents('pointData.json', $pointData);
				break;

			case 'get-msg':
				$msg = json_decode(file_get_contents('msg.json'));
				if (count($msg) > 0) {
					echo array_shift($msg);
					file_put_contents('msg.json', json_encode($msg));
				}
				
				break;

			case 'send-msg':
				$msg = json_decode(file_get_contents('msg.json'));
				$msg[] = $_GET['msg'];
				file_put_contents('msg.json', json_encode($msg));
				break;

			case 'update-img':
				$img = $_GET['img'];
				file_put_contents('img-update.json', $img);
				break;

			case 'get-img':
				echo file_get_contents('img-update.json');
				break;
			
			default:
				echo 'Invalid request';
				break;
		}
	} else {
		echo 'Permission denied';
	}
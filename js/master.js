$('document').ready(function () {
	var winW = $(window).width();
	var maxTime = 30;			// time to start counter down
	var preload = 1000;			// mini secends
	var delayPickPoint = 300;	// mini secends


	var CountDownTimer = function () {
		var time = $('.time');
		var start = maxTime;
		var delayTime = 100;	// ms
		var step = 0.1;			// grown up
		var tiv = null;

		this.run = function () {
			if (tiv == null) {
				sendRequest('running');
				question.show();
				var status = 'running';
				if(start >= 0) time.text(start.toFixed(0));

				tiv = setInterval(function () {
					$.ajax({
						'url': 'app/server.php?request=get-status',
						'success': function (result) {
							status = result;
						}
					});
					
					if (start < 0) {
						clearInterval(tiv);
						tiv = null;
						swal({
						  title: 'Hết giờ!',
						  text: "Hiển thị đáp án?",
						  type: 'error',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  allowOutsideClick: false,
						  confirmButtonText: 'Hiện đáp án'
						}).then(function() {
						  question.showAnswer();
						})
						
					} else if (status != 'running') {
						clearInterval(tiv);
						question.hidden();
						tiv = null;
						if (status == 'stop-1') {
							swal({
								title: 'Team 1 có ý kiến :D',
								text: "Hiển thị đáp án?",
								type: 'question',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								cancelButtonText: 'Sai rồi :P',
								allowOutsideClick: false,
								confirmButtonText: 'Chính xác :3'
							}).then(function() {
								question.showAnswer(function () {
									question.show();
									// point.show();
									// point.start('stop-1');
								}, "Xem lại");
							});
						}
						else if (status == 'stop-2') {
							swal({
								title: 'Team 2 có ý kiến :D',
								text: "Hiển thị đáp án?",
								type: 'question',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								cancelButtonText: 'Sai rồi :P',
								allowOutsideClick: false,
								confirmButtonText: 'Chính xác :3'
							}).then(function() {
								question.showAnswer(function () {
									question.show();
									// point.show();
									// point.start('stop-2');
								},"Xem lại");
								
							});
						}
						else if (status == 'stop-m') {
							swal({
								title: 'Master có ý kiến :D',
								text: "Hiển thị đáp án?",
								type: 'question',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								cancelButtonText: 'Sai rồi :P',
								allowOutsideClick: false,
								confirmButtonText: 'Chính xác :3'
							}).then(function() {
								question.showAnswer();
							});
						}
					} else {
						time.text(start.toFixed(0));
						start -= step;
					}
				}, delayTime);
			}
		}

		this.stop = function () {
			clearInterval(tiv);
			question.hidden();
			tiv = null;
		}

		this.reset = function () {
			start = maxTime;
			time.text(start);
		}

		this.isRunning = function () {
			return tiv !== null;
		}
	}

	// handling heath point
	var Heath = function () {
		var heath1 = $('.heath-1');
		var heath2 = $('.heath-2');
		var point1 = $('.point-1');
		var point2 = $('.point-2');
		var pointData = null;

		this.setPoint = function (p1, p2, add = false) {
			if (add == true) {
				p1 += pointData.point1;
				p2 += pointData.point2;
			}

			var max = $('.status').width()-4;
			point1.html(p1);
			point2.html(p2);
			pointData.point1 = p1;
			pointData.point2 = p2;

			heath1.css({'width': p1/(p1+p2)*max});
			heath2.css({'width': p2/(p1+p2)*max});		
		}

		this.load = function () {
			$.get('app/pointData.json', function (d) {
				pointData = d;
			});
		}

		this.push = function () {
			$.get("app/server.php?request=pushPoint&pointData="+JSON.stringify(pointData));
		}

		this.reload = function () {
			this.setPoint(pointData.point1, pointData.point2);
		}
	}

	// handling question
	var Question = function () {
		var questionData = null;
		var length = 0;
		var questLabel = $('.quest-num');
		var img = $('.bg');
		var cur = 0;

		this.load = function () {
			$.get('questions/questionData.json', function (d) {
				questionData = d;
				length = d.length;
				questLabel.text('Câu 1/'+length);
			});
		}

		this.show = function () {
			sendRequest('update-img&img='+'questions/img/'+questionData[cur].img);
			img.attr('src', 'questions/img/'+questionData[cur].img);

			document.getElementById('mp3').play();
		}

		this.hidden = function () {
			sendRequest('update-img&img=img/ready.jpg');
			img.attr('src', 'img/ready.jpg');
			document.getElementById('mp3').pause();
		}

		this.next = function () {
			if (cur < length-1) {
				cur++;
				questLabel.text('Câu '+ (cur+1) + '/' + length);
				img.attr('src', 'img/ready.jpg');
				countDownTimer.reset();
				countDownTimer.stop();
			}
		}

		this.pre = function () {
			if (cur > 0) {
				cur--;
				questLabel.text('Câu '+ (cur+1) + '/' + length);
				img.attr('src', 'img/ready.jpg');
				countDownTimer.reset();
				countDownTimer.stop();
			}
		}

		this.showAnswer = function (then = null, btn = 'OK') {
			swal({
				title: 'Đáp án',
				text: questionData[cur].answer,
				type: 'success',
				allowOutsideClick: false,
				confirmButtonText: btn
			}).then(then);
		}
	}

	var Point = function () {
		var running = false;
		var box = $('table.pick-point');
		var td = $('table.pick-point td');
		var pointValues = [];
		var hidden = true;

		this.load = function () {
			$.get('app/pointValues.json', function (result) {
				pointValues = result;
				for (var i = td.length - 1; i >= 0; i--) {
					td.eq(i).text(pointValues[i]);
				}
			})
		}

		this.start = function (team) {
			if (!running && !hidden) {
				running = true;
				var x= 0;
				$.get('app/server.php?request=running');
				var ease = 1;
				var tiv = setInterval(function () {
					if (ease++ % 3 == 0) {
						x = Math.floor((Math.random() * 12));
						td.attr('class', '');
						td.eq(x).attr('class', 'active');
					}

					$.get('app/server.php?request=get-status', function (result) {
						if (result == team || result == 'stop-m') {
							clearInterval(tiv);
							running = false;
							if (result == 'stop-1') {
								// add point to team 1
								heath.setPoint(pointValues[x], 0, 1);
								heath.push();
							} else if (result == 'stop-2') {
								// add point to team 2
								heath.setPoint(0, pointValues[x], 1);
								heath.push();
							}
						}
					});
				}, delayPickPoint/3);
			}
		}

		this.show = function () {
			if (hidden) {
				box.css({'top': '20%', 'transform': 'rotate(0deg)'});
				hidden = false;
			} else {
				box.css({'top': '150%', 'transform': 'rotate(45deg)'});
				hidden = true;
			}
		}
	}

	var ChatBox = function () {
		var box = $('.chat-box');
		var txt = $('.chat-box .txt');
		var lineHeight = 30;
		var curHeight = -30;
		var tiv = null;
		var length = 0;
		var maxLength = 10000;
		var timeShowMsg = 3000; // mini secends
		var size = 2; 			// line heigt of box
		var grow = 1;
		var maxLineBox = 12;
		var delayMsg = 3000;

		this.getMsg = function () {
			var nextMsg = this.nextMsg;
			$.get('app/server.php?request=get-msg', function (msg) {
				if (msg != '') {
					txt.append('<br>'+msg);
					curHeight -= lineHeight;
					txt.css({'top': curHeight});
					length++;
				}
			});
		}

		this.start = function () {
			var getMsg = this.getMsg;
			tiv = setInterval(function () {
				getMsg();
				if (length > maxLength) {
					txt.html('');
					length = 0;
					curHeight = 0;
				}

			}, delayMsg);
		}

		this.stop = function () {
			clearInterval(tiv);
			tiv = null;
		}

		this.extraBox = function () {
			if (size > maxLineBox || size < 1) grow = grow*-1;
			size += grow;
			
			$('.chat-box').css({'height': 30*size});
			$('.chat-box-bg').css({'height': 30*size});
			curHeight += grow*30;
			txt.css({'top': curHeight});
		}
	}

	function sendRequest(r) {
		$.ajax({
			"url": "app/server.php?request="+r
		});
	}

	var countDownTimer = new CountDownTimer();
	var heath = new Heath();
	var question = new Question();
	var point = new Point();
	var chatBox = new ChatBox();

	heath.load();
	question.load();
	point.load();

	// start chat box
	chatBox.start();
	$('.time').text(maxTime);







	// clear preload
	setTimeout(function () {
		$('.preloading').css({'opacity': 0});
		heath.reload();
	}, preload);

	// keybroad controllers
	var fullScreen = false;
	$(window).on('keyup', function(event) {
		switch(event.key) {
			case 'r':
				countDownTimer.run();
				break;

			case 's':
				countDownTimer.stop();
				$.get('app/server.php?request=stop-m');
				swal({
					title: 'Stop by master!',
					text: "Hiển thị đáp án?",
					type: 'error',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					allowOutsideClick: false,
					confirmButtonText: 'Hiện đáp án'
				}).then(function() {
					question.showAnswer();
				});
				break;

			case 'ArrowUp':
				question.next();
				break;

			case 'ArrowDown':
				question.pre();
				break;

			case '1':
				point.start('stop-1');
				break;

			case '2':
				point.start('stop-2');
				break;

			case 'f':
				if (fullScreen) {
					$('.bg').attr('class', 'bg');
					fullScreen = false;
				} else {
					$('.bg').attr('class', 'bg full');
					fullScreen = true;
				}
				break;

			case 't':
				chatBox.getMsg();
				break;

			case 'p':
				point.show();
				break;

			case 'e':
				chatBox.extraBox();
				break;

			default:
				break;
		}
	});

	$(window).resize(function () {
		heath.reload();
	})
})


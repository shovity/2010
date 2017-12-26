$('document').ready(function () {
	/**
	 *
	 * Menu right
	 */
	var Menu = function () {
		var menuIcon = $('#menu-icon');
		var menu = $('#menu');
		var open = false;

		this.open = function () {
			menu.css({"left": "15%"});
			menuIcon.attr("class", "menu-close");
			open = true;
		}

		this.close = function () {
			menu.css({"left": "100%"});
			menuIcon.attr("class", "");
			open = false;
		}

		this.isOpen = function () {
			return open;
		}

		return this;
	}
	
	/**
	 * send request to server
	 * @param string r
	 */
	function sendRequest(r) {
		$.ajax({
			"url": "app/server.php?request="+r
		});
	}

	var user = '';
	$.ajax({
		"url": "app/server.php?request=get-user",
		"success": function (result) {
			user = result;
		}
	});

	$('#stop').click(function () {
		if (user == 'team1') {
			sendRequest('stop-1');
		} else if (user == 'team2') {
			sendRequest('stop-2');
		}
	});

	var menu = new Menu();

	$('#menu-icon').click(function () {
		if (menu.isOpen()) {
			menu.close();
		} else {
			menu.open();
		}
	});

	var msg = document.getElementById('msg');
	$('#send').on('click', function () {
		if (msg.value.length > 96 || msg.value.length < 5) {
			swal("Tin nhắn phải lớn hơn 5 và nhỏ hơn 96 kí tự");
		} else {
			$.get('app/server.php?request=send-msg&msg='+msg.value);
			msg.value = '';
		}
	});

	$('title').append("-" +userName);
	$('.logo span').append(" - " +userName);

	// send join to server
	function joinSever(msg) {
		var x = navigator.userAgent.split("(")[1];
		x = x.split(")")[0];
		msg = userName + " - " + msg + " (" + x + ") đã tham gia vào game, ae quẩy đê =]z";
		$.get('app/server.php?request=send-msg&msg='+msg);
	}

	var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
	findIP.then(ip =>  joinSever(ip)).catch(e => console.error(e))
});
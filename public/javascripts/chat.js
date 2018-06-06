$(function(){
	var socket = io.connect('http://172.16.2.40'); // ここをlocalhostからローカルIPに変更すると、ローカルネットワーク内で連携できる

	var addLog = function(n,m,myself) {
		var now = new Date();
		var name = '<th>' + n + '</th>',
			message = '<td>' + m + '</td>';
			time = '<td>' + now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate() + ' [' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ']</td>';

		return '<tr' + (myself? ' class="myself"' : '') + '>' + name + message + time + '</tr>';
	}

	socket.on('message', function (data) {
		$('#log').prepend(addLog(data.bandleName, data.text));
	});

	$('#text').on('keydown', function(e){
		var name = $('#name').val() || '(匿名希望)';
		var val = $(this).val();
		if(e.keyCode == 13 && val !== '') {

			socket.emit('message', {
				text: val,
				bandleName: name
			});
			$('#log').prepend(addLog(name, val, true));
			$(this).val('');
		}
	});
});

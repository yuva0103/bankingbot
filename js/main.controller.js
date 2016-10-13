angular.module('bot', []).controller('mainController', function($scope, $http, $sce) {
	var ctrl = this;
	ctrl.query = "hi i'm yuvaraj";
	ctrl.botAnswer = '';
	ctrl.version = '20160526';




	var formatDate = function(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ampm;
		return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + strTime;
	};

	ctrl.sessionId = formatDate(new Date());

	ctrl.chatWithBot = function() {
		$http({
			method: 'JSONP',
			url: 'https://api.wit.ai/message',
			params: {
				callback: 'JSON_CALLBACK',
				q: ctrl.query,
				v: ctrl.version,
				access_token: 'IWGP3TVMWNRIXEYZ5WCA3ODYJQNG6W7J'

			}
		}).then(function(response) {
			console.log(response.data.entities.contact[0].value);
			ctrl.sendConverse(response.data.entities.contact[0].value);
		});
	};

	ctrl.sendConverse = function(paramValue) {
		$http({
			method: 'POST',
			url: 'https://api.wit.ai/converse?v=20160526&access_token=IWGP3TVMWNRIXEYZ5WCA3ODYJQNG6W7J&session_id=' + ctrl.sessionId,
			data: {
				user: paramValue,
				q: ctrl.query
			}
		}).then(function(response) {
			ctrl.botAnswer = ctrl.analyseConverse(response);
		});
	};

	ctrl.analyseConverse = function(converseResponse) {
		console.log(converseResponse.data);
        if(converseResponse.data.type == 'msg') {
           return converseResponse.data.msg; 
        }
	};




});
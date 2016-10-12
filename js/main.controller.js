angular.module('bot', []).controller('mainController', function($scope,$http,$sce) {
    var ctrl = this;
    ctrl.query = '';
    ctrl.botAnswer = '';

    
    ctrl.chatWithBot = function(){
        
       var apiurl = 'https://api.wit.ai/message';//?access_token=IWGP3TVMWNRIXEYZ5WCA3ODYJQNG6W7J&q=' + ctrl.query ; //+ '&callback=JSON_CALLBACK';
       $.ajax({
        url: apiurl,
        data: {
          'q': 'hello',
          'access_token' : 'IWGP3TVMWNRIXEYZ5WCA3ODYJQNG6W7J'
        },
        dataType: 'jsonp',
        method: 'GET',
        success: function(response) {
           
            console.log("success!", response);
        }
     });
    };
});
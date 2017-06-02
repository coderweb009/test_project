app.controller('notification_Ctrl',  function($scope,$http,intersetservice){
$scope.notifyData= JSON.stringify({
        "user_id": localStorage.UserId,
    });


intersetservice.getNotifications($scope.notifyData).then(function(res){
	console.log(res)
})	
})
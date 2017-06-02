app.controller('discover_ctrl', function($scope,$http,intersetservice,$ionicLoading,$timeout){
    $scope.$on('$stateChangeSuccess', function() {

$scope.matchData= JSON.stringify({
"user_id": localStorage.UserId,
"lat":lat,
"long":longt
});
 $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });


$scope.matchDataRes=[];

intersetservice.getMatched($scope.matchData).then(function(res){

  
$scope.matchDataRes=res.data.data;
$timeout(function(){
	$ionicLoading.hide()
},500)
 
 console.log($scope.matchData)



})


/*Chat function*/
var chat_user=[];
var click_count=2;
$('body').on('click','.discover_item',function(){
	$(this).toggleClass('active');
	var uid=$(this).attr('uid');
	var name=$(this).attr('data-name');
	chat_user.push({'uid':uid,'name':name});
	var $this=$(this); 
	$timeout(function(){
		
		console.log($this.hasClass('active'));

if(!$this.hasClass('active')){
	
	for(i=0;i<chat_user.length;i++){
		if(chat_user[i].uid==uid){
			chat_user.splice(i);
		}
	}
 
} else{
 

}


if(chat_user.length>0){
	$('.chat_btn').stop(true,true).fadeIn();
	$('#onechat').attr('href','#/one-one-chat?uid='+uid+'&&name='+name)
}else{
	console.log(chat_user);
	$('.chat_btn').hide();
}

},200)
click_count++;
});

 

});

})
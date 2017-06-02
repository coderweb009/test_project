

var jss = [];
var fbItem = [];
var oldUser=0;
 app.controller('login_ctrl',function($scope,$http,$state){
    
 


	 $scope.fb_login=function(){
   var fbLoginSuccess = function(userData) {
console.log("UserInfo: " + userData);
facebookConnectPlugin.api(userData.authResponse.userID + "/?fields=id,email,first_name,last_name,birthday,gender", ["user_birthday"],
function(result) {
console.log("Result: " + JSON.stringify(result));
fbItem.push([{ "id": result.id, "email": result.email, "gender": result.gender, "name": result.first_name + ' ' + result.last_name, "dob": result.birthday }]);

setTimeout(function() {
sendData();
 }, 500)
 },
function(error) {
console.log("Failed: " + JSON.stringify(error));
});
};
facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
function loginError(error) {
console.error(error)
}); 
}
 function sendData($scope) {
    $http({
         url: 'http://clixlogix.org/test/icebreaker/index.php/Users/fbSignup',
         method: "POST",
         data: JSON.stringify({
         "fb_user_id": fbItem[0][0].id,
         "image_url": "https://graph.facebook.com/" + fbItem[0][0].id + "/picture?type=large",
         "name": fbItem[0][0].name,
         "email": fbItem[0][0].email,
         "gender": fbItem[0][0].gender,
         "dob": fbItem[0][0].dob,
         "lat":"0",
         "long": "0"
        }),
    })
    .then(function(response) {
        console.log(response)
           if(response.data.status==1){
            if(response.data.old_user==1){
            $state.go('profile');
            }else{
            $state.go('addinterest');
            }
            localStorage.setItem("UserId",response.data.data[0].id);
            localStorage.setItem("userName",response.data.data[0].name);
            localStorage.setItem("userImage",response.data.data[0].image_url);

 
        socket.emit('joinRoom',{
        userId:localStorage.UserId,
        name:localStorage.userName,
        avatar:localStorage.userImage
        });

          socket.on('joinRoom',function(res){
    console.log(res);
    })



           }
    }, 
    function(response) { // optional
    // failed
    });
}
})
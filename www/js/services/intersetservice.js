var baseURl = 'http://clixlogix.org/test/icebreaker/index.php/Users/'


app.service('intersetservice',  function($http){

	return{
		getInterst: function(data) {
			return $http.post(baseURl+'getInterestItems', data);
		},
		updateInterst:function(data){
			return $http.post(baseURl+'insertUserInterest', data);
		},
		getprofile:function(data){
			return $http.post(baseURl+'getProfile', data);
		},
		getMatched:function(data){
			return $http.post(baseURl+'getMatched', data);
		},
		getNotifications:function(data){
			return $http.post(baseURl+'getNotifications', data);
		},
		insertService:function(data){
			return $http.post(baseURl+'getNotifications', data);
		}
 		

	}
})
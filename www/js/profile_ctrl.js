app.controller('profile_ctrl', function($scope, $http, intersetservice, $ionicLoading, $timeout) {
    $scope.prfoledata = [];
    $scope.data = JSON.stringify({
        "user_id": localStorage.UserId,
    });

    $scope.profileInterest = [];
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });


    intersetservice.getprofile($scope.data).then(function(res) {
        console.log(res.data.data[0].interests)
        $scope.prfoledata = res.data.data;
        $scope.profileInterest = res.data.data[0].interests
        $timeout(function() {
            $ionicLoading.hide();
        }, 500)

    })


})

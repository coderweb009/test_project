// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionMDRipple']);

var prvl;
var prvlong;
var dist;
var socket;
var locationIsEnable;
var locationIsPermissionAcess;
var lat = 28.6618976,
    longt = 77.2273958

app.run(function($ionicPlatform) {







    $ionicPlatform.ready(function() {



        function onSuccess(position) {
            lat = position.coords.latitude;
            longt = position.coords.longitude;

        };


        // onError Callback receives a PositionError object
        //
        function onError(error) {
            // alert(error);
        }

        var options = {
            maximumAge: 3600000,
            timeout: 30000,
            enableHighAccuracy: true,
        }
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);



        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});





app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'login_ctrl',
        })
        .state('addinterest', {
            url: '/addinterest',
            templateUrl: 'templates/addinterest.html',
            controller: 'addInterest',
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profile_ctrl',
        })
        .state('discover', {
            url: '/discover',
            templateUrl: 'templates/discover.html',
            controller: 'discover_ctrl',
        })

      .state('oneChat', {
            url: '/one-one-chat',
            templateUrl: 'templates/one-one-chat.html',
            controller: 'singleChatCtrl',
        })
        .state('notification', {
            url: '/notification',
            templateUrl: 'templates/notification.html',
            controller: 'notification_Ctrl',
        })

        .state('setting', {
            url: '/setting',
            templateUrl: 'templates/setting.html',
            controller: 'setting_ctrl',
        })

        .state('profileSetting', {
            url: '/profileSetting',
            templateUrl: 'templates/profile-setting.html',
            controller: 'profile_setting',
        })

    $urlRouterProvider.otherwise('/login');
});



app.directive('fbImage', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.css({
                'background-image': 'url(' + attrs.fbImage + ')',
                'background-size': 'cover',
                'background-position': 'center',
                'margin': 'auto'
            });
        }
    };
}]);


$('.tab_sec_bott').click(function() {
    $(this)
})




app.controller('mainCtr', function($scope, $state) {


    socket = io.connect('http://192.168.1.3:8080');



    $scope.$on('$stateChangeSuccess', function() {

        $('#onechat').css('display','none')

        console.log($state)
        if ($state.current.name == "login" || $state.current.name == "addinterest" || $state.current.name == "oneChat" || $state.current.name=="setting" || $state.current.name=="notification") {
            $('.tab_sec_bott').hide();
        } else {
            $('.tab_sec_bott').show();

        }

        if ($state.current.name != "addinterest") {
            $('.submit_ineterst').addClass('hide');
        } else {
            $('.submit_ineterst').removeClass('hide');

        }


        if ($state.current.name == "profile") {
            $('.tab_sec_bott li').removeClass('active');
            $('.tab_sec_bott li#profile').addClass('active');
        } else if ($state.current.name == "discover") {
            $('.tab_sec_bott li').removeClass('active');
            $('.tab_sec_bott li#discover').addClass('active');
        }
    })

    $scope.notification_page = function() {
        $state.go('notification')
    }
    $scope.back=function(){
   window.history.go(-1);
    }
})

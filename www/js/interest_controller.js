app.controller('addInterest', function($scope, intersetservice, $ionicPopup,$state, $ionicLoading, $timeout, $ionicModal) {
    $scope.data = JSON.stringify({
        "user_id": localStorage.UserId
    })
    $scope.interest = [];



    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });


    intersetservice.getInterst($scope.data).then(function(res) {
        $scope.interest.push(res.data.data);
        $timeout(function() {
            $ionicLoading.hide();
        }, 200)
    })



    interest_record = [];

    $scope.modal = $ionicModal.fromTemplate('<ion-modal-view>' +
        '<div class="interest_popup">' +
        '<div class="pop_header"><h4></h4></div>' +
        '<div class="pop_content">' +
        '<textarea name="" id="" data-role="none"></textarea>' +
        '<button type="btn" data-role="none">Submit</button>' +
        '</div>' +
        '</div>' +
        '</ion-modal-view>', {
            scope: $scope,
            animation: 'slide-in-up'
        })



    $scope.interestData = [];

  


        $('.submit_ineterst').click(function() {
            var data = [];
            for (var i = 0; i < interest_record.length; i++) {
                $scope.interestData.push({ "Interest_id": interest_record[i][0].id, "answer": interest_record[i][0].Interest_answer });
            }
            $ionicLoading.show();

  $scope.ineterstData = JSON.stringify({
            "user_id": localStorage.UserId,
            data: $scope.interestData,
        }),


            intersetservice.updateInterst($scope.ineterstData).then(function(res) {
                // $scope.interest.push(res.data.data);

                $timeout(function() {
                    $ionicLoading.hide();
                $state.go('profile')
                }, 200);

            })


        });



    $('body').on('click', '.pop_content button', function() {
        var ans = $(this).parents('.pop_content').find('textarea').val();
        var id = $(this).attr('data-id');
        interest_record.push([{ "id": id, "Interest_answer": ans }]);
        var ans = $(this).parents('.pop_content').find('textarea').val('');

        $scope.modal.hide()
    })



    $('body').on('click', function() {
        var ln = $('#interest-type li.active').length;
        if (ln > 0) {
            $('.submit_ineterst').stop(true, true).fadeIn();
        } else {
            $('.submit_ineterst').stop(true, true).fadeOut();
        }
    })



    $('body').on('click', '#interest-type li', function() {
        var $this = $(this);

        var q = $(this).attr('data-q');
        var id = $(this).attr('data-id');

        $(this).toggleClass('active');
        if ($this.hasClass('active') && $('#interest-type li.active').length < 11) {
            $scope.modal.show();
        }


        if ($this.hasClass('active') && $('#interest-type li.active').length < 11) {

            $('.pop_header h4').text(q);
            $('.pop_content button').attr('data-id', id);
        } else {
            for (var i = 0; i < interest_record.length; i++) {
                if (interest_record[i][0].id == id) {
                    interest_record.splice(i, 1);
                }
            }
        }


        if ($('#interest-type li.active').length > 10) {

            var alertPopup = $ionicPopup.alert({
                title: 'Only 10 Ineterst Allow !',
                template: 'Only 10 Ineterst Allow ! You are not a premium User'
            });
            alertPopup.then(function(res) {
                $this.removeClass('active')
            });
            last_active = $this;
        }

    })

})

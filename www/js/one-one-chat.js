app.controller('singleChatCtrl', function($scope, $ionicScrollDelegate, $ionicLoading, $timeout) {
    var lc = location.hash.split('?');
    var final_id = lc[1].split('uid=')[1].split('&')[0]

    var final_name = lc[1].split('uid=')[1].split('&')[1].split('name=')[1];


    socket.emit('chat-history', {
        sender: localStorage.UserId,
        receiver: final_id
    });



  $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });


    socket.on('chat-history', function(res) {
        console.log(res);


        for (i = 0; i < res.data.length; i++) {
            var date = res.data[i].time;
            // var hours = date.getHours();
            // var minutes = date.getMinutes();
            // var ampm = hours >= 12 ? 'pm' : 'am';
            // hours = hours % 12;
            // hours = hours ? hours : 12; // the hour '0' should be '12'
            // minutes = minutes < 10 ? '0'+minutes : minutes;
            // var strTime = hours + ':' + minutes + ' ' + ampm;
            console.log(res.data[i].from)
            if (res.data[i].from === Number(localStorage.UserId)) {
                var tmp = ' <div class="chat_reciver">' +
                    '<div class="body_reciver">' +
                    '<p>' + res.data[i].message + '</p>' +
                    '</div>' +
                    '<div class="tiem">' + date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[0] + '</div></div>'
                $('#messages').append(tmp);
            } else {
                var tmp = ' <div class="chat_sender">' +
                    '<div class="body_reciver">' +
                    '<p>' + res.data[i].message + '</p>' +
                    '</div>' +
                    '<div class="tiem">' + date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[0] + '</div></div>'
                $('#messages').append(tmp);
            }
        }
        $timeout(function(){
          $ionicLoading.hide();
		 $ionicScrollDelegate.scrollTo(0,  $('.chat_body').height(), true);

        },500) 

    })





    $('body').on('click', '#cht', function() {

        socket.emit('chat', {
            sender: Number(localStorage.UserId),
            receiver: Number(final_id),
            text: $('#m').val()
        });
    });



    var typing = false;
    var timeout = undefined;

    function timeoutFunction() {
        typing = false;
        socket.emit('typeout', {
            userId: localStorage.UserId,
            name: localStorage.userName,
            avatar: localStorage.userImage
        });
    }

    function onKeyDownNotEnter() {
        if (typing == false) {
            typing = true
            socket.emit('typing', {
                userId: localStorage.UserId,
                name: localStorage.userName,
                avatar: localStorage.userImage
            });
            timeout = setTimeout(timeoutFunction, 1500);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 1500);
        }

    }


    $('#m').keydown(function() {

        onKeyDownNotEnter();

    })





    socket.on('connect', function() {
        socket.on('typing', function(tp) {

            if (tp.userId != localStorage.UserId) {

                $('.sbdr_img img').attr('src', tp.avatar);
                $('.typings').addClass('active');
            }
        });

        socket.on('typeout', function(tp) {
            if (tp.userId != localStorage.UserId) {
                $('.typings').removeClass('active');
            }
        });

        socket.on('chat', function(messages) {
            console.log(messages)
            $('.typings').removeClass('active');
            var date = new Date()
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;

            if (messages.data.sender.userId === localStorage.UserId) {

                var tmp = ' <div class="chat_reciver">' +
                    '<div class="body_reciver">' +
                    '<p>' + messages.data.text + '</p>' +
                    '</div>' +
                    '<div class="tiem">' + strTime + '</div></div>'
                $('#messages').append(tmp);
            } else {


                var tmp = ' <div class="chat_sender">' +
                    '<div class="sbdr_img"><img src="' + messages.data.sender.avatar + '" alt="" /></div>' +
                    '<div class="body_reciver">' +
                    '<p class="sndr_name">' + messages.data.sender.name + '</p>' +
                    '<p>' + messages.data.text + '</p>' +
                    '</div>' +
                    '<div class="tiem">' + strTime + '</div></div>'
                $('#messages').append(tmp);
            }
            $('#m').val('');

            $('html,body').animate({ 'scrollTop': $('.chat_body').height() });

        });
    });

})

angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

// 關於我們
.controller('AboutCtrl', function ($scope, $rootScope, $log) {
    $log.info('進入關於我們頁面...');
})

// 活動列表
.controller('EventsCtrl', function ($scope, $http, $rootScope, $ionicActionSheet, $state, $log, $timeout) {
    $log.info('進入活動列表頁面...');
    // Ajax取資料時需顯示讀取中
    $scope.loading = true;
    $scope.getEvents = function () {
        $http.get('http://study4oct.azurewebsites.net/v1/events')
      .success(function (response) {
          $scope.events = response.data;
          $log.info('取得資料...',response.data);
          $scope.loading = false; // 關閉讀取中畫面
          $scope.$broadcast('scroll.refreshComplete');
      });
    };
    $scope.getEvents();

    // 進入到明細頁面
    $scope.detail = function (event) {
        $rootScope.event = event;
        $state.go('app.event', { id: event.id });
    };

})

// 明細頁面
.controller('EventCtrl', function ($scope, $stateParams, $log) {
    $log.info('進入活動明細頁面...');
    $log.info('ID',$stateParams.id);
})

// 問卷回饋
.controller('FeedbackCtrl', function ($scope, $http, $ionicLoading, $ionicPopup, $log) {
    $log.info('進入問卷回饋頁面...');
    $scope.loading = false;
    // 定義新增問卷的Model
    $scope.feedback = {
        skill: 0,
        eventContent: 0,
        speaker: 0,
        eventOverall: 0,
        suggest: '',
        future: ''
    }
    $scope.options = [
        { text: "非常不滿意", value: 1 },
        { text: "不滿意", value: 2 },
        { text: "普通", value: 3 },
        { text: "滿意", value: 4 },
        { text: "非常滿意", value: 5 }
    ];

    // 送出問卷
    $scope.submit = function (feedback) {
        $scope.show();
        $http.post('http://study4oct.azurewebsites.net/v1/feedback', feedback).then(function (response) {
            $scope.hide();
            $scope.showAlert(response.data.message);
        }, function (error) {
            $scope.showAlert(response.data.message);
            $scope.hide();
        });
    };

    $scope.showAlert = function (msg) {
        var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: msg
        });
    };

    $scope.show = function () {
        $ionicLoading.show({
            template: '讀取中...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };

})

// 系統資訊
.controller('InfoCtrl', function ($scope, $cordovaDevice, $cordovaCamera, $cordovaBarcodeScanner, $log) {
    $log.info('進入系統資訊頁面...');
    $scope.appDevice = {};
    document.addEventListener("deviceready", function () {
        $scope.appDevice.device = $cordovaDevice.getDevice();
        $scope.appDevice.cordova = $cordovaDevice.getCordova();
        $scope.appDevice.model = $cordovaDevice.getModel();
        $scope.appDevice.platform = $cordovaDevice.getPlatform();
        $scope.appDevice.uuid = $cordovaDevice.getUUID();
        $scope.appDevice.version = $cordovaDevice.getVersion();

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $scope.takePicture = function () {
            $cordovaCamera.getPicture(options).then(function (imageData) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // error
            });
        };

        $scope.takeBarcode = function () {
            $cordovaBarcodeScanner.scan()
            .then(function (barcodeData) {
                $scope.barcodeData = barcodeData;
                $log.info('Barcode...' + barcodeData)
            }, function (error) {
                $log.info('Barcode...' + error)
            });
        };


    }, false);
})


var app = angular.module('app.controllers', ['ngDialog', 'app.services', 'ui.router', 'app.directives']);
app.controller('WelcomeController',['$scope', 'ngDialog', '$state', function($scope, ngDialog, $state){
    'use strict';
    $scope.bodyclass = "welcome-body";
    $scope.showLoginModal = function() {
        ngDialog.open({
            template: 'views/partials/loginform.html',
            controller: 'LoginController'
        });
    };

}]);

app.controller('LoginController', function($scope, ngDialog, $state) {
   'use strict';
    $scope.showForgetPassModal = function() {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: 'views/partials/forgetpass.html',
            controller: 'ForgetController'
        });
    };
    $scope.login = function(userinfo) {
        ngDialog.close('ngdialog1');
        $state.go('home');
    }
});

app.controller('ForgetpassController', function($scope, ngDialog) {
   'use strict';

});


app.controller('HomeController', function($scope, ngDialog) {
    $scope.createNewFeed = function () {
        ngDialog.open({
            template: 'views/partials/create-new-feed.html',
            controller: 'CreateNewFeedController'
        })
    }
});
app.controller('CreateNewFeedController', ['$scope', '$upload','$timeout', function($scope, $upload, $timeout) {
    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
    $scope.onFileSelect = function($files) {
        $scope.dataUrls = [];
        $scope.selectedFiles = $files;
        for(var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }(fileReader, i);
            }
        }
    }
}])


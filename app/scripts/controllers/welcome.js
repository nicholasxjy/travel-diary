var app = angular.module('app.controllers', ['ngDialog']);
app.controller('WelcomeController', function($scope, ngDialog){
    'use strict';
	$scope.showLoginModal = function() {
        ngDialog.open({
            template: 'views/partials/loginform.html',
            controller: 'LoginController'
        });
    };
});

app.controller('LoginController', function($scope, ngDialog) {
   'use strict';
    $scope.showForgetPassModal = function() {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: 'views/partials/forgetpass.html',
            controller: 'ForgetController'
        });
    };
});

app.controller('ForgetController', function($scope, ngDialog) {
   'use strict';
    $scope.closeForgetPassModal = function() {
        ngDialog.close('ngdialog1');
    };
});
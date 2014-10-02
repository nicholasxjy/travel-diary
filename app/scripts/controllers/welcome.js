var app = angular.module('app.controllers', ['ngDialog', 'app.services', 'ui.router']);
app.controller('WelcomeController',['$scope', 'ngDialog', 'UserService', '$state', function($scope, ngDialog, UserService, $state){
    'use strict';
    $scope.showLoginModal = function() {
        ngDialog.open({
            template: 'views/partials/loginform.html',
            controller: 'LoginController'
        });
    };

    $scope.signUp = function(user) {
        UserService.signUp(user).then(function(res) {
            if (res.status === 'success') {
                $state.go('home');
            }
            console.log(res);
        }, function(err) {
            console.log("Sign up Error: ", err);
        });
    }
}]);

app.controller('LoginController', function($scope, ngDialog, UserService, $state) {
   'use strict';
    $scope.showForgetPassModal = function() {
        ngDialog.close('ngdialog1');
        ngDialog.open({
            template: 'views/partials/forgetpass.html',
            controller: 'ForgetController'
        });
    };
    $scope.login = function(userinfo) {
        UserService.login(userinfo).then(function(res){
            if (res.status === 'success') {
                $state.go('home');
            }
        }, function(err) {
            console.log("Login Error: ", err);
        });
    }
});

app.controller('ForgetController', function($scope, ngDialog) {
   'use strict';
    $scope.closeForgetPassModal = function() {
        ngDialog.close('ngdialog1');
    };
});


app.controller('HomeController', function($scope) {
    'use strict';

});
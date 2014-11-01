(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('LoginController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            '$timeout',
            loginCtrl
        ]);

        function loginCtrl($scope, ngDialog, $state, UserService, $timeout) {
          $scope.showForgetPassModal = function() {
              ngDialog.close('ngdialog1');
              ngDialog.open({
                  template: 'views/partials/forgetpass.html',
                  controller: 'ForgetController'
              });
          };
          $scope.submitLoginForm = function(user) {
              $scope.spinnerShow = true;
              UserService.logIn(user)
                .then(function(user) {
                  $timeout(function() {
                    $scope.spinnerShow = false;
                    // $scope.$emit('user:login', user);
                    $state.go('home');
                  }, 2000);
                }, function(error) {
                  $scope.spinnerShow = false;
                  $scope.errorMessage = error;
                  $scope.hasError = true;
                  $timeout(function() {
                    $scope.hasError = false;
                  });
                });
          }
        }
})();
(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('ForgetpassController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            '$timeout',
            forgetCtrl
        ]);

        function forgetCtrl($scope, ngDialog, $state, UserService, $timeout) {
            $scope.submitforgetForm = function(user) {
                $scope.spinnerShow = true;
                UserService.requestPasswordReset(user)
                    .then(function(msg) {
                        $scope.spinnerShow = false;
                        $scope.hasError = true;
                        $scope.errorMessage = 'you need to check your email, click the link to reset your password!';
                        $timeout(function() {
                            ngDialog.close('ngdialog1');
                            $state.go('login');
                        }, 5000);
                    }, function(error) {
                        $scope.spinnerShow = false;
                        $scope.errorMessage = error;
                        $scope.hasError = true;
                    })
            }
        }
})();
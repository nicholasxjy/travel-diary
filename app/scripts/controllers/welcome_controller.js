;(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('WelcomeController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            '$timeout',
            welcomeCtrl
        ]);

        function welcomeCtrl($scope, ngDialog, $state, UserService, $timeout) {
            $scope.submitSignUpForm = function(user) {
                $scope.spinnerShow = true;
                UserService
                    .signUp(user)
                    .then(function(user) {
                        if (user) {
                            $timeout(function() {
                                $scope.spinnerShow = false;
                                // $scope.$emit('user:signup', user);
                                $state.go('home');
                            })
                        }
                    }, function(error) {
                        $scope.spinnerShow = false;
                        $scope.errorMessage = error;
                        $scope.hasError = true;
                        $timeout(function() {
                            $scope.hasError = false;
                        }, 2000);
                    })
            }
        }
})();
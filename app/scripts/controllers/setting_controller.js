(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('SettingController', [
            '$scope',
            'UserService',
            setCtrl
        ]);

        function setCtrl($scope, UserService) {
            UserService.currentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                });
            $scope.$on('user:update', function(evt, user) {
                $scope.currentUser = user;
            });
        }
})();
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
            $scope.currentUser = UserService.currentUser();;
            $scope.$on('user:update', function(evt, user) {
                $scope.currentUser = user;
            });
        }
})();
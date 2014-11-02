(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('SetProfileController', [
            '$scope',
            '$state',
            'UserService',
            setProfileCtrl
        ]);

        function setProfileCtrl($scope, $state, UserService) {
            UserService.currentUser()
                .then(function(user) {
                    $scope.cUser = user;
                });
            $scope.submitProfileForm = function(userInfo) {
                UserService.updateInfo(userInfo)
                    .then(function(newUser) {
                        $scope.cUser = newUser;
                        $scope.$emit('user:update', newUser);
                    }, function(error) {
                        alert(error);
                    });
            }
        }
})();
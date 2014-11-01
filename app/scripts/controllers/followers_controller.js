(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('FollowersController', [
            '$scope',
            'ngDialog',
            '$state',
            followersCtrl
        ]);

        function followersCtrl($scope, ngDialog, $state) {

        }
})();
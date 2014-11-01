(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('FollowingsController', [
            '$scope',
            'ngDialog',
            '$state',
            followingsCtrl
        ]);

        function followingsCtrl($scope, ngDialog, $state) {

        }
})();
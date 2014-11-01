(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('UserController', [
            '$scope',
            'ngDialog',
            '$state',
            userCtrl
        ]);

        function userCtrl($scope, ngDialog, $state) {

        }
})();
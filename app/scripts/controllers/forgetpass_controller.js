(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('ForgetpassController', [
            '$scope',
            'ngDialog',
            '$state',
            forgetCtrl
        ]);

        function forgetCtrl($scope, ngDialog, $state) {

        }
})();
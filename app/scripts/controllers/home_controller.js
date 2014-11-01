;(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('HomeController', [
            '$scope',
            'ngDialog',
            '$state',
            '$rootScope',
            homeCtrl
        ]);

        function homeCtrl($scope, ngDialog, $state, $rootScope) {
          $scope.createNewFeed = function() {
              ngDialog.open({
                  template: 'views/partials/create-new-feed.html',
                  controller: 'CreateNewFeedController'
              });
          };
          $rootScope.$on('user:login', function(evt, user) {
            console.log(user.attributes);
          });
        }
})();
(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('CreateNewFeedController', [
            '$scope',
            '$upload',
            '$timeout',
            'UserService',
            'FeedService',
            'ngDialog',
            createCtrl
        ]);

        function createCtrl($scope, $upload, $timeout, UserService, FeedService, ngDialog) {
          UserService.currentUser()
            .then(function(user) {
              $scope.currentUser = user;
            });

          $scope.fileReaderSupported =
          window.FileReader != null
          &&
          (window.FileAPI == null || FileAPI.html5 != false);
          $scope.onFileSelect = function($files) {
              $scope.dataUrls = [];
              $scope.selectedFiles = $files;
              for (var i = 0; i < $files.length; i++) {
                  var $file = $files[i];
                  if ($scope.fileReaderSupported
                    &&
                    $file.type.indexOf('image') > -1) {
                      var fileReader = new FileReader();
                      fileReader.readAsDataURL($files[i]);
                      var loadFile = function(fileReader, index) {
                          fileReader.onload = function(e) {
                              $timeout(function() {
                                  $scope.dataUrls[index] = e.target.result;
                              });
                          }
                      }(fileReader, i);
                  }
              }
          }

          $scope.submitFeedForm = function(feed) {
            $scope.spinnerShow = true;
            console.log($scope.selectedFiles);
            var feedInfo = {
              content: feed.content,
              files: $scope.selectedFiles
            };
            FeedService.create(feedInfo)
              .then(function() {
                $scope.spinnerShow = false;
                ngDialog.close('ngdialog1');
                $scope.$emit('feed:new');
              }, function(error) {
                $scope.spinnerShow = false;
                alert('not cool:' + error);
              })
          }
        }
})();
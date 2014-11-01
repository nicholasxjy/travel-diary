(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('CreateNewFeedController', [
            '$scope',
            '$upload',
            '$timeout',
            createCtrl
        ]);

        function createCtrl($scope, $upload, $timeout) {
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
        }
})();
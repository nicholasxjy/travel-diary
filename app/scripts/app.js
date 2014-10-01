'use strict';

/**
 * @ngdoc overview
 * @name travelDiaryApp
 * @description
 * # travelDiaryApp
 *
 * Main module of the application.
 */
angular
  .module('travelDiaryApp', [
    'ui.router',
    'ngResource',
    'avoscloud'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'avoscloudProvider', function($stateProvider, $urlRouterProvider, avoscloudProvider) {
     avoscloudProvider.config({
      'X-AVOSCloud-Application-Id': 'n5kqlr9jl2xu4lw5ewn4zib9kx02iqxbo20gqr36soo8qrem',
      'X-AVOSCloud-Application-Key': '5upx5pwbr2u49wsgztcjauvwkzot1e9oe18mmioqm1hy3pkl'
    });
     $urlRouterProvider.otherwise("/");
     $stateProvider
        .state("welcome", {
          url: "/",
          templateUrl: "views/welcome.html",
          controller: "WelcomeController"
        })
  }])
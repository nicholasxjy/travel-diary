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
    'angular-loading-bar',
    'ngAnimate',
    'angularFileUpload',
    'angular-medium-editor',
    'app.controllers'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.otherwise('/');
     $stateProvider
        .state('welcome', {
          url: '/',
          templateUrl: 'views/welcome.html',
          controller: 'WelcomeController'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginController'
        })
        .state('forgetpass', {
          url: '/forgetpass',
          templateUrl: 'views/partials/forgetpass.html',
          controller: 'ForgetpassController'
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeController'
        })
        .state('settings', {
          url: '/setttings',
          templateUrl: 'views/settings.html',
          controller: 'SettingsController'
        })
        .state('user', {
          url: '/user/:id',
          templateUrl: 'views/user.html',
          controller: 'UserController'
        })
  }]);
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
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'angularFileUpload',
    'angular-medium-editor',
    'app.controllers',
    'app.services',
    'app.directives'
  ])
  .constant('AVOSCLOUD_CONFIG', {
    APPID: '3ekks4tku18g807f8q8nbatpp7rfgso6c4cod450q8tkwt3g',
    APPKEY: 'lsyme1jam9a80m8zcjdnxbd232869klbn0uplpei402ptitq'
  })
  .run(function(AVOSCLOUD_CONFIG) {
    if (!AV) {
      throw new Error('no avoscloud yet!')
      return;
    }
    AV.initialize(AVOSCLOUD_CONFIG.APPID, AVOSCLOUD_CONFIG.APPKEY);
  })
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
          templateUrl: 'views/settings.html',
          controller: 'SettingController'
        })
        .state('settings.profile', {
          url: '/settings/profile',
          templateUrl: 'views/partials/settings.profile.html',
          controller: 'SetProfileController'
        })
        .state('settings.avatar', {
          url: '/settings/avatar',
          templateUrl: 'views/partials/settings.avatar.html',
          controller: 'SetAvtarController'
        })
        .state('user', {
          url: '/user',
          templateUrl: 'views/user.html',
        })
        .state('user.posts', {
          url: '/:id',
          templateUrl: 'views/partials/user.posts.html',
          controller: 'UserController'
        })
        .state('user.followers', {
          url:'/:id/followers',
          templateUrl: 'views/partials/user.followers.html',
          controller: 'FollowersController'
        })
        .state('user.followings', {
          url:'/:id/followings',
          templateUrl: 'views/partials/user.followings.html',
          controller: 'FollowingsController'
        })
  }]);
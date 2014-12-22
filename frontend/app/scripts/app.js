'use strict';

/**
 * # bookmarkApp
 *
 * Main module of the application.
 */

var bookmarkApp = angular.module('bookmarkApp', ['ngCookies','ngResource','ngRoute','ngSanitize']);

  bookmarkApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    if(window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'signupCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/new', {
        templateUrl: 'views/new_bookmark.html',
        controller: 'newBookmarkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

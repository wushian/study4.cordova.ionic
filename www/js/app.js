﻿// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function ($ionicPlatform, $cordovaKeyboard) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        PushbotsPlugin.initialize("56235f331779593e3b8b4567");
        
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })
      .state('app.about', {
          url: '/about',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/about.html',
                     controller: 'AboutCtrl'
                 }
             }
      })
      .state('app.events', {
          url: '/events',
          views: {
              'menuContent': {
                  templateUrl: 'templates/events.html',
                  controller: 'EventsCtrl'
              }
          }
      })
    .state('app.event', {
        url: '/event/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            }
        }
    })
      .state('app.feedback', {
          url: '/feedback',
          views: {
              'menuContent': {
                  templateUrl: 'templates/feedback.html',
                  controller: 'FeedbackCtrl'
              }
          }
      })
    .state('app.info', {
        url: '/info',
        views: {
            'menuContent': {
                templateUrl: 'templates/info.html',
                controller: 'InfoCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/about');
});

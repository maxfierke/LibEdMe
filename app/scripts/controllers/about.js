'use strict';

/**
 * @ngdoc function
 * @name libedMeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the libedMeApp
 */
angular.module('libedMeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'Bootstrap (clearly)',
      'AngularJS',
      'Karma',
      'Yeoman',
      'Node.js & Express',
      'Heroku',
      'probably Coffee',
      'intrepid spirit'
    ];
  });

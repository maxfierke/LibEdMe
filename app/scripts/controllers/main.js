'use strict';

/**
 * @ngdoc function
 * @name libedMeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the libedMeApp
 */
angular.module('libedMeApp')
  .controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {

    $scope.showDetails = false;
    $scope.showAdvanced = false;

    $scope.errorMessage = '';

    $scope.selected = {
        libed: '',
        subject: '',
        theme: '',
        writing_intensive: false,
        course: null
    };

    $scope.courses = [];

    $scope.options = {
        libeds: [
            { code: '', title: 'any' },
            { code: 'AH', title: 'my Arts & Humanities' },
            { code: 'BIOL', title: 'my Biological Sciences'},
            { code: 'HIS', title: 'my Historical Perspectives' },
            { code: 'LITR', title: 'my Literature' },
            { code: 'MATH', title: 'my Mathematical Thinking' },
            { code: 'Phys', title: 'my Physical Sciences' },
            { code: 'Socs', title: 'my Social Sciences' }
        ],
        themes: [
            { code: '', title: 'Any' },
            { code: 'GP', title: 'Global Perspectives' },
            { code: 'TS', title: 'Technology and Society' },
            { code: 'CIV', title: 'Civic Life and Ethics' },
            { code: 'DSJ', title: 'Diversity and Social Justice in the U.S.' },
            { code: 'ENV', title: 'The Environment' }
        ],
        writing_intensive: [
            { val: null, label: 'is or isn\'t' },
            { val: true, label: 'is'},
            { val: false, label: 'isn\'t' }
        ]
    };

    $scope.buildUrlFromSelection = function () {
        var baseUrl = 'https://apps.asr.umn.edu/liberal_education_courses/courses.json?q=';
        var params = [];

        if ($scope.selected.libed != '') {
            params.push('diversified_core=' + $scope.selected.libed);
        }

        if ($scope.selected.theme != '') {
            params.push('designated_theme=' + $scope.selected.theme);
        }

        if ($scope.selected.writing_intensive != null) {
            params.push('writing_intensive='+$scope.selected.writing_intensive);
        }

        return baseUrl + params.join(",");
    };

    $scope.findForMe = function () {
        $scope.errorMessage = "";
        $scope.selected.course = null;

        return $http.get($scope.buildUrlFromSelection())
                .success(function (response) {
                    if (response.courses.length == 0) {
                        $scope.errorMessage = "No courses could be found to fulfill your requirements.";
                    }

                    $scope.courses = response.courses;
                    $scope.suggestACourse();
                })
                .error(function (response) {
                    $scope.errorMessage = "An error occured while trying to find relevant courses. Try again in a bit!"
                });
    };

    $scope.suggestACourse = function () {
        $scope.showDetails = false;
        $scope.selected.course = _.sample($scope.courses);
    };
  }]);

angular.module('root', [])
  .controller("index", ["$scope", function ($scope) {
    $scope.message = "Hello World!";
  }]);


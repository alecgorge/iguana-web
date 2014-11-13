var root = angular.module('root', ["ngResource", "services"])

.controller("index", ["$scope", "$resource", "Artist", "Year", function ($scope, $resource, Artist, Year) {
  var artists = $resource("http://localhost:9000/api/artists").get();

  artists.$promise.then(function(result) {
    $scope.artists = result.data;
  });

  $scope.years = Year.all();
}]);


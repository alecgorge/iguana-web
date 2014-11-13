var root = angular.module('root', ["services"])

.controller("index", ["$scope", "Artist", "Year", function ($scope, Artist, Year) {
  $scope.artists = Artist.all();
  $scope.years = Year.all();
}]);


// $.get("http://localhost:9000/api/artists", function(data) {
//   console.log(data);
// });

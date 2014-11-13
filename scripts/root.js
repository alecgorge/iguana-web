var root = angular.module('root', ["ngResource"])

.controller("index", ["$scope", "$resource", function ($scope, $resource) {
  var artists = $resource("http://localhost:9000/api/artists");
  var years = $resource('http://localhost:9000/api/artists/:artist_slug/years');
  var shows = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug');
  var recordings = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug/shows/:show_date');

  artists.get().$promise.then(function(result) {
    $scope.artists = result.data;
  });

  $scope.getYears = function(artist) {
    years.get({artist_slug: artist.id}).$promise.then(function(result) {
      $scope.years = result.data;
    });
  }

  $scope.getShows = function(artist, year) {
    shows.get({artist_slug: artist, year_slug: year}).$promise.then(function(result) {
      $scope.shows = result.data.shows;
    });
  }

  $scope.getRecordings = function(artist, year, show) {
    recordings.get({artist_slug: artist, year_slug: year, show_date: show}).$promise.then(function(result) {
      console.log(result);
      $scope.recordings = result.data[0].tracks;
    });
  }

}]);


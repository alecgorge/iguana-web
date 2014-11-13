var root = angular.module('root', ["ngResource"])

.controller("index", ["$scope", "$resource", function ($scope, $resource) {
  var artists = $resource("http://localhost:9000/api/artists");
  var years = $resource('http://localhost:9000/api/artists/:artist_slug/years');
  var shows = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug');
  var recordings = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug/shows/:show_date');

  var current_artist;
  var current_year;

  artists.get().$promise.then(function(result) {
    $scope.artists = result.data;
  });

  $scope.getYears = function(artist) {
    years.get({artist_slug: artist.id}).$promise.then(function(result) {
      current_artist = artist;
      $scope.years = result.data;
    });
  };

  $scope.getShows = function(year) {
    shows.get({artist_slug: current_artist.id, year_slug: year.year}).$promise.then(function(result) {
      current_year = year;
      $scope.shows = result.data.shows;
    });
  };

  $scope.getRecordings = function(show) {
    recordings.get({artist_slug: current_artist.id, year_slug: current_year.year, show_date: show.display_date}).$promise.then(function(result) {
      $scope.recordings = result.data[0].tracks;
    });
  };

  $scope.playSong = function(recording) {
    $scope.title = recording.title;
    $scope.artist = current_artist.name;

    var length = recording.length;
    var min = Math.floor(length/60);
    var sec = pad(length % 60, 2);
    $scope.total_time = min + ':' + sec;
  };

}]);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

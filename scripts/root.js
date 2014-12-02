var root = angular.module('root', ["ngResource", "mediaPlayer"])

.controller("index", ["$scope", "$resource", function ($scope, $resource) {
  var artists = $resource("http://localhost:9000/api/artists");
  var years = $resource('http://localhost:9000/api/artists/:artist_slug/years');
  var shows = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug');
  var recordings = $resource('http://localhost:9000/api/artists/:artist_slug/years/:year_slug/shows/:show_date');

  var current_artist;
  var current_year;
  var total_time_seconds;

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
    total_time_seconds = recording.length;

    console.log(recording.file);

    $scope.audio1.load([{ src: recording.file, type: 'audio/mp3' }, true]);

    $scope.audio1.playPause();

    var length = recording.length;
    var min = Math.floor(length/60);
    var sec = pad(length % 60, 2);
    $scope.total_time = min + ':' + sec;
    $scope.current_time = '0:00';
  };

  $scope.$watch("audio1.currentTime", function (newValue) {
    if(newValue) {
      var min = Math.floor(newValue/60);
      var sec = pad(Math.floor(newValue) % 60, 2);
      $scope.current_time = min + ':' + sec;
    } else {
      $scope.current_time = '';
    }

    $scope.current_time_percentage = newValue / total_time_seconds * 100 + '%';
  });

  $scope.nextSong = function() {
    console.log("nexter");
    $scope.audio1.next();
  };

  $scope.playButton = function() {
    $scope.audio1.playPause();
  }

}]);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

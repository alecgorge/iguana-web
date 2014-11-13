var root = angular.module('root', ["ngResource", "mediaPlayer"])

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

  $scope.morePlay = function() {
    console.log("More play");
    $scope.audio1.playPause();

    var length = Math.floor($scope.audio1.currentTime);
    var min = Math.floor(length/60);
    var sec = pad(length % 60, 2);
    $scope.current_time = min + ':' + sec;
  };

  $scope.nextSong = function() {
    console.log("nexter");
    $scope.audio1.next();
  };

  $scope.audioPlaylist = [
    {
      "src": "http://upload.wikimedia.org/wikipedia/en/0/0c/Wiz_Khalifa_-_Black_and_Yellow.ogg",
      "type": "audio/ogg"
    },
    {
      "src": "http://upload.wikimedia.org/wikipedia/en/7/79/Korn_-_Predictable_%28demo%29.ogg",
      "type": "audio/ogg"
    },
    {
      "src": "http://demos.w3avenue.com/html5-unleashed-tips-tricks-and-techniques/demo-audio.ogg",
      "type": "audio/ogg"
    }
  ];

}]);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

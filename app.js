// angular.module('root', ['root.controllers', 'root.services']);
angular.module('root', [])

.controller("index", ["$scope", function($scope) {
  $scope.artist = [
    {id: 1, name: "Hockey puck"},
    {id: 2, name: "Golf club"},
    {id: 3, name: "Baseball bat"},
    {id: 4, name: "Lacrosse stick"}
  ];
}]);

// .factory('Updates', function() {
//   var updates = [
//     { id: 0, header: 'Cookies!!', subheader: 'Come to the food bar for some dope ass cookies courtesy of Apple!' },
//     { id: 1, header: 'Check-in', subheader: 'Checkin is going on right now' },
//     { id: 2, header: 'Check-in', subheader: 'Checkin is going on right now' }
//   ];
//
//   return {
//     all: function() {
//       return updates;
//     }
//   }
// })

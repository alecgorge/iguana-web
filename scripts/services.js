angular.module('services', [])

.factory('Artist', function() {
  var artists = [
    {id: 0, name: 'Test0'},
    {id: 1, name: 'Test1'},
    {id: 2, name: 'Test2'}
  ];

  return {
    all: function() {
      return artists;
    }
  }
})

.factory('Year', function() {
  var years = [
    "1950",
    "1951",
    "1953",
    "1957",
    "1980"
  ];

  return {
    all: function() {
      return years;
    }
  }
});

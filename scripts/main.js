$(function() {
  $('#sign-in-modal').modal();
  seekLogic();
  window.iguanaScope.audio1.setVolume(.6);
  volumeLogic();
});

$('#magic2').click(function() {
  window.location = '/loggedin.html';
});

var seekLogic = function() {
  var seekPos;

  $('.player-progress-bar-wrapper').mousemove(function(e) {
    seekPos = e.pageX - $(this).children().offset().left - 5;
  });

  $('.player-progress-bar-wrapper').click(function(e) {
    var time = seekPos / $(this).children().width();
    window.iguanaScope.seekTo(time);
  });
};

var volumeLogic = function() {
  var volumePos;

  $('.volume-bar-wrapper').mousemove(function(e) {
    volumePos = e.pageX - $(this).children().offset().left - 5;
  });

  $('.volume-bar-wrapper').click(function(){
    var percent = volumePos / $(this).children().width();
    window.iguanaScope.audio1.setVolume(percent);
  });
};

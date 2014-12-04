$(function() {
  $('#sign-in-modal').modal();
  seekLogic();

  $('.list-group-item').click(function() {
    console.log("hmm");
  });

});

$('#magic2').click(function() {
  console.log("hi");
  window.location = '/loggedin.html';
});



var seekLogic = function() {
  var seekPos;

  $('.player-progress-bar-wrapper').mousemove(function(e) {
    seekPos = e.pageX - $(this).children().offset().left - 5;
  });

  $('.player-progress-bar-wrapper').click(function(e) {
    console.log($(this).children().width())
    console.log("seekpos: "+seekPos+". width: "+$(this).children().width());
    var time = seekPos / $(this).children().width();
    window.iguanaScope.seekTo(time);
  });
};

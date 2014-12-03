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

  $('.progress').hover(function(e) {
    $('#progress-seek').toggle();
  });

  $('.progress').mousemove(function(e) {
    seekPos = e.pageX - $(this).offset().left + 20;
    $('#progress-seek').css('left', seekPos + 'px');
  });

  $('.progress').click(function(e) {
    var time = (seekPos - 20) / 200;
    window.iguanaScope.seekTo(time);
  });
};

$(function() {
  $('#sign-in-modal').modal();
});

$('#magic').click(function() {
  console.log("hi");
  window.location = '/loggedin.html';
});


$('#magic2').click(function() {
  console.log("hi");
  window.location = '/loggedin.html';
});

// var audio;
// var first = true;
//
// $('#play').click(function() {
//   if(first) {
//     audio = new Audio('/test.mp3');
//     first = false;
//   }
//   audio.play();
//   $('#pause').toggle();
//   $('#play').toggle();
// });
//
// $('#pause').click(function() {
//   $('#pause').toggle();
//   $('#play').toggle();
//   audio.pause();
// });
//
// $('#fast-forward').click(function() {
//   audio.pause();
//   audio = new Audio('/music.mp3');
//   audio.play();
// });
//
// $('#fast-backward').click(function() {
//   audio.pause();
//   audio = new Audio('/test.mp3');
//   audio.play();
// });

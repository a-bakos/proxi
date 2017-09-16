/**
 * webCameraCommands module
 */

webCameraIsOpen = false;

function openCamera() {
  var video = document.querySelector('.stream-video');
  console.log("vedio");
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
  var stream;
  /*
  document.querySelector('.stream-start').onclick = function() {
    if (!navigator.getUserMedia) {
      alert('Sorry, this isn\'t happening for your browser.');
      return;
    }
    */
  navigator.getUserMedia(
    {
      video: true,
      audio: false
    },
    function(localMediaStream) {
      stream = localMediaStream;
      if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
      }
      else {
        video.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      video.play();
    },

    function(e) {
      alert('getUserMedia failed: Code ' + e.code);
    }

  );
/*
  document.querySelector('.stream-stop').onclick = function() {
		if (stream) { stream.stop(); }
	}
*/
};

(function intializeCamera() {
  openCamera();
})();

if (annyang) {
  var webCameraCommands = {

    'close (the) (web) camera': function() {
      soundPlayer(systemSounds.accept);
      voiceFeedback("closing camera");
      removeCamera();
      webCameraIsOpen = false;
      appendLastCommand("Close camera")
      removeScript("webCameraCommands");
    }
  };

  // Add commands to annyang
  annyang.addCommands(webCameraCommands);
}
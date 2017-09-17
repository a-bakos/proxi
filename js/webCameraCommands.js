/**
 * webCameraCommands module
 */

webCameraIsOpen = false;


// Build the whole camera element
function buildCamera(targetLocation = screen.side1) {

  var videoContainer = document.createElement("div");
  videoContainer.classList.add("webcam-video-container");

  var videoPlayer = document.createElement("video");
  videoPlayer.classList.add("stream-video");
  videoPlayer.setAttribute("autoplay", "");
  videoPlayer.setAttribute("controls", "");

  var videoButtonContainer = document.createElement("div");
  videoButtonContainer.classList.add("webcam-buttons");

  var videoButtonStreamStop = document.createElement("button");
  videoButtonStreamStop.innerHTML = "Stop";
  
  videoButtonStreamStop.classList.add("stream-button", "stream-stop");

  videoContainer.appendChild(videoPlayer);
  videoContainer.appendChild(videoButtonContainer);
  videoButtonContainer.appendChild(videoButtonStreamStop);

  targetLocation.appendChild(videoContainer);
}

// Remove the camera from the DOM
function removeCamera() {
  var videoContainer = document.querySelector(".webcam-video-container");
  videoContainer.parentElement.removeChild(videoContainer);
}

// Open the stream -- without audio
function openCameraStream() {
  var video = document.querySelector('.stream-video');
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
  var stream;

  navigator.getUserMedia({
    video: true,
    audio: false
    },

    function(localMediaStream) {
      stream = localMediaStream;
      video.src = (window.URL || window.webkitURL).createObjectURL(stream);
      video.play();
    },

    function(e) {
      alert('getUserMedia failed: Code ' + e.code);
    }
  );

  document.querySelector('.stream-stop').onclick = function() {
    soundPlayer(systemSounds.accept);
    removeCamera();
    appendLastCommand("Close camera")
    removeScript("webCameraCommands");
  };
}

(function intializeCamera() {
  voiceFeedback("Opening camera");
  buildCamera();
  openCameraStream();
  webCameraIsOpen = true;
  soundPlayer(systemSounds.accept);
  appendLastCommand("Camera opened")
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

// Full screen mode event listeners:
var video = document.querySelector("video");
enterFullScreenMode(video, video);
exitFullScreenMode(video, video);
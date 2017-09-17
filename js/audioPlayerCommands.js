/**
 * Audio player
 */

var audioPlayerIsOpen = false;

// Create the whole audio player element
function buildAudioPlayer(targetLocation = screen.side1) {
  // Build the wrapper
  var audioPlayerContainer = document.createElement("div");
  audioPlayerContainer.classList.add("audio-player-container");
  targetLocation.appendChild(audioPlayerContainer);

  // Build the audio player
  var audioPlayer = document.createElement("audio");
  audioPlayer.setAttribute("controls", "");
  audioPlayer.classList.add("music");
  audioPlayerContainer.appendChild(audioPlayer);

  // Load the music into the player
  var audioPlayerSource = document.createElement("source");
  audioPlayerSource.setAttribute("src", "files/music/globular–synchronicity-city-3.0.mp3");
  audioPlayer.appendChild(audioPlayerSource);
}

// Remove the audio player from the DOM
function removeAudioPlayer() {
  var audioPlayerContainer = document.querySelector(".audio-player-container");
  audioPlayerContainer.parentElement.removeChild(audioPlayerContainer);
}

function playAudio() {
  var music = document.querySelector(".music");

  if (music.paused) {
    music.play();
  }
}

function pauseAudio() {
  var music = document.querySelector(".music");

  if (music.play) {
    music.pause();
  }
}

// IIFE runs right after the audioPlayerCommands file has been loaded
(function initializeAudioPlayer() {
  appendLastCommand("Open audio player");
  buildAudioPlayer();
  audioPlayerIsOpen = true;
  return audioPlayerIsOpen;
})();

if (audioPlayerIsOpen === true) {
  soundPlayer(systemSounds.accept);
  voiceFeedback("playing music");
  appendLastCommand("Playing music");
  playAudio();
}
else {
  voiceFeedback("uh uh");
}


if (annyang) {
  var audioPlayerCommands = {

    'continue music': function() {
      soundPlayer(systemSounds.ok);
      playAudio();
      appendLastCommand("Resume music")
    },
    
    'stop music': function() {
      soundPlayer(systemSounds.ok);
      pauseAudio();
      appendLastCommand("Music paused")
    },

    'close audio player': function() {
      soundPlayer(systemSounds.accept);
      voiceFeedback("closing audio player");
      removeAudioPlayer();
      audioPlayerIsOpen = false;
      appendLastCommand("Close audio player")
      removeScript("audioPlayerCommands");
    }
  };

  // Add commands to annyang
  annyang.addCommands(audioPlayerCommands);
}
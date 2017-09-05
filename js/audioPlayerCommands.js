/**
 * Audio player
 */

var audioPlayerIsOpen = false;

// Create the whole audio player element
function buildAudioPlayer(targetLocation = sideScreen1) {
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
function removeAudioPlayer(targetLocation = sideScreen1) {
  var audioPlayerContainer = document.querySelector(".audio-player-container");
  targetLocation.removeChild(audioPlayerContainer);
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

(function initialize() {
  buildAudioPlayer();
  audioPlayerIsOpen = true;
})();

if (annyang) {
  var audioPlayerCommands = {

    'play': function() {
      if (audioPlayerIsOpen === true) {
        voiceFeedback("playing music");
        playAudio();
        appendLastCommand("Play music")
      }
      else {
        voiceFeedback("open the player first");
        appendLastCommand("Warning: open the player first")
      }
    },

    'stop music': function() {
      voiceFeedback("pausing music");
      pauseAudio();
      appendLastCommand("Music paused")
    },

    'close audio player': function() {
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
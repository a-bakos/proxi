"use strict";


// DOM element hooks

// Main screens
var screen1 = document.querySelector(".main-action-screen-1");
var screen2 = document.querySelector(".main-action-screen-2");
// Side screens
var sideScreen1 = document.querySelector(".side-screen-1");
var sideScreen2 = document.querySelector(".side-screen-2");
var sideScreen3 = document.querySelector(".side-screen-3");
// Status indicator
var statusLed = document.querySelector(".status-led");
var statusText = document.querySelector(".status-text");





/**
 * Detecting location using Geolocation API
 */
var userLocation = document.querySelector(".location");
var userLocationLatitude = document.querySelector(".location-latitude");
var userLocationLongitude = document.querySelector(".location-longitude");
var userLocationAltitude = document.querySelector(".location-altitude");
var userLocationAccuracy = document.querySelector(".location-accuracy");
var userLocationAltitudeAccuracy = document.querySelector(".location-altitude-accuracy");
var userLocationHeading = document.querySelector(".location-heading");
var userLocationSpeed = document.querySelector(".location-speed");
var userLocationTimestamp = document.querySelector(".location-timestamp");

var locationHomeLatitude = 51.455948;
var locationHomeLongitude = -0.9714347000000001;

if (navigator.geolocation) {
  // geolocation is available
  navigator.geolocation.getCurrentPosition(
    function(position) {
      /*
      position is an object containing various information about
      the acquired device location:
      position = {
          coords: {
              latitude - Geographical latitude in decimal degrees.
              longitude - Geographical longitude in decimal degrees.
              altitude - Height in meters relative to sea level.
              accuracy - Possible error margin for the coordinates in meters.
              altitudeAccuracy - Possible error margin for the altitude in meters.
              heading - The direction of the device in degrees relative to north.
              speed - The velocity of the device in meters per second.
          }
          timestamp - The time at which the location was retrieved.
      }
      */
      userLocationLatitude.innerHTML = position.coords.latitude;
      userLocationLongitude.innerHTML = position.coords.longitude;
      userLocationAltitude.innerHTML = position.coords.altitude;
      userLocationAccuracy.innerHTML = position.coords.accuracy;
      userLocationAltitudeAccuracy.innerHTML = position.coords.altitudeAccuracy;
      userLocationHeading.innerHTML = position.coords.heading;
      userLocationSpeed.innerHTML = position.coords.speed;
      userLocationTimestamp.innerHTML = position.timestamp;

      var targetElement = ".location-map";

      var userLocationMap = new GMaps({
        el: targetElement,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        mapType: "satellite",
        zoom: 19
      });

      userLocationMap.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    },
    // Optional error callback
    function(error){
      userLocation.innerHTML = error.message;
      /*
      In the error object is stored the reason for the failed attempt:
      error = {
      code - Error code representing the type of error
      1 - PERMISSION_DENIED
      2 - POSITION_UNAVAILABLE
      3 - TIMEOUT
      message - Details about the error in human-readable format.
      }
      */
    }
  );
}
else {
  // geolocation is not supported
}





/**
 * Clock -- date and time display
 * Function re-calls itself every 3 seconds.
 */
(function displayDateTime() {
  var dateDisplay = document.querySelector(".clock-date");
  var timeDisplay = document.querySelector(".clock-time");

  setTimeout(function() {
    var date        = new Date();
    // Set the day name
    var todaysNum   = date.getDay();    // 0-6
    var dayNames    = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var todaysName  = dayNames[todaysNum];
    // Set day number
    var dayNumber   = date.getDate();   // 1-31
    // Set month
    var currMonth   = date.getMonth();  // 0-11
    currMonth += 1;
    // Set time
    var currMinutes = date.getMinutes()
    var currHours   = date.getHours();

    if (dayNumber <= 9)   { dayNumber = "0" + dayNumber; }
    if (currMonth <= 9)   { currMonth = "0" + currMonth; }
    if (currHours <= 9)   { currHours = "0" + currHours; }
    if (currMinutes <= 9) { currMinutes = "0" + currMinutes; }

    var currentTime = currHours + ":" + currMinutes;

    var todaysDate  =  todaysName + " " + dayNumber + "-" + currMonth + "-" + date.getFullYear();

    dateDisplay.innerHTML = todaysDate;
    timeDisplay.innerHTML = currentTime;

    displayDateTime(); // Recursion.
    return currentTime;
  }, 3000);
})();






/**
 * Last commands section
 */
var lastCommandCounter = 0;
var lastCommand = document.querySelector(".last-command-list");

// Building and appending elements as command items to the last commands list:
function appendLastCommand(commandMessage) {
  // Get time
  var commandDate = new Date();
  var commandSeconds = commandDate.getSeconds()
  var commandMinutes = commandDate.getMinutes()
  var commandHours   = commandDate.getHours();

  if (commandHours <= 9) {
    commandHourss= "0" + commandHours;
  }
  if (commandMinutes <= 9) {
    commandMinutes = "0" + commandMinutes;
  }
  if (commandSeconds <= 9) {
    commandSeconds = "0" + commandSeconds;
  }

  var commandTime = commandHours + ":" + commandMinutes + ":" + commandSeconds;

  lastCommandCounter++;

  var lastCommandMessage = document.createElement("li");
  lastCommandMessage.classList.add("last-command-item", "command-" + lastCommandCounter);
  lastCommandMessage.innerHTML = commandTime + " " + commandMessage;
  lastCommand.insertBefore(lastCommandMessage, lastCommand.firstChild);
}

/**
 * Function for providing voice feedback
 */
function voiceFeedback(feedbackString, pitch = 1, rate = 1.25) {
  var commandFeedback = new SpeechSynthesisUtterance();
  commandFeedback.text = feedbackString;
  commandFeedback.pitch = pitch;
  commandFeedback.lang = 'en-US';
  commandFeedback.rate = rate;
  speechSynthesis.speak(commandFeedback);
}




/**
 * Google search links
 */
var googleURL = "https://www.google.co.uk/";
// Regular search:
var googleSearchFor = "https://www.google.co.uk/search?source=hp&q=";
// Image search:
var imageSearchStart = "https://www.google.co.uk/search?q=";
var imageSearchEnd = "&source=lnms&tbm=isch";
var googleImageSearchFor;






// Abstract function for reloading the page
function reloadPage() {
  voiceFeedback("reloading", 1, 1.5);
  document.location.reload(true); // Page reload. TRUE = reload current page from the server
  appendLastCommand("Flushing memory");
}


/**
 * Audio player
 */

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



/**
 * Annyang commands
 */
if (annyang) {
  var audioPlayerIsOpen = false;
  var url;

  var myWindow; // For new windows

  // Define commands. First the text, and then the function it should call
  var commands = {
    'open search': function() {
      voiceFeedback("Opening search.");
      url = googleURL;
      myWindow = window.open(url, "myWindow");
      appendLastCommand("Search opened")
    },

    'close search': function() {
      voiceFeedback("Closing search.");
      myWindow.close();
      appendLastCommand("Search window closed.")
    },

    'search for :expression': function(expression) {
      voiceFeedback("Searching for " + expression);
      url = googleSearchFor + expression;
      myWindow = window.open(url, "myWindow");
      appendLastCommand("Performed search for " + expression);
    },

    'show me :expression': function(expression) {
      voiceFeedback("Showing " + expression);
      googleImageSearchFor = imageSearchStart + expression + imageSearchEnd;
      myWindow = window.open(googleImageSearchFor, "myWindow");
      appendLastCommand("Performed image search for " + expression);
    },

    'go to :urlInput': function(urlInput) {
      voiceFeedback("Opening url: " + urlInput);
      urlInput = "http://" + urlInput;
      myWindow = window.open(urlInput, "myWindow");
      appendLastCommand("Go to url: <a href=\"" + urlInput + "\" target=_blank title=\"link from voice input\">" + urlInput + "</a>");
    },
    
    'name': function() {
      voiceFeedback("my name is Archie Sense.");
    },
    
    /* this is broken
    ':gratitude': {
      'regexp': /^(thanks|thank you|t h x|cheers|cheerio|one)$/,
      'callback': voiceFeedback("You're welcome.")
    },
*/

    'stop': function() {
      voiceFeedback("I'm stopping.");
    },

    // Reload page commands
    'reload': function() { reloadPage(); },
    'refresh': function() { reloadPage(); },
    'flush memory': function() { reloadPage(); },
    'empty memory': function() { reloadPage(); },
    'buffer flush': function() { reloadPage(); },

    'test': function() {
      statusLed.classList.add("status-processing");
      voiceFeedback("Test, check 1 2 3", 1, 2);
      appendLastCommand("Test command executed");
      statusLed.classList.remove("status-processing");
    },

    'shut down now': function() {
      voiceFeedback("Right. Goodbye for now.");
      annyang.abort();
      appendLastCommand("Shutting down");
      statusLed.classList.remove("status-listening");
      statusText.innerHTML = "Offline";
      statusLed.classList.add("status-shut-down");
    },

    '(take a) break': function() {
      voiceFeedback("Okay. Call me if you need me.");
      annyang.pause();
      statusText.innerHTML = "Away";
      statusLed.classList.remove("status-listening");
      statusLed.classList.add("status-away");
      appendLastCommand("Pause listening")
    },

    // does not work
    'online': function() {
      voiceFeedback("I'm back.");
      annyang.resume();
    },



    // Audio player commands
    'open audio player': function() {
      audioPlayerIsOpen = true;
      voiceFeedback("ok");
      buildAudioPlayer();
      appendLastCommand("Open audio player")
    },

    'play music': function() {
      if (audioPlayerIsOpen === true) {
        voiceFeedback("playing music");
        playAudio(); // autoplay for testing
        appendLastCommand("Play music")
      }
      else {
        voiceFeedback("open the player first");
        appendLastCommand("Warning: open the player first")
      }
    },

    'pause music': function() {
      voiceFeedback("pausing music");
      pauseAudio();
      appendLastCommand("Music paused")
    },

    'close audio player': function() {
      voiceFeedback("closing audio player");
      removeAudioPlayer();
      audioPlayerIsOpen = false;
      appendLastCommand("Close audio player")
    },



    'phonetic a': function() { voiceFeedback("alpha", 1, 1); },
    'phonetic b': function() { voiceFeedback("bravo", 1, 1); },
    'phonetic c': function() { voiceFeedback("charlie", 1, 1); }
  };

  // Add commands to annyang
  annyang.addCommands(commands);

  // Start listening. Call this here, or attach this call to an event, button, etc.
  annyang.start();
  annyang.debug(true);
  
  /**
   * Record voice input
   */
  annyang.addCallback('result', function(phrases) {
    var voiceInput = document.createElement("p");
    voiceInput.classList.add("voice-input");
    voiceInput.innerHTML = phrases[0];
    screen1.appendChild(voiceInput);

    console.log("I think the user said: ", phrases[0]);
    console.log("But then again, it could be any of the following: ", phrases);
  });
  
}



/*
// test this
var recognition =  new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-GB";

recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    console.log(interim_transcript,final_transcript);
};
recognition.start();

*/
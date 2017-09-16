"use strict";

/**
 * Defining system soundpaths
 */
var systemSounds = {
  accept: "files/sounds/accept.wav",
  append: "files/sounds/append.wav",
  error: "files/sounds/error.wav",
  loadLong: "files/sounds/loading-long.wav",
  loadMed: "files/sounds/loading-med.wav",
  loadShort: "files/sounds/loading-short.wav",
  ok: "files/sounds/ok.wav",
  reject: "files/sounds/reject.wav",
  warning: "files/sounds/warning.wav"
};

/**
 * General sound player for system sounds
 */
function soundPlayer(soundPath) {
  var sound = document.querySelector("#system-sound");
  sound.setAttribute("src", soundPath);

  if (sound.paused) {
    sound.play();
  }
}

/**
 * Functions to load on startup
 */
(function initApp() {
  soundPlayer(systemSounds.loadLong);
  displayDateTime();
})();


/**
 * Script loading
 *
 * Use it as: loadScript(filename[, folder]);
 * filename: string, required
 * folder: string, optional
 *
 * This function builds up a <script> element and appends it to the end of the
 * <body> tag.
 *
 * "filename" specifies the actual JS file to be included. Use the file's name
 * (without file extension) as the first and required parameter. This will also
 * be the #ID of this HTML element.
 *
 * "folder" is the path to the JS file you want to include. Leave the last
 * forward slash out.
 *
 * Examples:
 *
 * * 1. JS file is in the same folder: loadScript("your-js-file");
 * Result: <script type="text/javascript" src="your-js-file" id="your-js-file"></script>
 *
 * * 2. JS file in is another folder: loadScript("your-js-file", "js/components");
 * Result: <script type="text/javascript" src="js/components/your-js-file" id="your-js-file"></script>
 *
 * See also removeScript() function.
 */
function loadScript(filename, folder) {
  var scriptElem = document.createElement("script");
  var body = document.querySelector("body");
  scriptElem.type = "text/javascript";

  if (typeof folder === 'undefined') {
    scriptElem.src = filename + ".js";
  }
  else {
    scriptElem.src = folder + "/" + filename + ".js";
  }

  // Prevent scripts to be loaded more than once
  if (!document.querySelector("#" + filename)) {
    scriptElem.id = filename;
    body.appendChild(scriptElem);
    console.log("Added " + filename + " script to body.");
  }
  else {
    console.log("Module has already been loaded.")
  }
}

/**
 * Script removing
 *
 * Use it as: removeScript(filename);
 * filename: string, required
 *
 * Based on the filename, which is also an #ID, the functions removes the
 * <script> tag from the <body>.
 *
 * See also scriptLoading() function.
 */
function removeScript(filename) {
  var scriptElem = document.getElementById(filename);
  var body = document.querySelector("body");
  body.removeChild(scriptElem);
  console.log("Removed the " + filename + " script from body.");
}

/**
 * Page reloading
 */
function reloadPage() {
  voiceFeedback("reloading", 1, 1.5);

  // TRUE = reload current page from the server
  // FALSE = reload the page from cache
  document.location.reload(true);
  appendLastCommand("Flushing memory");
}

/**
 * Full screen mode
 *
 * FullScreen API -- it has to be triggered by the user, there is no way of
 * loading the page or an element right into full screen mode.
 *
 * elementToClick is the element that has to be clicked to trigger full screen
 * mode on targetElement.
 * Obviously, these elements have to be defined in a variable upfront.
 */
function enterFullScreenMode(elementToClick, targetElement) {
  elementToClick.addEventListener("click", function() {
    //targetElement.classList.add("in-full-screen-mode");
    var requestFullScreen = targetElement.requestFullscreen || targetElement.webkitRequestFullScreen;
    requestFullScreen.call(targetElement);
  });
}

function exitFullScreenMode(elementToClick, targetElement) {
  elementToClick.addEventListener("click", function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  });
}






/**
 * Defining screens
 */
var screen = {
  // Main action screens
  main1: document.querySelector(".main-action-screen-1"),
  main2: document.querySelector(".main-action-screen-2"),
  // Side screens
  side1: document.querySelector(".side-screen-1"),
  side2: document.querySelector(".side-screen-2"),
  side3: document.querySelector(".side-screen-3")
};

/**
 * GEOLOCATION
 *
 * Detecting location using Geolocation API
 */
var userLocation = {
  container: document.querySelector(".location"),
  latitude: document.querySelector(".location-latitude"),
  longitude: document.querySelector(".location-longitude"),
  altitude: document.querySelector(".location-altitude"),
  accuracy: document.querySelector(".location-accuracy"),
  altitudeAccuracy: document.querySelector(".location-altitude-accuracy"),
  heading: document.querySelector(".location-heading"),
  speed: document.querySelector(".location-speed"),
  timestamp: document.querySelector(".location-timestamp"),

  // Home coordinates:
  homeLatitude: 51.455948,
  homeLongitude: -0.9714347000000001
};

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

      // Showing general information, coordinates, altitude, whatever the object can offer
      userLocation.latitude.innerHTML = position.coords.latitude;
      userLocation.longitude.innerHTML = position.coords.longitude;
      userLocation.altitude.innerHTML = position.coords.altitude;
      userLocation.accuracy.innerHTML = position.coords.accuracy;
      userLocation.altitudeAccuracy.innerHTML = position.coords.altitudeAccuracy;
      userLocation.heading.innerHTML = position.coords.heading;
      userLocation.speed.innerHTML = position.coords.speed;
      userLocation.timestamp.innerHTML = position.timestamp;

      var targetElement = ".location-map"; // This is where to display the map

      var userLocationMap = new GMaps({
        el: targetElement,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        mapType: "satellite", // other available options: hybrid, terrain, roadmap
        zoom: 19 // the initial zoom level (increase/decrease with mouse wheel)
      });
/*
      // Add a marker:
      userLocationMap.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });*/
    },
    // Optional error callback
    function(error){
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
 * IIFE + re-calls itself every 3 seconds.
 */
function displayDateTime() {
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
  }, 3000);
};

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
 * Google links
 */
var googleService = {
  url: "https://www.google.co.uk/",
  searchFor: "https://www.google.co.uk/search?source=hp&q=", // Regular search

  searchForImageStart: "https://www.google.co.uk/search?q=",
  searchForImageEnd: "&source=lnms&tbm=isch"
};

/**
 * 
 * videoo
 * WIP
 * 
 */


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

var url;
var myWindow; // For new windows

/**
 * Annyang commands
 */
if (annyang) {

  // Define high-level commands.
  // First the text, and then the function it should call

  var searchCommands = {

    'video': function() {
      openCamera();
    },
    
    'open search': function() {
      voiceFeedback("Opening search.");
      url = googleService.url;
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
      url = googleService.searchFor + expression;
      myWindow = window.open(url, "myWindow");
      appendLastCommand("Performed search for " + expression);
    },

    'show me :expression': function(expression) {
      voiceFeedback("Showing " + expression);
      url = googleService.searchForImageStart + expression + googleService.searchForImageEnd;
      myWindow = window.open(url, "myWindow");
      appendLastCommand("Performed image search for " + expression);
    },

    'go to :urlInput': function(urlInput) {
      voiceFeedback("Opening " + urlInput);
      urlInput = "http://" + urlInput;
      myWindow = window.open(urlInput, "myWindow");
      appendLastCommand("Go to url: <a href=\"" + urlInput + "\" target=_blank title=\"link from voice input\">" + urlInput + "</a>");
    },
    
    // filesaver test
    'save': function() {
      saveAs(blob, "hello world.txt");
      console.log("save?");
    }
  };
  
    /* this is broken
    ':gratitude': {
      'regexp': /^(thanks|thank you|t h x|cheers|cheerio|one)$/,
      'callback': voiceFeedback("You're welcome.")
    },
*/
  var systemCommands = {
    // Reload page commands
    'reload':       function() { reloadPage(); },
    'refresh':      function() { reloadPage(); },
    'flush memory': function() { reloadPage(); },
    'empty memory': function() { reloadPage(); },
    'buffer flush': function() { reloadPage(); },

    'test': function() {
      voiceFeedback("Test, check 1 2 3", 1, 2);
      soundPlayer(systemSounds.accept);
      appendLastCommand("Test command executed");
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

    // Audio player
    'play music': function() {
      loadScript("audioPlayerCommands", "js");
    },

    'phonetic a': function() { voiceFeedback("alpha", 1, 1); },
    'phonetic b': function() { voiceFeedback("bravo", 1, 1); },
    'phonetic c': function() { voiceFeedback("charlie", 1, 1); }

  };



    var hiddenCommands = {
    // "Get to the post office":
    'load post office': function() {
      voiceFeedback("loaded");
      appendLastCommand("Loaded email module");
      loadScript("hiddenCommands", "js")
    }
 };

    var noteCommands = {
    // Get to the post office:
    'note': function() {
      loadScript("notepadCommands", "js")
    }

  };

  // Add commands to annyang
  annyang.addCommands(searchCommands);
  annyang.addCommands(systemCommands);
  annyang.addCommands(hiddenCommands);
  annyang.addCommands(noteCommands);

  // Start listening. Call this here, or attach this call to an event, button, etc.
  annyang.start();
  annyang.debug(true);

  /**
   * Record voice input as text
   *//*
  annyang.addCallback('result', function(phrases) {
    var voiceInput = document.createElement("p");
    voiceInput.classList.add("voice-input");
    voiceInput.innerHTML = phrases[0];
    screen.main2.appendChild(voiceInput);

    // `console.log("I think the user said: ", phrases[0]);
    // console.log("But then again, it could be any of the following: ", phrases);
  });
  
*/
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




/**
 * File saver things
 */
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});

var saver = document.querySelector(".saver");

saver.addEventListener("click", function() {
  saveAs(blob, "hello world.txt");
}, false)






/**
 * Event listeners
 */

// Full screen mode listeners:
//enterFullScreenMode(video, video);
//exitFullScreenMode(video, video);

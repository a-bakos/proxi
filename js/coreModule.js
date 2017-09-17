function initCore() {
  appendLastCommand("Core module requested");
  soundPlayer(systemSounds.loadLong);
  displayDateTime();
  appendLastCommand("Core module loaded");
  addModuleToDisplay("core");
};


/**
 * Defining system sounds & paths
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


var url;
var myWindow; // For new windows

initCore();
"use strict";

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
  }, 3000);
})();


/**
 * Last commands section
 */
var lastCommandCounter = 0;
var lastCommand = document.querySelector(".last-command-list");

// Building and appending elements as command items to the last commands list:
function appendLastCommand(commandMessage) {
  lastCommandCounter++;
  var lastCommandMessage = document.createElement("p");
  lastCommandMessage.classList.add("last-command-item", "command-" + lastCommandCounter);
  lastCommandMessage.innerHTML = commandMessage;
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

/**
 * Annyang commands
 */
if (annyang) {
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
    
    
    ':gratitude': {
      'regexp': /^(thanks|thank you|t h x|cheers|cheerio)$/,
      'callback': voiceFeedback("You're welcome.")
    },


    'stop': function() {
      voiceFeedback("I'm stopping.");
    },

    'test': function() {
      voiceFeedback("Test, check check!", 1, 2);
      appendLastCommand("Test command")
    },

    'shut down now': function() {
      voiceFeedback("Right. Bye bye for now.");
      annyang.abort();
      appendLastCommand("Shutting down")
    },

    '(take a) break': function() {
      voiceFeedback("Okay. Call me if you need me.");
      annyang.pause();
      appendLastCommand("Pause listening")
    },

    // does not work
    'online': function() {
      voiceFeedback("I'm back.");
      annyang.resume();
    },

    'phonetic a': function() { voiceFeedback("alpha", 1, 1); },
    'phonetic b': function() { voiceFeedback("bravo", 1, 1); },
    'phonetic c': function() { voiceFeedback("charlie", 1, 1); }
  };

  // Add commands to annyang
  annyang.addCommands(commands);

  // Start listening. Call this here, or attach this call to an event, button, etc.
  annyang.start();
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
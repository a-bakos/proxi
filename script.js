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

// Last command display:
var lastCommand = document.querySelector(".last-command");
var lastCommandMessage = document.createElement("p");
lastCommand.appendChild(lastCommandMessage);


if (annyang) {

  var myWindow; // For new windows

  // Define commands. First the text, and then the function it should call
  var commands = {
    'open search': function() {
      var url = "https://www.google.co.uk/";
      myWindow = window.open(url, "myWindow");
      lastCommandMessage.innerHTML = "Search opened";
    },
    'close search': function() {
      myWindow.close();
      lastCommandMessage.innerHTML = "Search closed";
    }
  };

  // Add commands to annyang
  annyang.addCommands(commands);

  // Start listening. Call this here, or attach this call to an event, button, etc.
  annyang.start();
}
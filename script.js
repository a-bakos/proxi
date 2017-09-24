"use strict";

/**
 * Defining screens
 */
var screen = {
  // Main action screens
  main1: document.querySelector(".main-action-screen-1"),
  module: document.querySelector(".tempbox"),
  // Side screens
  side1: document.querySelector(".side-screen-1"),
  side2: document.querySelector(".side-screen-2"),
  side3: document.querySelector(".side-screen-3")
};

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
function loadScript(filename, folder, moduleName) {
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

  function addModuleToList(filename) {
    var moduleItem = document.createElement("div");
    moduleItem.classList.add("display-module-item");
    moduleItem.innerHTML = filename;
    moduleName = "mod_" + filename;
    moduleItem.id = moduleName;
    screen.module.appendChild(moduleItem);
  }
  addModuleToList(filename);
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

  function removeModuleFromList(filename) {
    var moduleToRemove = document.querySelector("#mod_" + filename)
    moduleToRemove.parentElement.removeChild(moduleToRemove);
  }
  removeModuleFromList(filename);
}


function initApp() {
  loadScript("coreModule", "js");
};
initApp();

/**
 * Annyang commands
 */
if (annyang) {

  // Define high-level commands.

  var searchCommands = {

    'open search': function() {
      voiceFeedback("Opening search.");
      url = googleService.url;
      myWindow = window.open(url, "myWindow");
      appendLastCommand("Search opened");
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

    'phonetic a': function() { voiceFeedback("alpha", 1, 1); },
    'phonetic b': function() { voiceFeedback("bravo", 1, 1); },
    'phonetic c': function() { voiceFeedback("charlie", 1, 1); }

  };

  // "Get to the post office":
  var hiddenCommands = {
    'load post office': function() {
      voiceFeedback("loaded");
      appendLastCommand("Loaded email module");
      loadScript("hiddenCommands", "js", "hidden")
    }
  };

  // Audio player
  var audioPlayerCommands = {
    'play music': function() {
      loadScript("audioPlayerCommands", "js");
    }
  };

  // Camera
  var webCameraCommands = {
    '(open) (the) (web) camera': function() {
      loadScript("webCameraCommands", "js");
    }
  };

  // Notepad
  var noteCommands = {
    'note': function() {
      loadScript("notepadCommands", "js")
    }
  };

  // Add commands to annyang
  annyang.addCommands(searchCommands);
  annyang.addCommands(systemCommands);
  annyang.addCommands(hiddenCommands);
  annyang.addCommands(audioPlayerCommands);
  annyang.addCommands(webCameraCommands);
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
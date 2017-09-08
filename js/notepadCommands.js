/**
 * Notepad commands
 */

var noteIsOpen = false;

/**
 * Build the notepad element
 */
function buildNotepad(displayNoteHere = screen.main1) {
  noteIsOpen = true;

  var notepadContainer = document.createElement("div");
  notepadContainer.classList.add("notepad-container");
  
  var noteWrapper = document.createElement("article");
  noteWrapper.classList.add("note");
  notepadContainer.appendChild(noteWrapper);

  var noteTitle = document.createElement("p");
  noteTitle.classList.add("note-title");
  noteTitle.innerHTML = "Note title";
  noteWrapper.appendChild(noteTitle);

  var noteContent = document.createElement("p");
  noteContent.classList.add("note-content");
  noteWrapper.appendChild(noteContent);

  displayNoteHere.appendChild(notepadContainer);
}

/**
 * Remove the notepad from the DOM
 */
function removeNotepad() {
  var notepadContainer = document.querySelector(".notepad-container");
  notepadContainer.parentElement.removeChild(notepadContainer);
}

/**
 * Init function for this module.
 * Create the notepad as soon as the module is loaded into the DOM.
 */
(function initializeNotepad() {
  voiceFeedback("ok");
  appendLastCommand("Open notepad");
  buildNotepad();
  appendLastCommand("Create a new note");
})();


if (annyang) {
  var notepadCommands = {

    // Set the title the note
    'set (the) title': function() {
      appendLastCommand("Waiting for title");

      var noteTitle = document.querySelector(".note-title");
      // noteTitle.innerHTML = "|";

      // Listen for the title dictated by voice.
      // A small pause will terminate setting the title.
      annyang.addCallback('result', function(phrases) {
        
        noteTitle.innerHTML = phrases[0];

        if (noteTitle.innerHTML.length > 1) {
          annyang.removeCallback('result'); // This exits listening
          voiceFeedback("Got it!");
          appendLastCommand("Title is set");
        }
      });
    },

    'write content': function() {
      voiceFeedback("I am listening");
      appendLastCommand("Waiting for content");

      annyang.addCallback('result', function(phrases) {
        var noteContent = document.querySelector(".note-content");
        var noteContentText = document.createElement("p");
        noteContentText.classList.add("note-dictation");
        noteContentText.innerHTML = phrases[0];
        noteContent.appendChild(noteContentText);
      });

      appendLastCommand("Content added");
    },

    /*
    does not work
    'clear note': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");
      
      var noteContentText = noteContent.querySelectorAll('p');

    },
    */

    // Delete the last item on the list.
    // It has to be called twice - fix this later!
    'delete': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");
      
      var noteContentText = noteContent.querySelectorAll(".note-dictation");
      var first = noteContentText[0];
      var last = noteContentText[noteContentText.length - 1];
      noteContent.removeChild(last);
    },

    // Stop editing
    'stop note': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");
      
      // Find & delete the last <p> node, as it is the 'stop note' command itself
      var noteContentText = noteContent.querySelectorAll('p');
      var first = noteContentText[0];
      var last = noteContentText[noteContentText.length - 1];
      noteContent.removeChild(last);

      voiceFeedback("Note finished");
      appendLastCommand("Note finished");
    },
    
    'save note': function() {
      // utilise the power of filesaver here
    },

    'close note': function() {
      removeNotepad();
      noteIsOpen = false;
      voiceFeedback("Closing notepad");
      appendLastCommand("Notepad closed");
      removeScript("notepadCommands")
    }

  };

  // Add commands to annyang
  annyang.addCommands(notepadCommands);
}
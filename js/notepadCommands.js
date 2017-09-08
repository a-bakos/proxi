/**
 * Notepad commands
 */

var noteIsOpen = false;

/**
 * Build the notepad element
 */
function buildNotepad(showNoteOn) {
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

  showNoteOn.appendChild(notepadContainer);
}

function removeNotepad() {
  var notepadContainer = document.querySelector(".notepad-container");
  notepadContainer.parentElement.removeChild(notepadContainer);
}

// Create a notepad as soon as the module is loaded into the DOM
(function initializeNotepad() {
  buildNotepad(screen.main1);
  appendLastCommand("Create a note");
})();


if (annyang) {
  var notepadCommands = {

    // Set the title the note
    'title': function() {
      // Listen for the title dictated by voice.
      // A small pause will terminate setting the title.
      annyang.addCallback('result', function(phrases) {
        var noteTitle = document.querySelector(".note-title");
        noteTitle.innerHTML = phrases[0];

        if (noteTitle.innerHTML.length > 1) {
          annyang.removeCallback('result'); // This exits the method
          appendLastCommand("Title is set");
        }
      });
    },

    'content': function() {
      voiceFeedback("I am listening");
      annyang.addCallback('result', function(phrases) {
        var noteContent = document.querySelector(".note-content");
        var noteContentText = document.createElement("p");
        noteContentText.innerHTML = phrases[0];
        noteContent.appendChild(noteContentText);
        appendLastCommand("content added");
      });
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
      
      var noteContentText = noteContent.querySelectorAll('p');
      var first = noteContentText[0];
      var last = noteContentText[noteContentText.length - 1];

      noteContent.removeChild(last);
    },

    // Stop editing
    'stop note': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");
      
      var noteContentText = noteContent.querySelectorAll('p');
      var first = noteContentText[0];
      var last = noteContentText[noteContentText.length - 1];
      
      noteContent.removeChild(last);
      appendLastCommand("Note finished.");
    },
    
    'save note': function() {
      // utilise the power of filesaver here
    },

    'close notepad': function() {
      removeNotepad();
      noteIsOpen = false;
      appendLastCommand("Close notepad");
      voiceFeedback("Closing notepad");
      removeScript("notepadCommands")
    }

  };

  
  
  


  // Add commands to annyang
  annyang.addCommands(notepadCommands);
}
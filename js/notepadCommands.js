/**
 * Notepad commands
 */

var noteIsOpen = false;

// This function is to create a short date for inline use
function inlineDate() {
  var date = new Date();
  var day = date.getDate(); // 1 - 31
  var month = date.getMonth(); // 0 - 11
  var year = date.getFullYear();
  
  month += 1;
  
  if (day <= 9)   { day = "0" + day; }
  if (month <= 9)   { month = "0" + month; }

  var inlineDatesum = day + "-" + month + "-" + year;
  return inlineDatesum;
}

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
  noteTitle.innerHTML = "Note title " + inlineDate();
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
  soundPlayer(systemSounds.loadMed);
  buildNotepad();
  appendLastCommand("Create a new note");
})();


if (annyang) {
  var notepadCommands = {

    // Set the title the note
    'set (the) title (to)': function() {
      soundPlayer(systemSounds.ok);
      appendLastCommand("Waiting for title");

      var noteTitle = document.querySelector(".note-title");
      // noteTitle.innerHTML = "|";

      // Listen for the title dictated by voice.
      // A small pause will terminate setting the title.
      annyang.addCallback('result', function(phrases) {
 
        // Capitalize the "first" letter.
        // Use charAt(1) because for some reason it append a whitespace at the 0 position
        var userTitle = phrases[0].charAt(1).toUpperCase() + phrases[0].slice(2);

        noteTitle.innerHTML = userTitle + " " + inlineDate();

        if (noteTitle.innerHTML.length > 1) {
          annyang.removeCallback('result'); // This exits listening
          voiceFeedback("Title set");
          appendLastCommand("Title is set");
          soundPlayer(systemSounds.accept);
        }
      });
    },

    'write content': function() {
      soundPlayer(systemSounds.ok);
      voiceFeedback("I am listening");
      appendLastCommand("Waiting for content");

      annyang.addCallback('result', function(phrases) {
        var noteContent = document.querySelector(".note-content");
        var noteContentText = document.createElement("p");
        noteContentText.classList.add("note-dictation");
        noteContentText.innerHTML = phrases[0];
        noteContent.appendChild(noteContentText);
        soundPlayer(systemSounds.append);
      });

      appendLastCommand("Content added");
    },

    /*
    does not work yet
    'clear note': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");
      
      var noteContentText = noteContent.querySelectorAll('p');

    },
    */

    // Delete the last item on the list.
    // THIS NOW IS COMPLETELY THE SAME AS STOP EDITING
    // It has to be called twice - fix this later!
    'delete (last) (line)': function() {
      annyang.removeCallback('result');
      var noteContent = document.querySelector(".note-content");

      var noteContentText = noteContent.querySelectorAll(".note-dictation");
      var first = noteContentText[0];
      var last = noteContentText[noteContentText.length - 1];
      noteContent.removeChild(last);
    },

    // Stop editing
    '(ok) stop note': function() {
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
      // Get the title
      var title = document.querySelector(".note-title");
      title = title.innerHTML;

      // Get content
      // This will include the HTML tags as well.
      // These tags can possibly be removed with regexp.
      var content = document.querySelector(".note-content");
      content = content.innerHTML;

      // Save as file
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      saveAs(blob, title + ".txt");
      appendLastCommand("Note saved");
      soundPlayer(systemSounds.accept);
    },

    'close note': function() {
      removeNotepad();
      noteIsOpen = false;
      voiceFeedback("Closing notepad");
      soundPlayer(systemSounds.loadShort);
      appendLastCommand("Notepad closed");
      removeScript("notepadCommands")
    }

  };

  // Add commands to annyang
  annyang.addCommands(notepadCommands);
}
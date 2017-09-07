# homebot project

### ideas

- [done] add access to camera
- dive into JS regexp
	- see if JS can read source code with it
- maybe add php base
- also utilise php for form validation + file reading, saving
	- plus, look into node js, which can be used instead of php
- find a name for the project
- [done] reload / refresh / empty memory
- save img / [done] files
- overall volume voice control
- status bar:
	- [done] location
	- listening status
	- $_SERVER details
	- [done] date / time
- media player, [done]<audio>, <video>
- notepad:
	- eg. shopping list
- full log of events
- [failed] load in full-screen mode
- bluetooth api
- maybe consider logging everything on the console -- as a debug function?
- use CSS grids instead of absolutely positioning everything?
- searching on google maps by voice
	- this is the needed basic code before rewriting it into gps coordinates:
	- ```HTML
https://www.google.co.uk/maps?rlz=1C2CHBD_en-GBGB738GB738&q=szeged
https://www.google.co.uk/maps?rlz=1C2CHBD_en-GBGB738GB738&q=bristol
```
	- and this is the rewritten code:
	- ```HTML
https://www.google.co.uk/maps/place/Bristol/@51.4684681,-2.6607486,12z
```
	- this simple version is also good for basic location:
	- ```HTML
https://www.google.co.uk/maps/place/Leeds/
```
- dictionary.com, which uses the following url: `http://www.dictionary.com/browse/your-word`
- thesaurus.com: `http://www.thesaurus.com/browse/your-word?s=t`
- constant logging to file
- basic youtube search, where google search opens with "youtube search-keyword" expression
- imdb search. maybe use an associative array, like so: ["tt0111161": "The Shawshank Redemption"], which will build up the url for the movie's page: `http://www.imdb.com/title/tt0111161/?ref_=wl_li_tt`
	- utilise ventione for collecting id's and titles. put everything into txt.
- copying and pasting text files
	- selecting content, like this example:
	- ```javascript
    $(function() {
        $('.select-html').click(function() {
            $('#html-snippet').selectText();
        });
    });
```
- weather check, maybe `https://a12k.io/reallysimpleweather` or `http://simpleweatherjs.com/`

### screen sections

- [done] main action screen 1
- [done] main action screen 2
- [done] status bar
- [done] side screen 1
- [done] side screen 2 last command list
- [done] side screen 3
	- maybe use it for saved files
- one more section on the left side, currently not used

### next
- gather inspiration for ui

## Basic notable features will include a/an/the:

**[BVC]** = by voice control

- "sci-fi" UI, where the display is divided into several sections
- basic audio player that is able to play, stop music, maybe change music [BVC]
- status bar that reacts to user interaction
- working google map
- last commands list that records the events
- date / time display
- weather details display
- user dictation [BVC]
- google search lookup [BVC]
- opening url in a new tab [BVC]
- closing previously opened tabs [BVC]
- copy / paste text
- text file creation: making notes, adding title to the note, eg shopping list [BVC]
- file saving [BVC]
- constant logging to file

## Features++

- sending files via bluetooth or email (php?) [BVC]
- search locations on google maps [BVC]
- voice controlled rich text editor [BVC]

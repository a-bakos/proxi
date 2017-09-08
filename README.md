# homebot project

### ideas

**webcam**
- add access to camera
	- [done] manual opening
	- voice query

**regexp**
- dive into JS regexp
	- see if JS can read source code with it

**php**
- maybe add php base
- also utilise php for form validation + file reading, saving
	- plus, look into node js, which can be used instead of php


- find a name for the project

**refresh**
- [done] reload / refresh / empty memory

**file saving**
- save img / [done] files


- overall volume voice control

**status bar**
- status bar:
	- [done] location
	- listening status
	- $_SERVER details
	- [done] date / time

**media player**
- [done]<audio> player,
- <video>

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
- p5js.org
- orientation, https://www.html5rocks.com/en/tutorials/device/orientation/
- switch/case :expression evaluation?
- prevent modules to be called more than once - fix this inside scriptLoader()

**notes**
- notepad:
	- eg. shopping list
- add light sound effect after each successful voice unit when in notepad mode
- capitalize first letter in title

**modes**
	- use boolean switch for this
	- fast mode
	- silent mode

**modules**
	- open modules list
		- open modules in tempbox?
	- maintenance mode
	- speak current time and date

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
- find out if filesaver.js can have a different output folder specified

## Basic notable features will include a/an/the:

all required in working order for the v1.0.0

**[BVC]** = by voice control

- "sci-fi" UI, where the display is divided into several sections
- basic audio player that is able to play, stop music, maybe change music [BVC]
- status bar that reacts to user interaction
- working google map
- last commands list that records the events
- date / time display
	- respond to voice query
- weather details display
	- respond to voice query
- user dictation [BVC]
- google search lookup [BVC]
- opening url in a new tab [BVC]
- closing previously opened tabs [BVC]
- copy / paste text
- text file creation: making notes, adding title to the note, eg shopping list [BVC]
- file saving [BVC]
- constant logging to file
- silent mode
- fast mode
- open module management

## Features++

- sending files via bluetooth or email (php?) [BVC]
- search locations on google maps [BVC]
- voice controlled rich text editor [BVC]
- maintenance mode [BVC]

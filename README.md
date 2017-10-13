# Proxi

**[Trello dev board](https://trello.com/b/Qc2EXxbk)**

**[Trello desing board](https://trello.com/b/1Qk7pepk/proxi-design-board)**

---

## Feature status codes

**`OK!`**: working feature

**`PWF`**: partly working feature

**`BUG`**: buggy behaviour

**`TBI`**: feature to be implemented

## Modules and their features

### Notepad

**Module:** `notepadCommands`

Voice command | Event | Status | Other info
------------- | ----- | ------ | ----------
`note` | Open up the notepad | **`OK!`**
`set (the) title (to)` | Set / modify the title | **`OK!`**
`write content` | Write the content of the note | **`OK!`**`
`delete (last) (line)` | Delete the last added item | **`BUG`** | This works exactly the same as `stop editing`. It has to be called twice to see the effect. At first it deletes an HTML node that in not visible on the interface.
`clear note` | Clear the content area | **`TBI`**
`stop note` | Stop editing | **`OK!`**
`save note` | Save the note into a text file | **`BUG`** | When saving the note, the HTML tags are saved along with the note's body.
`close note` | Close notepad | **`OK!`**

### Audio Player

**Module:** `audioPlayerCommands`

Voice command | Event | Status | Other info
------------- | ----- | ------ | ----------
`play music` | Open the audio player and play music automatically | **`OK!`**
`stop music` | Stop the player | **`OK!`** | When the music has been stopped with this command, use `continue music` to resume.
`continue music` | Resume stopped player | **`OK!`**
`close audio player` | Close the audio player| **`OK!`**

### Webcamera

**Module:** `webCamCommands`

Voice command | Event | Status | Other info
------------- | ----- | ------ | ----------
`(open) (the) (web) camera` | Open the web camera with instant streaming | **`OK!`**
`close (the) (web) camera` | Close the camera | **`OK!`**






----

URL dump

- https://davidwalsh.name/speech-recognition
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- https://github.com/mdn/web-speech-api/blob/master/speech-color-changer/script.js
- https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
- https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript
- https://ourcodeworld.com/articles/read/59/how-to-convert-voice-to-text-with-javascript-webkitspeechrecognition-api-easily
- https://github.com/googlearchive/webplatform-samples/tree/master/webspeechdemo
- https://github.com/mattdiamond/Recorderjs
- https://github.com/sdkcarlos/artyom.js#voice-synthesis
- https://sdkcarlos.github.io/sites/artyom.html
- https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
- https://w3c.github.io/speech-api/speechapi.html#tts-section
- https://responsivevoice.org/
- https://codepen.io/matt-west/pen/wGzuJ
- https://codepen.io/SteveJRobertson/pen/emGWaR
- https://stackoverflow.com/questions/4912092/using-html5-canvas-javascript-to-take-in-browser-screenshots
- https://www.webrtc-experiment.com/Pluginfree-Screen-Sharing/#3520558517365728
- https://github.com/muaz-khan/WebRTC-Experiment/
- https://stackoverflow.com/questions/6887183/how-to-take-screenshot-of-a-div-with-javascript
- https://github.com/eligrey/FileSaver.js/
- https://eligrey.com/demos/FileSaver.js/
- https://eligrey.com/blog/saving-generated-files-on-the-client-side/
- http://jsfiddle.net/6FZkk/1/
- https://github.com/eligrey/voice-search
- https://stackoverflow.com/questions/9644612/access-webcam-without-flash
- https://www.html5rocks.com/en/tutorials/webrtc/basics/
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
- https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/index.html
- https://www.html5rocks.com/en/tutorials/getusermedia/intro/
- https://jsbin.com/cizahahude/edit?html,css,console,output
- https://www.sitepoint.com/stream-your-webcam-to-a-browser-in-javascript/
- https://stackoverflow.com/questions/13709482/how-to-read-text-file-in-javascript
- https://developers.google.com/web/updates/2011/08/Saving-generated-files-on-the-client-side
- https://stackoverflow.com/questions/34820578/how-to-capture-audio-in-javascript
- https://www.html5rocks.com/en/tutorials/getusermedia/intro/
- https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
- https://www.html5rocks.com/en/tutorials/webaudio/intro/
- https://webaudiodemos.appspot.com/input/index.html
- https://github.com/cwilso/Audio-Input-Effects
- https://github.com/cwilso/AudioRecorder
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
- https://stackoverflow.com/questions/16413063/html5-record-audio-to-file
- https://stackoverflow.com/questions/5684811/in-queryselector-how-to-get-the-first-and-get-the-last-elements-what-traversal
- https://github.com/TalAter/annyang/blob/master/docs/README.md
- https://trackingjs.com/docs.html#introduction
- https://www.sitepoint.com/introducing-microsofts-fluent-design-system/?utm_content=bufferfeb38&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
- https://www.wired.com/story/brain-machine-interface-isnt-sci-fi-anymore
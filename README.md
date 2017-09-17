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







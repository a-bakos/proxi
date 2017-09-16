# Proxi

**[Trello dev board](https://trello.com/b/Qc2EXxbk)**
**[Trello desing board](https://trello.com/b/1Qk7pepk/proxi-design-board)**

---

## Feature status index

**`OK!`**: working feature
**`PWF`**: partly working feature
**`BUG`**: buggy behaviour
**`NYI`**: not yet implemented feature

## Modules and its features

### Notepad

Voice query | Event | Status | Other info
----------- | ----- | ------ | ----------
`note` | Open up the notepad | **`OK!`**
`set (the) title (to)` | Set / modifie the title | **`OK!`**
`write content` | Write the content of the note | **`OK!**`
`delete (last) (line)` | Delete the last added item | **`BUG`** | This works exactly the same as `stop editing`. It has to be called twice to see the effect. At first it deletes an HTML node that in not visible on the interface.
`clear note` | Clear the content area | **`NYI`**
`stop note` | Stop editing | **`OK!`**
`save note` | Save the note into a text file | **`BUG`** | When saving the note, the HTML tags are saved along with the note's body.
`close note` | Close notepad | **`OK!`**

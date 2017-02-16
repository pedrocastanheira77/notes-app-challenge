(function(exports) {

  function App() {
    var self = this;

    this.handleHashChange = function(){
      if (location.hash === "#createNewNote") {
        self.createNewNote();
        self.clearForm();
        location.hash = "#home";
      } else {
        if (location.hash === "#home") {
          var homePageDiv = document.getElementById("home_page_content");
          var noteContentDiv = document.getElementById("note_content");

          if (checkIfHidden(homePageDiv.getAttribute('class'))) {
            hiddenSetter("home_page_content");
          }

          if (!checkIfHidden(noteContentDiv.getAttribute('class'))) {
            hiddenSetter("note_content");
          }

          noteListBuilder(appNoteList);
        } else {
          if (location.hash.includes("showNote")) {
            var note_id = location.hash.split("_")[1];
            var note_text = appNoteList.getNoteById(note_id).getText();
            domInjector("note_content", "<p>"+note_text+"</p>");
            hiddenSetter("home_page_content");
            hiddenSetter("note_content");
          }
        }
      }
    };

    this.createNewNote = function(){
      var noteText = document.getElementById('new_note_textarea').value;
      var newNote = new note(noteText);
      appNoteList.pushNote(newNote);
    };

    this.clearForm = function() {
      var element = document.getElementById('new_note_textarea');
      element.value = "";
    };
  }


  //Export app constructor to window
  exports.app = App;

})(this);

var notesApp = new app();
var appNoteList = new noteList();
//EVENTS
window.onhashchange = notesApp.handleHashChange;

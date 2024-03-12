import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular_keepApp1';
  newNote: Note = { id: 0, title: '', text: '' }; // Make sure newNote adheres to the Note interface
  notes: Note[] = [];
  errMessage = '';
  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notesService.getNotes().subscribe(
      (notes) => (this.notes = notes),
      (error) => (this.errMessage = 'Error loading notes.')
    );
  }

  addNote() {
    this.notesService.addNote(this.newNote).subscribe(
      () => {
        this.loadNotes();
        this.newNote = { id: 0, title: '', text: '' }; // Reset newNote
      },
      (error) => (this.errMessage = 'Error adding note.')
    );
  }
}

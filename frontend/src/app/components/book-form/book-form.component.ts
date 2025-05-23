import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book, BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 💡 Import these Material modules:
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-form',
  standalone: true,
  // ✅ Include required modules here:
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: Book | null
  ) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      isbn: [''],
      publicationDate: ['']
    });

    if (data) {
      this.bookForm.patchValue(data);
    }
  }

  saveBook() {
    const book: Book = { ...this.data, ...this.bookForm.value };
    const request = this.data?.id
      ? this.bookService.updateBook(book)
      : this.bookService.addBook(book);
    request.subscribe(() => this.dialogRef.close(book));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

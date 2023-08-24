import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {
  public bookId: string = "";
  public bookData: {
    bookName: string,
    isbn: string,
    author: string
  } = {
    bookName: '',
    isbn: '',
    author: ''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<BookDescriptionComponent>, private bookService: BookServiceService) {
    this.bookId = this.dialogData.id
  }

  ngOnInit(): void {
    this._getBookData(this.bookId);
  }

  private _getBookData(id: string) {
    this.bookService.getBookDetails(id).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        this.bookData.bookName = res.data.name;
        this.bookData.isbn = res.data.isbnNumber;
        this.bookData.author = `${res.data.author.firstName} ${res.data.author.lastName}`;
      }
    })
  }

}

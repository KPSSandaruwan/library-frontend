import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author.service';
import { BookServiceService } from 'src/app/services/book-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit{
  public bookName: string = "";
  public isbn: string = "";
  public selectedAuthor: any ="";
  public authorList: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddBookComponent>, private authorService: AuthorService, private bookService: BookServiceService) {}
  ngOnInit(): void {
    this._getAuthors();
  }

  public submitForm() {
    console.log('selectedAuthor', this.selectedAuthor)

    if (this.bookName === "" || this.selectedAuthor === "" || this.isbn === "") {
      return;
    }
    const bookData: any = {
      author: this.selectedAuthor,
      bookName: this.bookName,
      isbn: this.isbn
    }
    this.bookService.addBook(bookData).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        Swal.fire(
          'Success',
          res.message,
          'success'
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    });
  }

  private _getAuthors() {
    this.authorService.getAuthors(0, 0).subscribe((res: any) => {
      console.log('res', res)

      if (res.success) {
        res.data.forEach((author: any) => {
          this.authorList.push({
            id: author._id,
            name: `${author.firstName} ${author.lastName}`
          })
        })
      }
    })
  }

}

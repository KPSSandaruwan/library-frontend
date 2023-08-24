import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  public isEdit: boolean = false;
  public bookId: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<AddBookComponent>, private authorService: AuthorService, private bookService: BookServiceService) {
    this.isEdit = this.dialogData.isEdit;

    if (this.isEdit) {
      console.log('dialogData', dialogData);
      this.bookName = dialogData.bookData.name;
      this.isbn = dialogData.bookData.isbn;
      this.selectedAuthor = dialogData.bookData.authorId;
      this.bookId = dialogData.bookData.id;
    }
  }
  ngOnInit(): void {
    this._getAuthors();
  }

  public submitForm() {
    console.log('selectedAuthor', this.selectedAuthor)
    if (this.bookName === "" || this.selectedAuthor === "" || this.isbn === "") {
      return;
    }

    if (this.isEdit) {
      const bookData: any = {
        author: this.selectedAuthor,
        bookName: this.bookName,
        isbn: this.isbn
      }
      this.bookService.editBook(bookData, this.bookId).subscribe((res: any) => {
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
    } else {
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

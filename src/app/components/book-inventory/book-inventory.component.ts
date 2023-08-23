import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BookServiceService } from 'src/app/services/book-service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-book-inventory',
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.scss']
})


export class BookInventoryComponent implements OnInit {

  public dataSource: any;
  public displayedColumns: string[] = ['isbn', 'name', 'author', 'action'];
  public skip: number = 0;
  public limit: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(private bookService: BookServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._getBooks();
  }

  private _getBooks () {
    this.bookService.getBooks(this.skip, this.limit).subscribe((res: any) => {
      console.log('res', res)
      let bookData: any[] = []
      if (res.success) {
        res.data.forEach((book: any) => {
          bookData.push({
            id: book._id,
            isbn: book.isbnNumber,
            name: book.name,
            author: `${book.authorData.firstName} ${book.authorData.lastName}`
          });
        });
        this.dataSource =  new MatTableDataSource(bookData);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

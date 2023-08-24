import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { BookDescriptionComponent } from '../book-description/book-description.component';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorDescriptionComponent } from '../author-description/author-description.component';
import { AddAuthorComponent } from '../add-author/add-author.component';



@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent {
  public dataSource: any;
  public displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  public skip: number = 0;
  public limit: number = 2;
  public itemsPerPage = 2;
  public totalItems = 0;
  public authorData: any[] = [];
  public isActionProgress: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(private authorService: AuthorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._getAuthors();
  }

  private _getAuthors () {
    this.authorService.getAuthors(this.skip, this.limit).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        res.data.forEach((author: any) => {
          this.authorData.push({
            id: author._id,
            firstName: author.firstName,
            lastName: author.lastName
          });
        });
        this.totalItems = res.totalAuthors;
        this.dataSource =  new MatTableDataSource(this.authorData);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddAuthorComponent, {
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  public openDescriptionDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    let data: any = {
      id: id
    }

    this.dialog.open(AuthorDescriptionComponent, {
      width: '650px',
      data: data,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public onPageChange(event: any) {
    this._getMoreData();
  }

  private _getMoreData() {
    if (this.isActionProgress || this.authorData.length === this.totalItems) {
      return;
    }
    this.isActionProgress = true;
    this.skip++
    this.authorService.getAuthors(this.skip, this.limit).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        res.data.forEach((author: any) => {
          this.authorData.push({
            id: author._id,
            firstName: author.firstName,
            lastName: author.lastName
          });
        });

        this.isActionProgress = false;
      }
    });
  }
}

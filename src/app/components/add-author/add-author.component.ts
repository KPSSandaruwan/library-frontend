import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss'],
})
export class AddAuthorComponent {
  public firstName: string = '';
  public lastName: string = '';
  public isEdit: boolean = false;
  public authorId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<AddAuthorComponent>,
    private authorService: AuthorService
  ) {
    this.isEdit = this.dialogData.isEdit;

    if (this.isEdit) {
      console.log('dialogData', dialogData);
      this.firstName = dialogData.authorData.firstName;
      this.lastName = dialogData.authorData.lastName;
      this.authorId = dialogData.authorData.id;
    }
  }

  public submitForm() {
    if (this.firstName === '' || this.lastName === '') {
      return;
    }

    if (this.isEdit) {
      const authorData: any = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      this.authorService
        .editAuthor(authorData, this.authorId)
        .subscribe((res: any) => {
          console.log('res', res);
          if (res.success) {
            Swal.fire('Success', res.message, 'success');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
    } else {
      const authorData: any = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      this.authorService.addAuthor(authorData).subscribe((res: any) => {
        console.log('res', res);
        if (res.success) {
          Swal.fire('Success', res.message, 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
    }
  }
}

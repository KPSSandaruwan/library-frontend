import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent {
  public firstName: string = "";
  public lastName: string = "";


  constructor(public dialogRef: MatDialogRef<AddAuthorComponent>, private authorService: AuthorService) {}

  public submitForm() {
    if (this.firstName === "" || this.lastName === "") {
      return;
    }
    const authorData: any = {
      firstName: this.firstName,
      lastName: this.lastName
    }
    this.authorService.addAuthor(authorData).subscribe((res: any) => {
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

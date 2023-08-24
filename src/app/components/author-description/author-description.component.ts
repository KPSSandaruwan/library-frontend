import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-description',
  templateUrl: './author-description.component.html',
  styleUrls: ['./author-description.component.scss']
})
export class AuthorDescriptionComponent {
  public authorId: string = "";
  public authorData: {
    firstName: string,
    lastName: string
  } = {
    firstName: '',
    lastName: ''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<AuthorDescriptionComponent>, private authorService: AuthorService) {
    this.authorId = this.dialogData.id
  }

  ngOnInit(): void {
    this._getAuthorData(this.authorId);
  }

  private _getAuthorData(id: string) {
    this.authorService.getAuthorDetails(id).subscribe((res: any) => {
      console.log('res', res)
      if (res.success) {
        this.authorData.firstName = res.data.firstName;
        this.authorData.lastName = res.data.lastName;
      }
    })
  }
}

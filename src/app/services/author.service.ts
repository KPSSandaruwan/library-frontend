import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from '../common/utill';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthors(skip: number, limit: number): Observable<any> {
    const url = Util.apiPublicUrl(`getAllAuthors/${skip}/${limit}`)
    return this.http.get(url)
  }

  getAuthorDetails(authorId: string) {
    const url = Util.apiPublicUrl(`getAuthorById/${authorId}`)
    return this.http.get(url)
  }

  addAuthor(authorData: any) {
    const url = Util.apiPublicUrl(`createAuthor`)
    return this.http.post(url, authorData)
  }
}

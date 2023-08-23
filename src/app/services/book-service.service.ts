import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from '../common/utill';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) {}

  getBooks(skip: number, limit: number): Observable<any> {
    const url = Util.apiPublicUrl(`getAllBooks/${skip}/${limit}`)
    return this.http.get(url)
  }
}

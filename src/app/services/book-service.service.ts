import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    const url = ''
    return this.http.get(url)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
const putanja = '../../assets/Data/';
@Injectable({
  providedIn: 'root',
})
export class ReadingJSONService {
  constructor(private http: HttpClient) {}

  public getJSON(filename: string): Observable<any> {
    return this.http.get(putanja + filename);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private carUrl = "http://localhost:5000/Person/";
  constructor(private http: HttpClient) {}
}

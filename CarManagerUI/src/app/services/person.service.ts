import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Person } from "../models/person";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class PersonService {
  private personUrl = "http://localhost:5000/Person/";
  constructor(private http: HttpClient) {}

  public getPersons(): Observable<Person[]> {
    const url = `${this.personUrl}GetPersons`;
    var res =  this.http.get<Person[]>(url);
    console.log(res);
    return res;
  }

  public addPerson(person: Person): Observable<number> {
    const url = `${this.personUrl}AddPerson`;
    var res = this.http.post<number>(url, person);
    return res;
  }

  public deletePerson(id: number): Observable<number> {
    const url = `${this.personUrl}DeletePerson`;
    var res = this.http.post<number>(url, id);
    return res;
  }
}

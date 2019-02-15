import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { from, Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private carUrl = 'http://localhost:5000/Car/';
  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    const url = `${this.carUrl}GetCars`;
    console.log(this.http.get<Car[]>(url));
    return this.http.get<Car[]>(url);//.pipe(map((data) => {
    //   return data.json();
    // }))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
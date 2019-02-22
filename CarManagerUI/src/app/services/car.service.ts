import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Car } from "src/app/models/car";
import { from, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CarService {
  private carUrl = "http://localhost:5000/Car/";
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    const url = `${this.carUrl}GetCars`;
    return this.http.get<Car[]>(url);
  }

  getCarById(id: number): Observable<Car> {
    const url = `${this.carUrl}GetCarById`;
    return this.http.post<Car>(url, id);
  }

  addCar(car: Car): Observable<number> {
    const url = `${this.carUrl}UpdateCar`;
    var res = this.http.post<number>(url, car);
    return res;
  }

  deleteCar(id:number):Observable<number>{
    const url = `${this.carUrl}DeleteCar`;
    var res = this.http.post<number>(url, id);
    return res;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

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

  public getCars(): Observable<Car[]> {
    const url = `${this.carUrl}GetCars`;
    return this.http.get<Car[]>(url);
  }

  public getCarById(id: number): Observable<Car> {
    const url = `${this.carUrl}GetCarById`;
    return this.http.post<Car>(url, id);
  }

  public getEmptyCars():Observable<Car[]>{
    const url = `${this.carUrl}GetEmptyCars`;
    return this.http.get<Car[]>(url);
  }

  public addCar(car: Car): Observable<number> {
    const url = `${this.carUrl}UpdateCar`;
    var res = this.http.post<number>(url, car);
    return res;
  }

  public deleteCar(id: number): Observable<number> {
    const url = `${this.carUrl}DeleteCar`;
    var res = this.http.post<number>(url, id);
  /// this.getCars();
    return res;
  }
}

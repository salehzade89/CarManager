import { Component, OnInit } from "@angular/core";
import { CarService } from "../../services/car.service";
import { Car } from "src/app/models/car";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"]
})
export class CarsComponent implements OnInit {
  constructor(private carService: CarService) {}
  cars: Car[];
  form: boolean;
  car: Car;

  getCars(): void {
    this.carService.getCars().subscribe(cars => (this.cars = cars));
  }

  editButtonClick(car: Car): void {
    this.car = car;

    this.changeFormState(true);
  }

  addButtonClick(): void {
    this.car = { carId: 0, number: "", color: "" };
    this.changeFormState(true);
  }

  deleteButtonClick(car: Car): void {
    if(this.form==true)
    return;
    this.carService.deleteCar(car.carId).subscribe(() => this.getCars());
  }

  ngOnInit() {
    this.getCars();
  }

  changeFormState(state: boolean): void {
    this.form = state;
    this.getCars();
  }
}

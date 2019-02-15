import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private carService: CarService) { }
  cars: Car[];
  getCars(): void {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }
  ngOnInit() {
    this.getCars();
  }
}
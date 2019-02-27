import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { CarService } from "../../services/car.service";
import { Car } from "src/app/models/car";
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { AddCarComponent } from '../add-car/add-car.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"]
})
export class CarsComponent implements OnInit {
  constructor(private carService: CarService ,private commonService:CommonService, public dialog: MatDialog) {}
  cars: Car[];
  form: boolean;
  car: Car;
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    "carId",
    "number",
    "color",
    "button"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  getCars(): void {
    this.carService.getCars().subscribe(cars => (this.dataSource.data = cars));
    this.dataSource = new MatTableDataSource<Car>(this.cars);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editButtonClick(car: Car): void {
    this.car = car;
  }

  addButtonClick(): void {
    this.car = { carId: 0, number: "", color: "" };
  }

  deleteButtonClick(car: Car): void {
    this.carService.deleteCar(car.carId).subscribe(() => this.getCars());
    this.click();
  }

  ngOnInit() {
    this.getCars();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCarComponent, {
      width:"450px",
      data: new Car(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result instanceof Car)
      {
        this.carService.addCar(result).subscribe(()=>this.getCars());
      }
    });
  }

  @HostListener('click')
  click() {
    this.commonService.toggle();
  }

  openEditDialog(car:Car): void {
    const dialogRef = this.dialog.open(AddCarComponent, {
      data:car
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result instanceof Car)
        this.carService.addCar(result).subscribe(()=>this.getCars());
    });
  }
}

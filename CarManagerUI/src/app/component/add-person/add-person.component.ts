import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Person } from "src/app/models/person";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.css"]
})
export class AddPersonComponent implements OnInit {
  constructor(
    private carService: CarService,
    public dialogRef: MatDialogRef<AddPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {}
  cars: Car[];
  selectedCar:Car;
  myControl = new FormControl();
  filteredCars: Observable<Car[]>;

  ngOnInit() {
    this.carService.getCars().subscribe(cars => (this.cars = cars));

    this.filteredCars = this.myControl.valueChanges.pipe(
      startWith<string | Car>(""),
      map(value => (typeof value === "string" ? value : value.number)),
      map(number => (number ? this._filter(number) : this.cars))
    );
  }

  displayFn(car?: Car): string | undefined {
    return car ? car.number : undefined;
  }

  private _filter(number: string): Car[] {
    const filterValue = number.toLowerCase();

    return this.cars.filter(
      option => option.number.toLowerCase().indexOf(filterValue) === 0
    );
  }

  age = new FormControl('', [Validators.required, Validators.pattern("^([1-9][0-9]?|)$")]);

  getAgeErrorMessage() {
    return this.age.hasError('required') ? 'You must enter a value' :
        this.age.hasError('pattern') ? 'Not a valid age' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // onSaveClick():void{
  //   if(this.selectedCar instanceof Car)
  //   {
  //     this.data.carId=this.selectedCar.carId;
  //   }
  //   else if(typeof this.selectedCar==="undefined")
  //   {
  //     this.dialogRef.close(this.data);
  //   }
  //}
}

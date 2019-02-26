import { Component, OnInit, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
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
  selectedCar: Car;
  myControl = new FormControl("");
  filteredCars: Observable<Car[]>;

  ngOnInit() {
    this.selectedCar = this.data.car;
    this.carService.getEmptyCars().subscribe(cars => (this.cars = cars));
    this.myControl.setValidators(this.carValidator.bind(this));
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

  //#region Validator

  ageValidator = new FormControl("", [
    Validators.required,
    Validators.pattern("^([1-9][0-9]?|)$")
  ]);

  getAgeErrorMessage() {
    return this.ageValidator.hasError("required")
      ? "You must enter a value"
      : this.ageValidator.hasError("pattern")
      ? "Not a valid age"
      : "";
  }

  nameValidator = new FormControl("Enter Name", [Validators.required]);

  getNameErrorMessage() {
    return this.nameValidator.hasError("required")
      ? "You must enter a value"
      : "";
  }

  //carVal = new FormControl("", [carValidator(this.cars)]);

  //#endregion

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.data.car = this.selectedCar;
    this.dialogRef.close(this.data);
  }

  carValidator() : ValidationErrors | null {
    const cars = this.cars || [];
    const selectedCar = this.selectedCar;

    if (selectedCar == null) {
      return null;
    }

    if (selectedCar.carId == 0) {
      return { carValidator: true };
    }

    if (!cars.some(t => t.carId == selectedCar.carId)) {
      return { carValidator: true };
    }

    return null;
  }

}


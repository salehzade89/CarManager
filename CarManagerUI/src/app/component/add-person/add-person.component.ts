import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import {
  FormControl,
  Validators
} from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil, take } from "rxjs/operators";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from "@angular/material";
import { Person } from "src/app/models/person";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.css"]
})

export class AddPersonComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private carService: CarService,
    public dialogRef: MatDialogRef<AddPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) { }

  cars: Car[];

  public carCtrl: FormControl = new FormControl();
  public carFilterCtrl: FormControl = new FormControl();
  public filteredCars: ReplaySubject<Car[]> = new ReplaySubject<Car[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.carService.getEmptyCars().subscribe(cars => (this.cars = cars));

    this.carCtrl.setValue(this.cars);

    this.filteredCars.next(this.cars);

    this.carFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCars();
      });

    this.carCtrl.setValue(this.data.car);
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this.data.car = this.carCtrl.value;
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredCars
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Car, b: Car) => a && b && a.carId === b.carId;
      });
  }

  protected filterCars() {
    if (!this.cars) {
      return;
    }
    let search = this.carFilterCtrl.value;
    if (!search) {
      this.filteredCars.next(this.cars.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCars.next(
      this.cars.filter(car => car.number.toLowerCase().indexOf(search) > -1)
    );
  }

  onDeleteCar() {
    this.carCtrl.setValue(null);
    this.data.car = null;
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

  //#endregion

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

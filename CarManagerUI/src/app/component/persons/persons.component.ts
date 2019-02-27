import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonService } from "src/app/services/person.service";
import { Person } from "src/app/models/person";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { AddPersonComponent } from "../add-person/add-person.component";
import { CarService } from "src/app/services/car.service";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-persons",
  templateUrl: "./persons.component.html",
  styleUrls: ["./persons.component.css"]
})
export class PersonsComponent implements OnInit {
  displayedColumns: string[] = [
    "personId",
    "name",
    "surname",
    "age",
    "car",
    "button"
  ];




  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private commonService:CommonService,
    private personService: PersonService,
    public dialog: MatDialog
  ) { }
  persons: Person[];
  form: boolean;
  person: Person;
  dataSource = new MatTableDataSource();


  getPersons(): void {
    this.personService
      .getPersons()
      .subscribe(persons => (this.dataSource.data = persons));
  }

  deleteButtonClick(person: Person): void {
    this.personService
      .deletePerson(person.personId)
      .subscribe(() => this.getPersons());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getPersons();
    this.dataSource = new MatTableDataSource<Person>(this.persons);
    this.dataSource.paginator = this.paginator;

    this.commonService.change.subscribe(()=>{
      this.getPersons();
    })
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: "450px",
      data: new Person()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if (result instanceof Person) {
        if (typeof result.car == 'undefined') {
          result.personId = 0;
          result.car = null;
        }
        else {
          result.carId = result.car.carId;
        }
        this.personService.addPerson(result).subscribe(() => this.getPersons());
      }
    });
  }

  openEditDialog(person: Person): void {
    let copyPerson = { personId: person.personId, name: person.name, surname: person.surname, car: person.car  , age:person.age}

    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: "450px",
      data: copyPerson
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {

        console.log("The dialog was closed");
        if (typeof result.car == 'undefined' || result.car==null) {
          result.personId = 0;
          result.car = null;
        }
        else {
          result.carId = result.car.carId;
          result.car = null;
        }
        result.personId = person.personId;
        this.personService.addPerson(result)
          .subscribe(() => this.getPersons());
      }
    });
  }
}

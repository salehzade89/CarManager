import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonService } from "src/app/services/person.service";
import { Person } from "src/app/models/person";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { AddPersonComponent } from "../add-person/add-person.component";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";

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
    private personService: PersonService,
    public dialog: MatDialog
  ) {}
  persons: Person[];
  // cars:Cars
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
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: "450px",
      data: new Person()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
     // let result = dialogRef.componentInstance.data;
      if (result instanceof Person) {
        result.personId = 0;
        result.car = null;
        this.personService.addPerson(result).subscribe(() => this.getPersons());
      }
    });
  }

  openEditDialog(person: Person): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: "450px",
      data: person
    });

    dialogRef.afterClosed().subscribe(() => {
      let result = dialogRef.componentInstance.data;
      if (result instanceof Person) {
        console.log("The dialog was closed");
        if (result instanceof Person)
          this.personService.addPerson(result)
            .subscribe(() => this.getPersons());
      }
    });
  }
}

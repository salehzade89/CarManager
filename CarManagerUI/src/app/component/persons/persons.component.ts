import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonService } from "src/app/services/person.service";
import { Person } from "src/app/models/person";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { AddPersonComponent } from '../add-person/add-person.component';
import { Car } from 'src/app/models/car';

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

  constructor(private personService: PersonService, public dialog: MatDialog) {}
  persons: Person[];
  form: boolean;
  person: Person;
  dataSource = new MatTableDataSource();

  getPersons(): void {
    this.personService
      .getPersons()
      .subscribe(persons => (this.dataSource.data = persons));
      this.dataSource = new MatTableDataSource<Person>(this.persons);
      this.dataSource.paginator = this.paginator;
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
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      
      data: new Person(),//{personId :0,name:'',surname:'',age:null,carId:null,car:Car}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result instanceof Person)
      {
        if(result.car instanceof Car)
        {
          result.carId = result.car.carId;
          this.personService.addPerson(result).subscribe(()=>this.getPersons());
        }
      }
    });
  }

  openEditDialog(person:Person): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      data:person
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result instanceof Person)
        this.personService.addPerson(result).subscribe(()=>this.getPersons());
    });
  }
}

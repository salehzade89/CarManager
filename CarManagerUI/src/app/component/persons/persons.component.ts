import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonService } from "src/app/services/person.service";
import { Person } from "src/app/models/person";
import { MatTableDataSource, MatPaginator } from "@angular/material";

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

  constructor(private personService: PersonService) {}
  persons: Person[];
  form: boolean;
  person: Person;
  dataSource = new MatTableDataSource();

  getPersons(): void {
    this.personService
      .getPersons()
      .subscribe(persons => (this.dataSource.data = persons));
    console.log(this.persons);
    this.dataSource = new MatTableDataSource<Person>(this.persons);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getPersons();
    this.dataSource.paginator = this.paginator;
  }
}

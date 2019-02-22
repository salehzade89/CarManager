import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  constructor(private personService: PersonService) {}
  persons: Person[];
  form: boolean;
  person: Person;

  getPersons(): void {
    this.personService.getPersons().subscribe(persons => (this.persons = persons));
    console.log(this.persons);
    
  }

  ngOnInit() {
    this.getPersons();
  }

}

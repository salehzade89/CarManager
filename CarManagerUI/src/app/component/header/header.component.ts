import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private location: Location) { }
  setButtonStyle(): void {
    if (this.location.path() == "/persons") {
      this.person = true;
      this.car = false;
    }
    else if (this.location.path() == "/cars") {
      this.person = false;
      this.car = true;
    }
  }
  person: boolean;
  car: boolean;
  personButtonClick(): void {
    this.setButtonStyle();

  }

  carButtonClick(): void {
    this.setButtonStyle();

  }
  ngOnInit() {
    this.setButtonStyle();
    //console.log(this.location.path());

  }
}
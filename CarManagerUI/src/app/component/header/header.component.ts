import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  setButtonStyle(): void {
    if (this.router.url == "/persons") {
      this.person = true;
      this.car = false;
    }
    else if (this.router.url == "/cars") {
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
    console.log(this.router.url);
    
  }
}
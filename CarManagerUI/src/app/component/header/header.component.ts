import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  person:boolean;
  car:boolean;
  personButtonClick():void{
    this.person = true;
    this.car= false;
  }

  carButtonClick():void{
    this.person = false;
    this.car= true;
  }
  ngOnInit() {
    this.person = true;
    this.car= false;
  }
}

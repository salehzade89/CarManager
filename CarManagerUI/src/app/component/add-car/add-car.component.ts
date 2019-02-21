import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Car } from "src/app/models/car";
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  constructor(carService:CarService) {}
  @Input() car: Car;
  @Output()emitPass: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
    
  }

  close():void{
    this.emitPass.emit(false);
  }
}

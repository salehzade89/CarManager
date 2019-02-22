import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  constructor(private carService: CarService) {}
  @Input() car: Car;
  carCopy:Car;
  @Output() emitPass: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
    this.carCopy={carId:this.car.carId,number:this.car.number ,color:this.car.color};
  }

  close(): void {
    this.emitPass.emit(false);
  }

  async save() {
    await this.carService.addCar(this.carCopy).toPromise();
    this.close();
  }
}

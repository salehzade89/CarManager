import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from "@angular/core";
import { Car } from "src/app/models/car";
import { CarService } from "src/app/services/car.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  constructor(
    private carService: CarService,
    public dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  @Output() emitPass: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {}
}

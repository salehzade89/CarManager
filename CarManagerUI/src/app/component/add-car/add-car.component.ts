import {
  Component,
  OnInit,
  Inject,
  HostListener
} from "@angular/core";
import { Car } from "src/app/models/car";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  numberValidator = new FormControl("Enter car number", [Validators.required]);

  getNameErrorMessage() {
    return this.numberValidator.hasError("required")
      ? "You must enter a value"
      : "";
  }
}

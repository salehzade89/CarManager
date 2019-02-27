import { Component } from '@angular/core';
import { environment } from './../../../environments/environment';
import { MatSelectSearchVersion } from 'ngx-mat-select-search';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Manager';
  matSelectSearchVersion = MatSelectSearchVersion;
}
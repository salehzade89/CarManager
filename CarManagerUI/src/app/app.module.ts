import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./component/app/app.component";
import { PersonsComponent } from "./component/persons/persons.component";
import { CarsComponent } from "./component/cars/cars.component";
import { HeaderComponent } from "./component/header/header.component";
import { AddCarComponent } from "./component/add-car/add-car.component";
import { FooterComponent } from "./component/footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatDialogModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from "@angular/material";
import { AddPersonComponent } from './component/add-person/add-person.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    CarsComponent,
    HeaderComponent,
    FooterComponent,
    AddCarComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatOptionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [],
  entryComponents: [PersonsComponent, AddPersonComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

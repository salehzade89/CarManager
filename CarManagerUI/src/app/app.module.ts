import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { PersonsComponent } from './component/persons/persons.component';
import { CarsComponent } from './component/cars/cars.component';
import { HeaderComponent } from './component/header/header.component';
import { AddCarComponent } from "./component/add-car/add-car.component";
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    CarsComponent,
    HeaderComponent,
    FooterComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

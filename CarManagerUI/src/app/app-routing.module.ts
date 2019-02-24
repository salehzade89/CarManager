import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CarsComponent } from "./component/cars/cars.component";
import { PersonsComponent } from "./component/persons/persons.component";
import { AddCarComponent } from "./component/add-car/add-car.component";

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "cars", component: CarsComponent },
  { path: "persons", component: PersonsComponent },
  { path: "add-car", component: AddCarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContentComponent } from './home-content/home-content.component';
import { CarApiService } from './car-api.service';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeContentComponent},
  {path: 'cars', component: VehicleListComponent},
  {path: 'customers', component: CustomerFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

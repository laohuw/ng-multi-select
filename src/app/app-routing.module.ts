import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MobileComponent} from "./mobile/mobile.component";
import {TestFilterComponent} from "./test-filter.component";


const routes: Routes = [
  {path:'', redirectTo: '/mobile', pathMatch: 'full'},
  {path:'mobile', component: MobileComponent},
  {path:'test-filter', component: TestFilterComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

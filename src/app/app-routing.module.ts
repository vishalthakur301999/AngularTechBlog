import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {CpuListComponent} from './cpu-list/cpu-list.component';
import {CpuDetailsComponent} from './cpu-details/cpu-details.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cpu', component: CpuListComponent, pathMatch: 'full'},
  { path: 'cpu/:blogid', component: CpuDetailsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

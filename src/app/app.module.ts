import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JumbotronComponent } from './home-page/jumbotron/jumbotron.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CpuListComponent } from './cpu-list/cpu-list.component';
import { CpuDetailsComponent } from './cpu-details/cpu-details.component';
import { GpuListComponent } from './gpu-list/gpu-list.component';
import { GpuDetailsComponent } from './gpu-details/gpu-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    JumbotronComponent,
    HomePageComponent,
    CpuListComponent,
    CpuDetailsComponent,
    GpuListComponent,
    GpuDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

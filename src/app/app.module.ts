import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableTimeComponent } from './observable-time/observable-time.component';
import { DefaultTimeComponent } from "./default-time/default-time.component";


@NgModule({
  declarations: [
    AppComponent,
    ObservableTimeComponent,
    DefaultTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, ObservableTimeComponent, DefaultTimeComponent]
})
export class AppModule { }

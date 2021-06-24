import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, SchedulerModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }


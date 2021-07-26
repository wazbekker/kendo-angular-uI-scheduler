import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { AppComponent } from './app.component';
import { EditFormComponent } from './shared/edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditService } from './shared/edit.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SchedulerModule,
    ButtonsModule,
    DateInputsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [AppComponent, EditFormComponent],
  providers: [EditService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { EditFormComponent } from './shared/edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditService } from './shared/edit.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SchedulerModule,
    ButtonsModule,
    DateInputsModule,
    DropDownsModule
  ],
  declarations: [AppComponent, EditFormComponent],
  providers: [EditService],
  bootstrap: [AppComponent]
})
export class AppModule {}

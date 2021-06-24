import { Component } from '@angular/core';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { sampleData, displayDate } from './events-utc';

@Component({
  selector: 'my-app',
  template: `
    <kendo-scheduler
      [kendoSchedulerBinding]="events"
      [selectedDate]="selectedDate"
      [selectedViewIndex]="1"
      style="height: 650px;"
    >
      <kendo-scheduler-month-view [eventHeight]="30">
      </kendo-scheduler-month-view>
    </kendo-scheduler>
  `
})
export class AppComponent {
  public selectedDate: Date = displayDate;
  public events: SchedulerEvent[] = sampleData;
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateFormGroupArgs,
  EditMode,
  SchedulerEvent
} from '@progress/kendo-angular-scheduler';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public selectedDate: Date = new Date();
  public selectedViewIndex = 1;
  public events: SchedulerEvent[] = [
    {
      id: 1,
      title: 'Breakfast',
      start: new Date('2018-10-22T09:00:00'),
      end: new Date('2018-10-22T09:30:00')
    }
  ];
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;
    const isOccurrence = args.mode === (EditMode.Occurrence as any);
    // const exceptions = isOccurrence ? [] : dataItem.recurrenceExceptions;

    this.formGroup = this.formBuilder.group({
      id: args.isNew ? this.getNextId() : dataItem.id,
      start: [dataItem.start, Validators.required],
      end: [dataItem.end, Validators.required],
      isAllDay: true,
      title: dataItem.title,
      description: dataItem.description
    });

    return this.formGroup;
  }

  public getNextId(): number {
    const len = this.events.length;

    return len === 0 ? 1 : this.events[this.events.length - 1].id + 1;
  }
}

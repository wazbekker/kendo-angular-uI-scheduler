import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateFormGroupArgs,
  EditMode,
  EventClickEvent,
  EventStyleArgs,
  RemoveEvent,
  SlotClickEvent
} from '@progress/kendo-angular-scheduler';
import { CustomEvent } from './shared/custom-event.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public selectedDate: Date = new Date();
  public selectedViewIndex = 0;
  public editedEvent: any;
  public editMode: EditMode;
  public isNew: boolean;
  public formGroup: FormGroup;

  public eventLookups = [
    { text: 'DAM Trading Day', value: 1, color: 'lightblue' },
    { text: 'FPM Weekly Trading Day', value: 2, color: 'lightgreen' },
    { text: 'FPM Monthly Trading Day', value: 3, color: 'lightpink' }
  ] as Array<{ text: string; value: number; color: string }>;

  public events = [
    {
      id: 1,
      eventType: this.eventLookups[0].value,
      title: this.eventLookups[0].text,
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 1),
      isAllDay: true,
      color: this.eventLookups[0].color
    } as CustomEvent,
    {
      id: 2,
      eventType: this.eventLookups[1].value,
      title: this.eventLookups[1].text,
      start: new Date(2021, 6, 2),
      end: new Date(2021, 6, 2),
      isAllDay: true,
      color: this.eventLookups[1].color
    } as CustomEvent,
    {
      id: 3,
      eventType: this.eventLookups[2].value,
      title: this.eventLookups[2].text,
      start: new Date(2021, 6, 3),
      end: new Date(2021, 6, 3),
      isAllDay: true,
      color: this.eventLookups[2].color
    } as CustomEvent
  ] as CustomEvent[];

  constructor(
    // private editService: EditService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit(): void {}

  // public fields() {
  //   return this.editService.fields;
  // }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;
    const isOccurrence = args.mode === EditMode.Occurrence;
    const exceptions = isOccurrence ? [] : dataItem.recurrenceExceptions;

    this.formGroup = this.formBuilder.group({
      eventType: [1],
      id: args.isNew ? this.getNextId() : dataItem.id,
      start: [dataItem.start, Validators.required],
      end: [dataItem.end, Validators.required],
      startTimezone: [dataItem.startTimezone],
      endTimezone: [dataItem.endTimezone],
      isAllDay: dataItem.isAllDay,
      title: dataItem.title,
      description: dataItem.description,
      recurrenceRule: dataItem.recurrenceRule,
      recurrenceId: dataItem.recurrenceId,
      recurrenceExceptions: [exceptions]
    });

    return this.formGroup;
  }

  public isEditingSeries(editMode: EditMode): boolean {
    return editMode === EditMode.Series;
  }

  public getNextId(): number {
    const len = this.events.length;

    return len === 0 ? 1 : this.events[this.events.length - 1].id + 1;
  }

  public slotDblClickHandler({ start, end, isAllDay }: SlotClickEvent): void {
    debugger;
    this.isNew = true;

    this.editMode = EditMode.Series;

    this.editedEvent = {
      eventType: this.eventLookups[0].value,
      title: this.eventLookups[0].text,
      start: start,
      end: end,
      isAllDay: isAllDay
    };
  }

  public eventDblClickHandler({ sender, event }: EventClickEvent): void {
    debugger;
    this.isNew = false;

    let dataItem = event.dataItem;

    this.editMode = EditMode.Series;
    this.editedEvent = dataItem;
  }

  public saveHandler(formValue: any): void {
    debugger;
    if (this.isNew) {
      //this.editService.create(formValue);
    } else {
      // this.handleUpdate(this.editedEvent, formValue, this.editMode);
    }
  }

  public removeHandler({ sender, dataItem }: RemoveEvent): void {
    debugger;
    sender.openRemoveConfirmationDialog().subscribe(shouldRemove => {
      if (shouldRemove) {
        //this.editService.remove(dataItem);
      }
    });
  }

  public dragEndHandler({ sender, event, start, end, isAllDay }): void {
    debugger;
    let value = { Start: start, End: end, IsAllDay: isAllDay };
    let dataItem = event.dataItem;

    // this.handleUpdate(dataItem, value);
  }

  public cancelHandler(): void {
    this.editedEvent = undefined;
  }

  public getEventStyles = (args: EventStyleArgs) => {
    return { backgroundColor: args.event.dataItem.color };
  };
}

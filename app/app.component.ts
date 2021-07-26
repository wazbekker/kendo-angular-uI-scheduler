import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CreateFormGroupArgs,
  CrudOperation,
  EditMode,
  EventClickEvent,
  RemoveEvent,
  SchedulerEvent,
  SlotClickEvent
} from '@progress/kendo-angular-scheduler';
import { filter } from 'rxjs/operators';
import { EditService } from './shared/edit.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public selectedDate: Date = new Date();
  public selectedViewIndex = 1;
  public editedEvent: any;
  public editMode: EditMode;
  public isNew: boolean;
  public formGroup: FormGroup;

  constructor(
    private editService: EditService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit(): void {
    this.editService.getEvents();
  }

  public events() {
    return this.editService.events$;
  }

  public fields() {
    return this.editService.fields;
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    // const dataItem = args.dataItem;
    // const isOccurrence = args.mode === EditMode.Occurrence;
    // const exceptions = isOccurrence ? [] : dataItem.recurrenceExceptions;

    this.formGroup = this.formBuilder.group({
      eventType: [1]
      // id: args.isNew ? this.getNextId() : dataItem.id,
      // start: [dataItem.start, Validators.required],
      // end: [dataItem.end, Validators.required],
      // startTimezone: [dataItem.startTimezone],
      // endTimezone: [dataItem.endTimezone],
      // isAllDay: dataItem.isAllDay,
      // title: dataItem.title,
      // description: dataItem.description,
      // recurrenceRule: dataItem.recurrenceRule,
      // recurrenceId: dataItem.recurrenceId,
      // recurrenceExceptions: [exceptions]
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
      Start: start,
      End: end,
      IsAllDay: isAllDay
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
    if (this.isNew) {
      //this.editService.create(formValue);
    } else {
      this.handleUpdate(this.editedEvent, formValue, this.editMode);
    }
  }

  public removeHandler({ sender, dataItem }: RemoveEvent): void {
    sender.openRemoveConfirmationDialog().subscribe(shouldRemove => {
      if (shouldRemove) {
        //this.editService.remove(dataItem);
      }
    });
  }

  public cancelHandler(): void {
    this.editedEvent = undefined;
  }

  private handleUpdate(item: any, value: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Occurrence) {
      // if (service.isException(item)) {
      //   service.update(item, value);
      // } else {
      //   service.createException(item, value);
      // }
    } else {
      // Item is not recurring or we're editing the entire series
      // service.update(item, value);
    }
  }

  private handleRemove(item: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Series) {
      // service.removeSeries(item);
    } else if (mode === EditMode.Occurrence) {
      // if (service.isException(item)) {
      //   service.remove(item);
      // } else {
      //   service.removeOccurrence(item);
      // }
    } else {
      // service.remove(item);
    }
  }
}

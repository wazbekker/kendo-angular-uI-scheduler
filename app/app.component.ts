import { Component } from '@angular/core';
import {
  CrudOperation,
  EditMode,
  EventClickEvent,
  RemoveEvent,
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

  constructor(public editService: EditService) {}

  public ngOnInit(): void {
    this.editService.read();
  }

  public slotDblClickHandler({ start, end, isAllDay }: SlotClickEvent): void {
    this.isNew = true;

    this.editMode = EditMode.Series;

    this.editedEvent = {
      Start: start,
      End: end,
      IsAllDay: isAllDay
    };
  }

  public eventDblClickHandler({ sender, event }: EventClickEvent): void {
    this.isNew = false;

    let dataItem = event.dataItem;

    this.editMode = EditMode.Series;
    this.editedEvent = dataItem;
  }

  public saveHandler(formValue: any): void {
    if (this.isNew) {
      this.editService.create(formValue);
    } else {
      this.handleUpdate(this.editedEvent, formValue, this.editMode);
    }
  }

  public removeHandler({ sender, dataItem }: RemoveEvent): void {
    sender.openRemoveConfirmationDialog().subscribe(shouldRemove => {
      if (shouldRemove) {
        this.editService.remove(dataItem);
      }
    });
  }

  public cancelHandler(): void {
    this.editedEvent = undefined;
  }

  private handleUpdate(item: any, value: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.update(item, value);
      } else {
        service.createException(item, value);
      }
    } else {
      // Item is not recurring or we're editing the entire series
      service.update(item, value);
    }
  }

  private handleRemove(item: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Series) {
      service.removeSeries(item);
    } else if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.remove(item);
      } else {
        service.removeOccurrence(item);
      }
    } else {
      service.remove(item);
    }
  }
}

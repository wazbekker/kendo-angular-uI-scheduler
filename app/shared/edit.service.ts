import { Injectable } from '@angular/core';
import { SchedulerModelFields } from '@progress/kendo-angular-scheduler';
import { BehaviorSubject } from 'rxjs';
import { CustomEvent } from './custom-event.interface';

@Injectable()
export class EditService {
  private events = [
    {
      eventId: 1,
      eventType: 1,
      title: 'DAM Trading Day',
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 1),
      isAllDay: true
    } as CustomEvent,
    {
      eventId: 2,
      eventType: 2,
      title: 'FPM Weekly Trading Day',
      start: new Date(2021, 6, 2),
      end: new Date(2021, 6, 2),
      isAllDay: true
    } as CustomEvent,
    {
      eventId: 3,
      eventType: 3,
      title: 'FPM Monthly Trading Day',
      start: new Date(2021, 6, 3),
      end: new Date(2021, 6, 3),
      isAllDay: true
    } as CustomEvent
  ] as CustomEvent[];

  public events$ = new BehaviorSubject<CustomEvent[] | null>(null);
  public eventLookups$ = new BehaviorSubject<Map<number, string> | null>(null);

  public fields: SchedulerModelFields = {
    id: 'eventId',
    title: 'title',
    description: 'Description',
    start: 'start',
    end: 'end',
    startTimezone: 'StartTimezone',
    endTimezone: 'EndTimezone',
    isAllDay: 'isAllDay',
    recurrenceRule: 'RecurrenceRule',
    recurrenceId: 'RecurrenceID',
    recurrenceExceptions: 'RecurrenceException'
  };

  public getEvents(): void {
    this.events$.next(this.events);
    return;
  }

  protected save(
    created: CustomEvent[],
    updated: CustomEvent[],
    deleted: CustomEvent[]
  ): void {
    const completed = [];
    // if (deleted.length) {
    //   completed.push(this.fetch(REMOVE_ACTION, deleted));
    // }

    // if (updated.length) {
    //   completed.push(this.fetch(UPDATE_ACTION, updated));
    // }

    // if (created.length) {
    //   completed.push(this.fetch(CREATE_ACTION, created));
    // }

    // zip(...completed).subscribe(() => this.read());
  }
}

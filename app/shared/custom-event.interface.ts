import { SchedulerEvent } from '@progress/kendo-angular-scheduler';

export interface CustomEvent extends SchedulerEvent {
  eventType: number;
  color: string;
}

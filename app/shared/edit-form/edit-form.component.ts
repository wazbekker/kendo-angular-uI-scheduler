import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EditMode } from '@progress/kendo-angular-scheduler';

@Component({
  selector: 'scheduler-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent {
  @Input()
  public isNew = false;

  @Input()
  public editMode: EditMode;

  @Input()
  public set event(ev: any) {
    if (ev !== undefined) {
      this.editForm.reset(ev);
      this.active = true;
    }
  }

  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();

  @Output()
  public save: EventEmitter<any> = new EventEmitter();

  public active = false;

  public editForm = new FormGroup({
    eventType: new FormControl(1)
    // start: new FormControl('', Validators.required),
    // end: new FormControl('', Validators.required),
    // isAllDay: new FormControl(false)
  });

  public eventLookups = [
    { text: 'DAM Trading Day', value: 1 },
    { text: 'FPM Weekly Trading Day', value: 2 },
    { text: 'FPM Monthly Trading Day', value: 3 }
  ] as Array<{ text: string; value: number }>;

  constructor(public formBuilder: FormBuilder) {}

  public onSave(e: MouseEvent): void {
    e.preventDefault();
    this.active = false;

    this.save.emit(this.editForm.value);
  }

  public onCancel(e: MouseEvent): void {
    e.preventDefault();
    this.active = false;

    this.cancel.emit();
  }
}

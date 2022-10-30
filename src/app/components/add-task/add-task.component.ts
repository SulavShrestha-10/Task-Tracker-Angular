import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { ITask } from 'src/app/Tasks';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<ITask> = new EventEmitter();
  subscription: Subscription | undefined;
  text: string | undefined;
  day: string | undefined;
  time: string | undefined;
  reminder: boolean = false;
  showAddTask: boolean | undefined;

  constructor( private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(val=>this.showAddTask = val);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.text) {
      alert('Please add the task!')
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder,
    };
    // @ts-ignore
    this.onAddTask.emit(newTask);
    this.text = '';
    this.day = '';
    this.time  = '';
    this.reminder = false;
  }

}

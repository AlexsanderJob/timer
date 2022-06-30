import { Component, ElementRef, ViewChild } from '@angular/core';
import {Subscription, fromEvent, interval, Subject } from 'rxjs';
import { take, takeUntil, tap} from 'rxjs/operators';
import {formatTimer} from "../helpers/formatTimer";

@Component({
  selector: 'default-time',
  templateUrl: './default-time.component.html',
  styleUrls: []
})

export class DefaultTimeComponent {
  timer = 0;
  timerValue: string = '00:00:00';
  _timeInterval: any = null;
  _timeTimeout: any = null;
  isPlayTimer: boolean = false;
  isWait: boolean = false;

  onStartTimer () {
    if (this.isPlayTimer) {
      this.onStopTimer();
    } else {
      this.isPlayTimer = true;
      this._timeInterval = setInterval(() => {
        this.timer = this.timer + 1;
        this.timerValue = formatTimer(this.timer);
      }, 1000);
    }
  }

  onWaitTimer () {
    if (this.isWait) {
      this.onStopTimer();
      this.isWait = false;
    } else {
      clearTimeout(this._timeTimeout);
      this._timeTimeout = setTimeout(() => {
        this.isWait = true;
      }, 500);
    }
  }

  onStopTimer () {
    clearInterval(this._timeInterval);
    this.isPlayTimer = false;
  }

  onResetTimer () {
    this.onStopTimer();
    this.timer = 0;
    this.timerValue = formatTimer(this.timer);
  }
}



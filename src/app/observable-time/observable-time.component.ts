import { Component, ElementRef, ViewChild } from '@angular/core';
import {Subscription, fromEvent, interval, Subject } from 'rxjs';
import { take, takeUntil, tap} from 'rxjs/operators';
import {formatTimer} from "../helpers/formatTimer";

@Component({
  selector: 'observable-time',
  templateUrl: './observable-time.component.html',
  styleUrls: []
})

export class ObservableTimeComponent {
  timer = 0;
  timerValue: string = '00:00:00';
  isPlayTimer: boolean = false;
  private subscriptionsDbClick: Subscription = new Subscription();
  private readonly _stop = new Subject<void>();
  @ViewChild('dbClick') dbClick: ElementRef | null = null;

  onStartTimer () {
    if (this.isPlayTimer) {
      this.onStopTimer();
    } else {
      this.isPlayTimer = true;
      interval(1000).pipe(
        takeUntil(this._stop)
      ).subscribe(() => {
        this.timer = this.timer + 1;
        this.timerValue = formatTimer(this.timer);
      })
    }
  }

  onWaitTimer () {
    if (this.dbClick) {
      let lastClicked = 0;
      this.subscriptionsDbClick = fromEvent(this.dbClick.nativeElement, 'click').pipe(take(2), tap(v => {
        const timeNow = new Date().getTime();
        if (timeNow < (lastClicked + 500)) {
          this.onStopTimer();
        }
        lastClicked = timeNow;
      })).subscribe();
    }
  }

  onStopTimer () {
    this._stop.next();
    this.isPlayTimer = false;
  }

  onResetTimer () {
    this.onStopTimer();
    this.timer = 0;
    this.timerValue = formatTimer(this.timer);
  }
}



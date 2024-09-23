import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

enum Status {
  STOP = 'STOP',
  PAUSE = 'PAUSE',
  RUNNING = 'RUNNING',
}

@Component({
  selector: 'app-simple-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SimplePageComponent implements OnInit {
  timerSeconds: number = 1500;
  breakSeconds: number = 300;

  timerInterval: any = null;
  breakInterval: any = null;

  strMinutes: string = '00';
  strSeconds: string = '00';
  status: Status = Status.STOP;

  currentTimerType: 'TIMER' | 'BREAK' = 'TIMER';

  constructor() {}
  ngOnInit(): void {
    const activeButtons = document.querySelector('.btn-timer');
    activeButtons?.classList.add('active');
    this.updateDisplay(
      this.currentTimerType === 'TIMER' ? this.timerSeconds : this.breakSeconds
    );
    this.status = Status.STOP;
  }

  toggleButton(event: Event, timerType: 'TIMER' | 'BREAK') {
    const buttons = document.querySelectorAll('.btn-timer');
    buttons.forEach((btn) => btn.classList.remove('active'));

    const clickedButton = event.target as HTMLElement;
    clickedButton.classList.add('active');

    this.pauseCurrentTimer();

    this.currentTimerType = timerType;

    if (timerType === 'TIMER') {
      this.updateDisplay(this.timerSeconds);
    } else if (timerType === 'BREAK') {
      this.updateDisplay(this.breakSeconds);
    }
    this.status = Status.STOP;
  }

  startCurrentTimer() {
    if (this.currentTimerType === 'TIMER') {
      this.startTimer();
    } else {
      this.startBreak();
    }
    this.status = Status.RUNNING;
  }

  startTimer() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
          this.updateDisplay(this.timerSeconds);
        } else {
          this.handleTimerEnd();
        }
      }, 1000);
    }
  }

  startBreak() {
    if (!this.breakInterval) {
      this.breakInterval = setInterval(() => {
        if (this.breakSeconds > 0) {
          this.breakSeconds--;
          this.updateDisplay(this.breakSeconds);
        } else {
          this.handleBreakEnd();
        }
      }, 1000);
    }
  }

  handleTimerEnd() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timerSeconds = 1500;
    this.currentTimerType = 'BREAK';
    this.breakSeconds = 300;
    this.updateDisplay(this.breakSeconds);

    const timerButton = document.querySelector('#btnTimer');
    const breakButton = document.querySelector('#btnTimerBreak');
    timerButton?.classList.remove('active');
    breakButton?.classList.add('active');

    this.status = Status.STOP;
  }

  handleBreakEnd() {
    clearInterval(this.breakInterval);
    this.breakInterval = null;
    this.breakSeconds = 5;
    this.currentTimerType = 'TIMER';
    this.updateDisplay(this.timerSeconds);

    const timerButton = document.querySelector('#btnTimer');
    const breakButton = document.querySelector('#btnTimerBreak');
    breakButton?.classList.remove('active');
    timerButton?.classList.add('active');

    this.status = Status.STOP;
  }

  pauseCurrentTimer() {
    if (this.currentTimerType === 'TIMER' && this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    } else if (this.currentTimerType === 'BREAK' && this.breakInterval) {
      clearInterval(this.breakInterval);
      this.breakInterval = null;
    }
    this.status = Status.PAUSE;
  }

  stopCurrentTimer() {
    if (this.currentTimerType === 'TIMER') {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.timerSeconds = 1500;
    } else if (this.currentTimerType === 'BREAK') {
      clearInterval(this.breakInterval);
      this.breakInterval = null;
      this.breakSeconds = 300;
    }
    this.status = Status.STOP;
    this.updateDisplay(
      this.currentTimerType === 'TIMER' ? this.timerSeconds : this.breakSeconds
    );
  }

  updateDisplay(seconds: number) {
    this.strMinutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    this.strSeconds = (seconds % 60).toString().padStart(2, '0');
  }
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import AdvicesInterface from './advices.interface';

@Component({
  selector: 'app-advices',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './advices.component.html',
  styleUrl: './advices.component.css',
})
export class AdvicesComponent implements OnInit, OnDestroy {
  resp: string = '';
  interval: any;
  subscription: Subscription | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAdvice();

    this.interval = setInterval(() => {
      this.fetchAdvice();
    }, 5000);
  }

  fetchAdvice(): void {
    this.subscription = this.http
      .get<AdvicesInterface>('https://api.adviceslip.com/advice')
      .subscribe((response: AdvicesInterface) => {
        const slip = response.slip;
        this.resp = slip.advice;
      });
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

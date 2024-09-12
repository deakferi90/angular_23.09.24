import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstStepComponent } from './first-step/first-step.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstStepComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-steps-app';
  currentStep: number = 1;
}

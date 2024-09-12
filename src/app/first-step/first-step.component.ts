import { Component } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [SvgComponent, FormsComponent],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.css',
})
export class FirstStepComponent {}

import { Component, Input } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { FormsComponent } from '../forms/forms.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [SvgComponent, FormsComponent, CommonModule],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.css',
})
export class FirstStepComponent {
  @Input() currentStep!: number;
}

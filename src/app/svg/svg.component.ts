import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent {
  @Input() currentStep!: number;
  active: boolean = true;
  stepsData = [
    {
      id: 1,
      subtitle: 'STEP 1',
      title: 'YOUR INFO',
      active: true,
    },
    {
      id: 2,
      subtitle: 'STEP 2',
      title: 'SELECT PLAN',
      active: false,
    },
    {
      id: 3,
      subtitle: 'STEP 3',
      title: 'ADD-ONS',
      active: false,
    },
    {
      id: 4,
      subtitle: 'STEP 4',
      title: 'SUMMARY',
      active: false,
    },
  ];

  setActiveStep(stepId: number): void {
    this.stepsData.filter((step) => (step.active = false));
    const activeStep = this.stepsData.find((step) => step.id === stepId);
    if (activeStep) {
      activeStep.active = true;
    }
  }
}

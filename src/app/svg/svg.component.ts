import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent implements OnChanges {
  @Input() currentStep!: number;
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentStep']) {
      this.updateActiveStep(this.currentStep);
    }
  }

  private updateActiveStep(step: number) {
    this.stepsData.forEach((s) => {
      s.active = s.id === step;
    });
  }
}

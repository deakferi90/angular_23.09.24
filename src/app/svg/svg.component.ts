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
  stepsData = [
    {
      id: 1,
      subtitle: 'STEP 1',
      title: 'YOUR INFO',
    },
    {
      id: 2,
      subtitle: 'STEP 2',
      title: 'SELECT PLAN',
    },
    {
      id: 3,
      subtitle: 'STEP 3',
      title: 'ADD-ONS',
    },
    {
      id: 4,
      subtitle: 'STEP 4',
      title: 'SUMMARY',
    },
  ];
}

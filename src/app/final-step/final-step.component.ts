import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-final-step',
  standalone: true,
  imports: [SvgComponent],
  templateUrl: './final-step.component.html',
  styleUrl: './final-step.component.css',
})
export class FinalStepComponent {
  @Input() currentStep!: number;
  @Input() pricesAndNames!: string[];
  @Input() totalPrice!: number;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  constructor() {}

  onBack(e: Event) {
    e.preventDefault();
    this.prevStep.emit();
  }

  onFinish() {
    this.nextStep.emit();
  }
}

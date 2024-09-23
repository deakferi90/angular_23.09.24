import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-third-step',
  standalone: true,
  imports: [SvgComponent, ReactiveFormsModule],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.css',
})
export class ThirdStepComponent {
  @Input() currentStep!: number;
  personalInfoForm: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() addOnSelected = new EventEmitter<string[]>();

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addOnData = [
    {
      id: 1,
      title: 'Online service',
      subtitle: 'Access to multiplayer games',
      price: '+$1/mo',
    },
    {
      id: 2,
      title: 'Larger storage',
      subtitle: 'Extra 1TB of cloud save',
      price: '+$2/mo',
    },
    {
      id: 3,
      title: 'Customizable Profile',
      subtitle: 'Custom theme on your profile',
      price: '+$2/mo',
    },
  ];

  onNext() {
    this.nextStep.emit();
  }

  onBack() {
    this.prevStep.emit();
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      this.nextStep.emit();
    } else {
      this.personalInfoForm.markAllAsTouched();
    }
  }

  selectSwitchPrice(event: any): void {
    // Find the closest .switch-box
    const switchBox = event.target.closest('.switch-box');

    if (!switchBox) {
      console.error('No switch-box found');
      return;
    }

    // Find the checkbox within the switch-box
    const checkbox = switchBox.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    const titleElement = switchBox.querySelector('.title') as HTMLElement;
    const priceElement = switchBox.querySelector('.plan-price') as HTMLElement;

    if (checkbox && titleElement && priceElement) {
      // Toggle the checkbox state
      checkbox.checked = !checkbox.checked;

      // Extract the title and price
      const titleText = titleElement.textContent?.trim() || '';
      const priceText = priceElement.textContent?.trim() || '';

      // Extract price from the text using regex
      const priceRegex = /\$\d+/;
      const match = priceText.match(priceRegex);

      if (checkbox.checked && match) {
        const arr = [titleText, match[0]];
        this.addOnSelected.emit(arr);
      }
    } else {
      console.error('Checkbox, title, or price element not found');
    }
  }
}

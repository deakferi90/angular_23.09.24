import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Plan {
  id: number;
  title: string;
  price: string;
  yearlyPrice: string;
  iconPath: string;
  color: string;
}

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [SvgComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.css',
})
export class SecondStepComponent {
  @Input() currentStep!: number;
  personalInfoForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();
  @Output() priceSelected = new EventEmitter<string[]>();
  isYearly: boolean = false;
  price: any = '';
  data: any = '';

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      isYearly: [false],
    });
    this.personalInfoForm
      .get('isYearly')
      ?.valueChanges.subscribe((isYearly) => {
        this.isYearly = isYearly;
        this.cd.detectChanges();
      });
  }

  planData: Plan[] = [
    {
      id: 1,
      title: 'Arcade',
      price: '$9/mo',
      yearlyPrice: '$90/yr',
      iconPath:
        'M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z',
      color: '#FFAF7E',
    },
    {
      id: 2,
      title: 'Advanced',
      price: '$12/mo',
      yearlyPrice: '$120/yr',
      iconPath:
        'M25 15H15c-2.2 0-4 1.8-4 4s1.8 4 4 4h10c2.2 0 4-1.8 4-4s-1.8-4-4-4zM17 20c.2 0 .4-.2.4-.4v-1h-1v1.4c0 .2-.2.4-.4.4h-1v-1.6h1V17c0-.2.2-.4.4-.4h1c.2 0 .4.2.4.4v1.4h1c.2 0 .4.2.4.4v1.4h1c.2 0 .4-.2.4-.4v-1.4c0-.2-.2-.4-.4-.4h-1v-1h1v-1c0-.2-.2-.4-.4-.4h-1c-.2 0-.4.2-.4.4v1.4h-1c-.2 0-.4.2-.4.4v1.4h-1zM23 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM25 18a1 1 0 1 0-2 0 1 1 0 0 0 2 0z',
      color: '#F9818E',
    },
    {
      id: 3,
      title: 'Pro',
      price: '$15/mo',
      yearlyPrice: '$150/yr',
      iconPath:
        'M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z',
      color: '#483EFF',
    },
  ];

  onNext() {
    this.nextStep.emit();
  }

  onBack() {
    this.prevStep.emit();
  }

  onSubmit() {
    this.personalInfoForm.markAllAsTouched();
  }

  onPlanSelect(event: any): void {
    // Find the closest .selection-box parent element (if it's clicked directly)
    const selectionBox = event.target.closest('.selection-box');

    // If no selection-box is found (edge case), return
    if (!selectionBox) {
      console.error('No selection-box found');
      return;
    }

    // Remove the "selected" class from any other .selection-boxes
    const allBoxes = document.querySelectorAll('.selection-box');
    allBoxes.forEach((box) => box.classList.remove('selected'));

    // Add the "selected" class to the clicked .selection-box
    selectionBox.classList.add('selected');

    // Locate the price inside the .selection-box (from .plan-price)
    const priceElement = selectionBox.querySelector('.plan-price');
    const titleElement = selectionBox.querySelector(
      '.plan-title'
    ) as HTMLElement;

    // If price element is not found, log an error
    if (!priceElement) {
      console.error('Price element not found in the selection box');
      return;
    }

    // Extract the price text (e.g., "$99" or "$199")
    const priceText = priceElement.innerText;
    const titleText = titleElement.innerText;

    // Define a regex to match the price (assuming a price format like "$99")
    const priceRegex = /\$\d+/;
    const match = priceText.match(priceRegex);

    // Check if there is a match and log the price (match[0])
    if (match && match[0]) {
      const arrEl = [titleText, match[0]];
      this.priceSelected.emit(arrEl); // Emit the price if required
    } else {
      console.error('No valid price found in the price element');
    }
  }

  get IsYearly() {
    return this.personalInfoForm.get('isYearly')?.value;
  }
}

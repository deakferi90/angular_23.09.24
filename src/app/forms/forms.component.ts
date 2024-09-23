import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SecondStepComponent } from '../second-step/second-step.component';
import { ThirdStepComponent } from '../third-step/third-step.component';
import { FinalStepComponent } from '../final-step/final-step.component';
import { FirstStepComponent } from '../first-step/first-step.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SecondStepComponent,
    ThirdStepComponent,
    FinalStepComponent,
    FirstStepComponent,
  ],
})
export class FormsComponent {
  formErrorMessage: string | null = null;
  @Input() currentStep: number = 1;
  priceValue: string = '';
  prevStep: any;
  totalPrice: any;
  price: any = [];
  pricesAndNames: any = [];

  constructor() {}

  goToNextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getExactPrice(price: string | any) {
    this.price = price;
  }

  selectSwitchPrice(priceTwo: string | any) {
    this.pricesAndNames = [this.price, priceTwo];
    this.totalPrice = this.getTotalPrice();
    return this.totalPrice;
  }

  getTotalPrice(): number {
    return this.pricesAndNames.reduce((total: number, item: any[]) => {
      const priceString = item[1];

      const priceNumber = parseInt(priceString.replace('$', ''), 10);

      return total + priceNumber;
    }, 0);
  }
}

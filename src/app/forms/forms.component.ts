import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormsComponent {
  personalInfoForm: FormGroup;
  formErrorMessage: string | null = null;
  currentStep: number = 1;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
    });
  }

  nameValidator(control: AbstractControl): object | null {
    const namePattern = /^[A-Za-z]+(-[A-Za-z]+)*(\s[A-Za-z]+(-[A-Za-z]+)*)*$/;

    if (!control.value) {
      return null;
    }
    if (!namePattern.test(control.value)) {
      return { name: true };
    }

    return null;
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phonePattern = /^[0-9]{10}$/; // Example pattern for 10 digits
    if (!control.value) {
      return null; // No validation if empty
    }
    if (!phonePattern.test(control.value)) {
      return { phone: true }; // Invalid phone number
    }
    return null;
  }

  get f() {
    return this.personalInfoForm.controls;
  }

  onSubmit() {
    if (this.currentStep > 4) {
      this.currentStep = 1;
    }

    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    if (this.personalInfoForm.valid) {
      // Proceed to next step
      this.currentStep = this.currentStep + 1; // Adjust this value based on your step logic
    }

    // Handle form submission
    console.log('Form Submitted!', this.personalInfoForm.value);
  }
}

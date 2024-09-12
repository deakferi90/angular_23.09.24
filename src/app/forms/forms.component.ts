import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.phoneValidator]],
    });
  }

  nameValidator(control: AbstractControl) {
    const namePattern = /^[A-Za-z-]+$/;

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
    if (this.personalInfoForm.invalid) {
      this.formErrorMessage = this.getFormErrorMessage();
      this.personalInfoForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    // Handle form submission
    console.log('Form Submitted!', this.personalInfoForm.value);
  }

  private getFormErrorMessage(): string {
    if (this.personalInfoForm.controls['name'].errors?.['required']) {
      return 'Invalid name.';
    }
    if (this.personalInfoForm.controls['email'].errors?.['required']) {
      return 'Invalid email address.';
    }
    if (this.f['phone'].errors?.['required']) {
      return 'Invalid phone number.';
    }
    return 'Form is invalid.';
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { FormsComponent } from '../forms/forms.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [SvgComponent, FormsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.css',
})
export class FirstStepComponent {
  personalInfoForm: FormGroup;
  formErrorMessage: string | null = null;
  @Input() currentStep!: number;
  @Input() pricesAndNames!: string[];
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

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
    const phonePattern = /^[0-9]{10}$/;
    if (!control.value) {
      return null;
    }
    if (!phonePattern.test(control.value)) {
      return { phone: true };
    }
    return null;
  }

  get f() {
    return this.personalInfoForm.controls;
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      this.nextStep.emit();
    }
    if (this.personalInfoForm.invalid) {
      this.personalInfoForm.markAllAsTouched(); // Highlights all invalid fields
      return;
    }
  }
}

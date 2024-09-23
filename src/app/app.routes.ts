import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SimplePageComponent } from './simple-page/simple-page.component';

export const routes: Routes = [
  { path: 'forms', component: FormsComponent },
  { path: 'simple', component: SimplePageComponent },
  { path: '', redirectTo: '/forms', pathMatch: 'full' },
];

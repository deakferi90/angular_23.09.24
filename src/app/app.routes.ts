import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SimplePageComponent } from './simple-page/simple-page.component';
import { AdvicesComponent } from './advices/advices.component';

export const routes: Routes = [
  { path: 'forms', component: FormsComponent },
  { path: 'simple', component: SimplePageComponent },
  { path: 'advices', component: AdvicesComponent },
  { path: '', redirectTo: '/forms', pathMatch: 'full' },
];

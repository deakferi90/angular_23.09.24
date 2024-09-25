import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SimplePageComponent } from './simple-page/simple-page.component';
import { AdvicesComponent } from './advices/advices.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

export const routes: Routes = [
  { path: 'forms', component: FormsComponent },
  { path: 'simple', component: SimplePageComponent },
  { path: 'advices', component: AdvicesComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: '', redirectTo: '/forms', pathMatch: 'full' },
];

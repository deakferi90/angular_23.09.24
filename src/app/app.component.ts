import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SimplePageComponent } from './simple-page/simple-page.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsComponent, RouterModule, SimplePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-steps-app';
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
  currentStep: number = 1;
}

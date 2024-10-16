import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SimplePageComponent } from './simple-page/simple-page.component';
import { routes } from './app.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideStore } from '@ngrx/store';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { todoReducer } from './todo/todo.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsComponent,
    RouterModule,
    SimplePageComponent,
    NgxChartsModule,
  ],
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

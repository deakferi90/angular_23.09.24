import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './app/todo/store/todo.reducer'; // Adjust the path based on your project structure
import routes from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ todos: todoReducer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Set to true to restrict extension to log-only mode
    }),
    provideRouter(routes),
  ],
});

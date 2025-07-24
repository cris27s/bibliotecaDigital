import 'zone.js';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) // ← NECESARIO también en SSR
  ]
});

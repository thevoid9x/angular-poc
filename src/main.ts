import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(window as Window & {__angularReproInitialUrl?: string}).__angularReproInitialUrl =
  window.location.pathname + window.location.search + window.location.hash;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

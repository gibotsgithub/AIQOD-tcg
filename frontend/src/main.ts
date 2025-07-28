import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ✅ Step 1: Clear all cookies
document.cookie.split(';').forEach((cookie) => {
  const name = cookie.split('=')[0].trim();
  document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/`;
});

// ✅ Step 2: Clear sessionStorage & localStorage
sessionStorage.clear();
localStorage.clear();

// ✅ Step 3: Unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

// ✅ Step 4: Bootstrap the Angular app
bootstrapApplication(App, appConfig).catch((err) => console.error(err));

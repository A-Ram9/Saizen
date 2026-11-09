import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HealthService } from './core/health.service';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './core/loader/loader.service';

const MIN_LOADER_MS = 900;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() {
    const loader = inject(LoaderService);
    const started = Date.now();
    const release = () =>
      setTimeout(() => loader.hide(), Math.max(0, MIN_LOADER_MS - (Date.now() - started)));

    // Keep the loader up until the API has answered (or failed) and the minimum time has passed.
    inject(HealthService).get().subscribe({ next: release, error: release });
  }
}

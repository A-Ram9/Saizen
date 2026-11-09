import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Health, HealthService } from './core/health.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly healthService = inject(HealthService);

  protected readonly health = signal<Health | null>(null);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.healthService.get().subscribe({
      next: h => this.health.set(h),
      error: e => this.error.set(e.error?.databaseError ?? e.message)
    });
  }
}

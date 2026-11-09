import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Health {
  status: string;
  database: boolean;
  databaseError: string | null;
  timestampUtc: string;
}

@Injectable({ providedIn: 'root' })
export class HealthService {
  private readonly http = inject(HttpClient);

  readonly result = signal<Health | null>(null);
  readonly error = signal<string | null>(null);

  get(): Observable<Health> {
    return this.http.get<Health>(`${environment.apiUrl}/health`).pipe(
      tap({
        next: h => this.result.set(h),
        error: e => this.error.set(e.error?.databaseError ?? e.message),
      }),
    );
  }
}

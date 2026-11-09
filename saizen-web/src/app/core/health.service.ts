import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

  get(): Observable<Health> {
    return this.http.get<Health>(`${environment.apiUrl}/health`);
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly _visible = signal(true);
  readonly visible = this._visible.asReadonly();

  show(): void { this._visible.set(true); }
  hide(): void { this._visible.set(false); }
}

import { Component, signal } from '@angular/core';
import { LoaderService } from '../../core/loader/loader.service';
import { SplitTextDirective } from '../../core/motion/split-text.directive';
import { inject } from '@angular/core';

@Component({
  selector: 'app-style-kit',
  imports: [SplitTextDirective],
  templateUrl: './style-kit.html',
  styleUrl: './style-kit.scss',
})
export class StyleKit {
  private readonly loader = inject(LoaderService);

  /** Bumped to re-create the demo headings so their animation plays again. */
  protected readonly run = signal(0);

  protected readonly swatches = [
    { name: 'Plum', token: '--plum' },
    { name: 'Plum tint 1', token: '--plum-tint-1' },
    { name: 'Plum tint 2', token: '--plum-tint-2' },
    { name: 'Plum tint 3', token: '--plum-tint-3' },
    { name: 'Plum tint 4', token: '--plum-tint-4' },
    { name: 'Milk muted', token: '--milk-muted' },
    { name: 'Milk dim', token: '--milk-dim' },
    { name: 'Milk', token: '--milk' },
  ];

  protected replayText(): void { this.run.update(n => n + 1); }

  protected replayLoader(): void {
    this.loader.show();
    setTimeout(() => this.loader.hide(), 4500);
  }
}

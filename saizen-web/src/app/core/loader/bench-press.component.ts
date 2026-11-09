import { Component, input } from '@angular/core';

/** Line-art figure: a person on a bench pressing a barbell (side view). */
@Component({
  selector: 'app-bench-press',
  styleUrls: ['./figure.scss', './bench-press.component.scss'],
  template: `
    <svg viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
         [class.is-moving]="moving()">
      <path class="draw" pathLength="1" style="--d:0s" d="M10 120H230" />
      <path class="draw" pathLength="1" style="--d:.05s" d="M44 90H150M56 90V120M138 90V120" />
      <circle class="draw" pathLength="1" style="--d:.1s" cx="46" cy="80" r="8" />
      <path class="draw" pathLength="1" style="--d:.15s" d="M54 84H130L158 70L172 118H184" />
      <g class="bar">
        <path class="draw" pathLength="1" style="--d:.25s" d="M58 44H94" />
        <path class="draw" pathLength="1" style="--d:.3s" d="M58 36V52M94 36V52" />
      </g>
      <path class="draw arm" pathLength="1" style="--d:.2s" d="M66 84L66 64L66 44" />
    </svg>
  `,
})
export class BenchPressComponent {
  readonly moving = input(false);
}

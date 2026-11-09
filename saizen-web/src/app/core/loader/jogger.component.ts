import { Component, input } from '@angular/core';

/** Line-art figure: a woman jogging to the right (side view) with a looping run cycle. */
@Component({
  selector: 'app-jogger',
  styleUrls: ['./figure.scss', './jogger.component.scss'],
  template: `
    <svg viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
         [class.is-moving]="moving()">
      <path class="draw" pathLength="1" style="--d:0s" d="M10 120H230" />
      <g class="body">
        <g class="far">
          <g class="leg leg--b">
            <g class="thigh">
              <path class="draw" pathLength="1" style="--d:.1s" d="M112 70V94" />
              <g class="shank">
                <path class="draw" pathLength="1" style="--d:.15s" d="M112 94V118H120" />
              </g>
            </g>
          </g>
          <g class="arm arm--b">
            <path class="draw" pathLength="1" style="--d:.2s" d="M124 46L124 62L134 56" />
          </g>
        </g>
        <circle class="draw" pathLength="1" style="--d:.05s" cx="130" cy="34" r="7" />
        <path class="draw" pathLength="1" style="--d:.1s" d="M125 31Q116 24 111 33" />
        <path class="draw" pathLength="1" style="--d:.05s" d="M112 70L124 46" />
        <g class="leg leg--a">
          <g class="thigh">
            <path class="draw" pathLength="1" style="--d:.15s" d="M112 70V94" />
            <g class="shank">
              <path class="draw" pathLength="1" style="--d:.2s" d="M112 94V118H120" />
            </g>
          </g>
        </g>
        <g class="arm arm--a">
          <path class="draw" pathLength="1" style="--d:.25s" d="M124 46L124 62L134 56" />
        </g>
      </g>
    </svg>
  `,
})
export class JoggerComponent {
  readonly moving = input(false);
}

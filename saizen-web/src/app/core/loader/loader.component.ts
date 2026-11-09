import { Component, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { BenchPressComponent } from './bench-press.component';
import { JoggerComponent } from './jogger.component';
import { LoaderService } from './loader.service';

const LINES = [
  'Discipline is the shortest path.',
  'One more rep.',
  'Small hours add up to a new body.',
  'Show up tired. Leave stronger.',
  'The scale follows the habit.',
  'Earn today before you spend it.',
  'Rank is just consistency, counted.',
];

/** The figures draw in first; their motion starts once the outlines are complete. */
const MOTION_START_MS = 850;

@Component({
  selector: 'app-loader',
  imports: [BenchPressComponent, JoggerComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  protected readonly loader = inject(LoaderService);
  private index = Math.floor(Math.random() * LINES.length);
  protected readonly line = signal(LINES[this.index]);

  /** Bumped each time the loader appears so the figures are re-created and draw in again. */
  protected readonly figureRun = signal(0);
  protected readonly moving = signal(false);

  constructor() {
    const timer = setInterval(() => {
      this.index = (this.index + 1) % LINES.length;
      this.line.set(LINES[this.index]);
    }, 1600);

    let motionTimer: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      if (!this.loader.visible()) return;
      clearTimeout(motionTimer);
      untracked(() => {
        this.figureRun.update(n => n + 1);
        this.moving.set(false);
      });
      motionTimer = setTimeout(() => this.moving.set(true), MOTION_START_MS);
    });

    inject(DestroyRef).onDestroy(() => {
      clearInterval(timer);
      clearTimeout(motionTimer);
    });
  }
}

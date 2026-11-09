import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import { gsap, prefersReducedMotion, SplitText } from './gsap';

/**
 * Animates a heading in with GSAP SplitText: each char (or word) rises slightly and fades in.
 * Usage: <h1 appSplitText>Text</h1>, <h2 appSplitText="words" [splitDelay]="0.2">Text</h2>.
 * With prefers-reduced-motion the text just fades in.
 */
@Directive({ selector: '[appSplitText]' })
export class SplitTextDirective implements OnDestroy {
  readonly mode = input<'chars' | 'words' | ''>('chars', { alias: 'appSplitText' });
  readonly splitDelay = input(0.15);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private split?: SplitText;
  private tween?: gsap.core.Tween;
  private destroyed = false;

  constructor() {
    afterNextRender(() => {
      // Wait for webfonts so the split is measured with the final glyph widths.
      document.fonts.ready.then(() => this.play());
    });
  }

  private play(): void {
    if (this.destroyed) return;

    if (prefersReducedMotion()) {
      this.el.classList.add('split-ready');
      this.tween = gsap.fromTo(this.el, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: this.splitDelay() });
      return;
    }

    const byWord = this.mode() === 'words';
    this.split = SplitText.create(this.el, { type: byWord ? 'words' : 'chars,words' });
    const targets = byWord ? this.split.words : this.split.chars;

    this.el.classList.add('split-ready');
    this.tween = gsap.from(targets, {
      y: 36,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: byWord ? 0.08 : 0.03,
      delay: this.splitDelay(),
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.tween?.kill();
    this.split?.revert();
  }
}

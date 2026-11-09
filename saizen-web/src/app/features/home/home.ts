import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HealthService } from '../../core/health.service';
import { SplitTextDirective } from '../../core/motion/split-text.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SplitTextDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly health = inject(HealthService);
}

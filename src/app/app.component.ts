import { Component } from '@angular/core';
import { CreditCardComponent } from './credit-card/credit-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreditCardComponent],
  template: `
    <app-credit-card></app-credit-card>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    }
  `]
})
export class AppComponent {
  title = 'credit-card-generator';
}

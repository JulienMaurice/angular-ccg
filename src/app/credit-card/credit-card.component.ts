import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ClipboardModule
  ],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {
  cardNumber: string = '';
  cardholderName: string = '';
  expiryDate: string = '';
  cvv: string = '';
  selectedCardType: string = 'visa';
  private currentCardTypeIndex: number = 0;
  private readonly cardTypes = ['visa', 'mastercard', 'amex'];

  // Persona details
  personaPhone: string = '';
  personaAddress: string = '';
  personaCity: string = '';
  personaState: string = '';
  personaZip: string = '';
  personaSSN: string = '';

  constructor(private creditCardService: CreditCardService) {
    this.generateNewCard();
  }

  generateNewCard(): void {
    // Cycle through card types
    this.currentCardTypeIndex = (this.currentCardTypeIndex + 1) % this.cardTypes.length;
    this.selectedCardType = this.cardTypes[this.currentCardTypeIndex];

    this.cardNumber = this.creditCardService.generateCreditCardNumber(this.selectedCardType);
    this.cardholderName = this.creditCardService.generateCardholderName();
    this.expiryDate = this.creditCardService.generateExpiryDate();
    this.cvv = this.creditCardService.generateCVV(this.selectedCardType);

    // Generate persona details
    this.generatePersonaDetails();
  }

  private generatePersonaDetails(): void {
    // Generate a valid US phone number
    const areaCode = Math.floor(Math.random() * (999 - 200) + 200).toString();
    const prefix = Math.floor(Math.random() * (999 - 200) + 200).toString();
    const lineNumber = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
    this.personaPhone = `(${areaCode}) ${prefix}-${lineNumber}`;

    // US States array with real state abbreviations
    const states = [
      { name: 'California', abbr: 'CA' },
      { name: 'New York', abbr: 'NY' },
      { name: 'Texas', abbr: 'TX' },
      { name: 'Florida', abbr: 'FL' },
      { name: 'Illinois', abbr: 'IL' }
    ];

    // Real street names and cities
    const streets = [
      '123 Park Avenue',
      '456 Madison Street',
      '789 Broadway',
      '321 Oak Lane',
      '654 Pine Road'
    ];

    const cities = [
      { name: 'Los Angeles', state: 'CA', zip: '90001' },
      { name: 'New York City', state: 'NY', zip: '10001' },
      { name: 'Houston', state: 'TX', zip: '77001' },
      { name: 'Miami', state: 'FL', zip: '33101' },
      { name: 'Chicago', state: 'IL', zip: '60601' }
    ];

    // Select random city and matching state
    const selectedCity = cities[Math.floor(Math.random() * cities.length)];
    const selectedStreet = streets[Math.floor(Math.random() * streets.length)];

    this.personaAddress = selectedStreet;
    this.personaCity = selectedCity.name;
    this.personaState = selectedCity.state;
    this.personaZip = selectedCity.zip;

    // Generate a valid format SSN (for display only - not real SSNs)
    const area = Math.floor(Math.random() * (999 - 100) + 100).toString();
    const group = Math.floor(Math.random() * (99 - 10) + 10).toString();
    const serial = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
    this.personaSSN = `${area}-${group}-${serial}`;
  }

  formatCardNumber(number: string): string {
    return number.match(/.{1,4}/g)?.join(' ') || number;
  }
}

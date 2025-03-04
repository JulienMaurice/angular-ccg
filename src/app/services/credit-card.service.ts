import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private readonly cardTypes = ['visa', 'mastercard', 'amex'];

  constructor() { }

  generateRandomNumber(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }

  generateCreditCardNumber(type: string = 'visa'): string {
    let prefix = '';
    let length = 16;

    switch (type.toLowerCase()) {
      case 'visa':
        prefix = '4';
        break;
      case 'mastercard':
        prefix = '5';
        length = 16;
        break;
      case 'amex':
        prefix = '3';
        length = 15;
        break;
      default:
        prefix = '4';
    }

    const remainingLength = length - prefix.length;
    return prefix + this.generateRandomNumber(remainingLength);
  }

  generateExpiryDate(): string {
    const currentDate = new Date();
    const month = Math.floor(Math.random() * 12) + 1;
    const year = currentDate.getFullYear() + Math.floor(Math.random() * 5) + 1;
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  }

  generateCVV(type: string = 'visa'): string {
    const length = type.toLowerCase() === 'amex' ? 4 : 3;
    return this.generateRandomNumber(length);
  }

  generateCardholderName(): string {
    const firstNames = ['John', 'Jane', 'Michael', 'Emma', 'William', 'Olivia', 'James', 'Sophia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
  }

  getCardTypes(): string[] {
    return this.cardTypes;
  }
}

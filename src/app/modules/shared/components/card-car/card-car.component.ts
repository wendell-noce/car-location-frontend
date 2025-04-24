import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-car',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-car.component.html',
  styleUrl: './card-car.component.scss'
})
export class CardCarComponent {
  readonly car = input<any>();
}

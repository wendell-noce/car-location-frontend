import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected isDropdownOpen = signal(false);
  toggle = () => this.isDropdownOpen.update(openNow => !openNow);

  logout = () => {
    sessionStorage.clear;    
    window.location.reload();
  }
}

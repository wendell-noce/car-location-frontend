import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CarsService } from '@app/core/services/cars/cars.service';
import { CardCarComponent } from "../../shared/components/card-car/card-car.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, CardCarComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  private carService = inject(CarsService);
  
  readonly error = signal<string | null>(null);
  readonly cars = signal<{ cars: any[] | null; loading: boolean }>({
    cars: null,
    loading: true,
  });

  ngOnInit() {
    // Chamada para o serviço que vai buscar os carros
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars.set({ cars: data.cars, loading: false });
        console.log(data);
        
      },
      error: (error) => {
        this.error.set(error);
        this.cars.set({ cars: null, loading: false });
      },
    });
  }  
}


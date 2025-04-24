import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private api = inject(ApiService);

  getCars(): Observable<any> {
    return this.api.get('car');
  }
}

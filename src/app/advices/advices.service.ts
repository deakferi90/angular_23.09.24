import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AdvicesInterface from './advices.interface';

@Injectable({
  providedIn: 'root',
})
export class AdvicesService {
  constructor(private http: HttpClient) {}

  getAdvices(): Observable<AdvicesInterface> {
    return this.http.get<AdvicesInterface>('https://api.adviceslip.com/advice');
  }
}

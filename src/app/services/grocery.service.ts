import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = '/api/grocery-items';

  constructor(private http: HttpClient) {}

  getItems() {
    return firstValueFrom(this.http.get<any[]>(this.apiUrl));
  }

  getItem(id: string) {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
  }

  addItem(item: any) {
    return firstValueFrom(this.http.post<any>(this.apiUrl, item));
  }

  updateItem(id: string, item: any) {
    return firstValueFrom(this.http.put<any>(`${this.apiUrl}/${id}`, item));
  }

  deleteItem(id: string) {
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
  }

  clearCart() {
    // This will need a new endpoint in your Express backend
    return firstValueFrom(this.http.delete<any>(`${this.apiUrl}`));
  }
}
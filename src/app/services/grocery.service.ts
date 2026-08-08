import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface GroceryItem {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  isFood: boolean;
}

export type GroceryItemInput = Omit<GroceryItem, '_id'>;

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getItems() {
    return firstValueFrom(this.http.get<GroceryItem[]>(this.apiUrl));
  }

  getItem(id: string) {
    return firstValueFrom(this.http.get<GroceryItem>(`${this.apiUrl}/${id}`));
  }

  addItem(item: GroceryItemInput) {
    return firstValueFrom(this.http.post<GroceryItem>(this.apiUrl, item));
  }

  updateItem(id: string, item: GroceryItemInput) {
    return firstValueFrom(this.http.put<GroceryItem>(`${this.apiUrl}/${id}`, item));
  }

  deleteItem(id: string) {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  clearCart() {
    // This will need a new endpoint in your Express backend
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}`));
  }
}
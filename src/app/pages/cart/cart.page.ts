import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemFormPage } from '../item-form/item-form.page';
import { GroceryService } from '../../services/grocery.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItemSliding, IonItem, IonLabel, IonNote, IonItemOptions,
  IonItemOption, IonIcon, IonFab, IonFabButton, IonFooter,
  IonButtons, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonNote,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFooter,
    IonButtons,
    IonButton
  ]
})
export class CartPage implements OnInit {
  items: any[] = [];
  subtotal = 0;
  foodTax = 0;
  nonFoodTax = 0;
  total = 0;

  constructor(
    private modalCtrl: ModalController,
    private groceryService: GroceryService,
    private alertCtrl: AlertController
  ) {
    addIcons({
      'trash-outline': trashOutline,
      'create-outline': createOutline,
      'add': add
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    try {
      this.items = await this.groceryService.getItems();
      this.calculateTotals();
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  calculateTotals() {
    this.subtotal = 0;
    this.foodTax = 0;
    this.nonFoodTax = 0;

    this.items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      this.subtotal += itemTotal;
      
      if (item.isFood) {
        this.foodTax += itemTotal * 0.03;
      } else {
        this.nonFoodTax += itemTotal * 0.0875;
      }
    });

    this.total = this.subtotal + this.foodTax + this.nonFoodTax;
  }

  async addItem() {
    const modal = await this.modalCtrl.create({
      component: ItemFormPage,
      componentProps: {
        mode: 'add'
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    return await modal.present();
  }

  async editItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ItemFormPage,
      componentProps: {
        mode: 'edit',
        item: item
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadItems();
      }
    });

    return await modal.present();
  }

  async deleteItem(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to remove ${item.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            await this.groceryService.deleteItem(item._id);
            this.loadItems();
          }
        }
      ]
    });

    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertCtrl.create({
      header: 'Clear Cart',
      message: 'Are you sure you want to remove all items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          handler: async () => {
            await this.groceryService.clearCart();
            this.loadItems();
          }
        }
      ]
    });

    await alert.present();
  }
}
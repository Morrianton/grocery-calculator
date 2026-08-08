import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GroceryService, GroceryItem, GroceryItemInput } from '../../services/grocery.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonToggle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle
  ]
})
export class ItemFormPage implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() item?: GroceryItem;

  private formBuilder = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private groceryService = inject(GroceryService);

  itemForm: FormGroup;

  constructor() {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      unit: ['item', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      isFood: [true, Validators.required]
    });
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.item) {
      this.itemForm.patchValue({
        name: this.item.name,
        quantity: this.item.quantity,
        unit: this.item.unit,
        price: this.item.price,
        isFood: this.item.isFood
      });
    }
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      try {
        const itemPayload = this.itemForm.value as GroceryItemInput;

        if (this.mode === 'add') {
          await this.groceryService.addItem(itemPayload);
        } else if (this.item) {
          await this.groceryService.updateItem(this.item._id, itemPayload);
        }

        this.modalCtrl.dismiss({ success: true });
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
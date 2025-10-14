import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GroceryService } from '../../services/grocery.service';
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
  @Input() item: any;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private groceryService: GroceryService
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      unit: ['item', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      isFood: [true, Validators.required]
    });
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.item) {
      this.itemForm.patchValue(this.item);
    }
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      try {
        if (this.mode === 'add') {
          await this.groceryService.addItem(this.itemForm.value);
        } else {
          await this.groceryService.updateItem(this.item._id, this.itemForm.value);
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
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map, save } from 'ionicons/icons';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    FormsModule,
    IonSpinner,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  userName: string = '';
  savedLocations: any[] = [];
  
  private firestore: Firestore = inject(Firestore);

  constructor() {
    addIcons({ map, save }); // Añade los iconos que usaremos
    this.getCurrentLocation();
  }

  openGoogleMaps() {
    if (this.latitude && this.longitude) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    }
  }

  async saveLocation() {
    if (!this.userName || !this.latitude || !this.longitude) {
      console.error('Faltan datos para guardar');
      return;
    }

    try {
      const locationData = {
        name: this.userName,
        latitude: this.latitude,
        longitude: this.longitude,
        timestamp: new Date().toISOString(),
        mapUrl: `https://www.google.com/maps?q=${this.latitude},${this.longitude}`
      };

      const docRef = await addDoc(collection(this.firestore, 'locations'), locationData);
      console.log('Document written with ID: ', docRef.id);
      
      // Limpiar el campo del nombre después de guardar
      this.userName = '';
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocalización no está soportada en este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Ubicación obtenida: ', this.latitude, this.longitude);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
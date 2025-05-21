import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

const firebaseConfig = {

  apiKey: "AIzaSyApmLZbwwzkWHaMefftXLnoeCrtrqWwe38",

  authDomain: "demomovil-856fc.firebaseapp.com",

  projectId: "demomovil-856fc",

  storageBucket: "demomovil-856fc.firebasestorage.app",

  messagingSenderId: "125390567669",

  appId: "1:125390567669:web:67fb426273259005912dbc",

  measurementId: "G-MQPGFC6F7B"

};


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(IonicModule.forRoot({}))
  ]
}).catch(err => console.error(err));
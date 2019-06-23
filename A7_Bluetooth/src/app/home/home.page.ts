import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Band } from './band'
import { Peripheral } from 'noble';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  dispositivos = []
  brightness: number;
  // dispositivo: Peripheral
  dispositivo: any
  constructor(
    private ble: BLE,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone,
    //public blu : Bluetooth,        
  ) {

  }

  async scan() {

    this.dispositivos = []
    await this.ble.scan([], 5).subscribe(b => {
      this.dispositivos.push(b);
      // this.dispositivo = 
    })

  }

  async conect(disp) {
    await this.ble.connect('disp').subscribe(devic => {
      this.dispositivo = devic;
    })
  }


  conectado(disp) {

  }

  Send(disp) {
    let toast = this.toastCtrl.create(
      {
        duration: 2000,
        message: this.dispositivo,
        position: 'bottom'
      }).then(data => {
        data.present();
      })

  }
}

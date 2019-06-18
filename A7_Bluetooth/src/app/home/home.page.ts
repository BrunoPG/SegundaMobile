import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController, ToastController } from '@ionic/angular';
const LIGHTBULB_SERVICE = 'ff10';
const SWITCH_CHARACTERISTIC = 'ff11';
const DIMMER_CHARACTERISTIC = 'ff12';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dispositivos = []
  brightness: number;
  constructor(
    private ble: BLE,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone) {

  }

  scan() {
    this.dispositivos = []
    this.ble.scan([], 5).subscribe(b => {
      this.dispositivos.push(b);
    })
  }

  conect(disp) {

    this.ble.connect(disp.id).subscribe(() => {

      let toast = this.toastCtrl.create(
        {
          duration: 2000,
          message: "Conectado com sucesso com " + disp.name,
          position: 'bottom'
        }).then(data => {
          data.present();
        })

    })
  }


  conectado(disp) {

    this.ble.isConnected(disp.id).then(() => {
      let toast = this.toastCtrl.create(
        {
          duration: 2000,
          message: "Esta conectado com: " + disp.name,
          position: 'bottom'
        }).then(data => {
          data.present()
        })

    }).catch(() => {
      let toast = this.toastCtrl.create(
        {
          duration: 2000,
          message: "Bluetooth não esta conectado!",
          position: 'bottom'
        }).then(data => {
          data.present()
        })
    })

  }

  Send(disp) {
    let buffer = new ArrayBuffer(1);
    buffer[0] = 0xff
    this.ble.write(disp.id, LIGHTBULB_SERVICE, DIMMER_CHARACTERISTIC, buffer).then(ok => {
      let toast = this.toastCtrl.create(
        {
          duration: 2000,
          message: "Enviado com sucesso!" + ok,
          position: 'bottom'
        }).then(data => {
          data.present()
        })
    }).catch(erro => {
      let toast = this.toastCtrl.create(
        {
          duration: 2000,
          message: "Enviado com erro!" + erro,
          position: 'bottom'
        }).then(data => {
          data.present();
        })
    })

  }


  // stringToBytes(string):ArrayBuffer { 
  //   var array = new Uint8Array(string.length);
  //   for (var i = 0, l = string.length; i < l; i++) {
  //     array[i] = string.charCodeAt(i);
  //   }
  //   return array.buffer;
  // }

  // // ASCII only
  // bytesToString(buffer) {
  //   return String.fromCharCode.apply(null, new Uint8Array(buffer));
  // }
}


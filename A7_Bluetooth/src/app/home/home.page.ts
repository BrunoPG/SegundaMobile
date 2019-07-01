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
      console.log("constructor")
  }

  scan() {
    console.log("scan")
    this.dispositivos = []
    this.ble.scan([], 15).subscribe(b => {
      this.dispositivos.push(b)
    })
  }

  conect(disp) {
    console.log("connect")

    this.ble.connect(disp.id).subscribe(data => {
      console.log("sucesso")
      data.services.forEach(console.log)
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
    console.log("conectado")

    this.ble.isConnected(disp.id).then(() => {
      this.readFirstServiceIfPossible(disp);
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

  readFirstServiceIfPossible(disp) {
    this.readService(disp.id, disp.characteristics[0]);
  }

  readAllServices(disp) {
    disp.characteristics.forEach(cWrapper => this.readService(disp.id, cWrapper));
  }

  readService(dispId, characteristicWrapper) {
    if(characteristicWrapper.properties.includes("Read")) {
      let promise = this.ble.read(dispId, characteristicWrapper.service, characteristicWrapper.characteristic);
      promise.then(this.exhibitByteToConsole);
    }
  }

  exhibitByteToConsole(resp) {
    console.log(resp);
    console.log(this.bytesToString(resp));
  }

  stringToBytes(string) {
     var array = new Uint8Array(string.length);
     for (var i = 0, l = string.length; i < l; i++) {
         array[i] = string.charCodeAt(i);
      }
      return array.buffer;
  }

  bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  Send(disp) {
    console.log("send")
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

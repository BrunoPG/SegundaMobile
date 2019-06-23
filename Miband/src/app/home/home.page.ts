import { Component } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { BLE } from '@ionic-native/ble/ngx';
import { MiBand } from "miband"
import { ToastController } from '@ionic/angular';
const UUID_BASE = (x) => `0000${x}-0000-3512-2118-0009af100700`

const UUID_SERVICE_GENERIC_ACCESS = 0x1800
const UUID_SERVICE_GENERIC_ATTRIBUTE = 0x1801
const UUID_SERVICE_DEVICE_INFORMATION = 0x180a
const UUID_SERVICE_FIRMWARE = UUID_BASE('1530')
const UUID_SERVICE_ALERT_NOTIFICATION = 0x1811
const UUID_SERVICE_IMMEDIATE_ALERT = 0x1802
const UUID_SERVICE_HEART_RATE = 0x180d
const UUID_SERVICE_MIBAND_1 = 0xfee0
const UUID_SERVICE_MIBAND_2 = 0xfee1


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BluetoothCore]
})
export class HomePage {

  devide: BluetoothDevice;
  disp = [];
  device: any
  constructor(private toastCtrl: ToastController, public bluetooth: BluetoothCore, private ble: BLE, public miband: MiBand) { }

  async conectar() {

    await this.ble.startScan(['battery_service']).subscribe(dispositivos => {
      this.disp.push(dispositivos)
      console.log("ok")
    })   

  }

  disconnectDevice() {
    // this.bluetooth.disconnectDevice();
    console.log('bluettoth: ', this.bluetooth)
    //this.bluetooth.writeValue$(,'\x01\x00')   
    let toast = this.toastCtrl.create(
      {
        duration: 2000,
        message: " teste: ",
        position: 'bottom'
      }).then(data => {
        data.present();
      })
  }

  async value() {

    console.log('Getting Battery level...');
    this.device = await this.bluetooth
      .value$({
        service: 'battery_service',
        characteristic: 'battery_level'
      });
  }

}

import { Component } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DOCUMENT } from '@angular/common';

var subscription;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  x: any
  y: any
  z: any
  tam: number
  constructor(private gyroscope: Gyroscope, private document: Document) {

  }

  getAcceleration() {

  }
  startAceleration() {

    let options: GyroscopeOptions = {
      frequency: 10
    }
    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        this.x = orientation.x
        this.y = orientation.y
        this.z = orientation.z
        this.tam = orientation.x * 10000


      })
      .catch()
  }

  watch() {
    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
        this.x = orientation.x
        this.y = orientation.y
        this.z = orientation.z
      });
  }
}

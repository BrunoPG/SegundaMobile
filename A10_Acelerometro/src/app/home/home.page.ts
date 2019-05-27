import { Component } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';

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
  constructor(private gyroscope: Gyroscope) {

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

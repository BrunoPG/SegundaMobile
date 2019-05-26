import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

var subscription;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private deviceMotion: DeviceMotion) {
    console.log('batata');
    subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
    }); 
   }
  
  getAcceleration(){
  this.deviceMotion.getCurrentAcceleration().then(
    (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
    (error: any) => console.log(error)
  );}
  startAceleration(){
    subscription.subscribe();}
  
  stopAceleration(){
  subscription.unsubscribe();}

}

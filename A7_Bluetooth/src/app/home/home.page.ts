import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import {NavController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
/*  constructor(private bluetoothSerial: BluetoothSerial) { 
    this.bluetoothSerial.enable();
    bluetoothSerial.connect('78:02:F8:09:9E:84');
    bluetoothSerial.write("hello, world");

   
  }
  enableBluetooth() {
    
}

}*/
unpairedDevices: any;
unpairedDevicesError:any;
pairedDevices: any;
gettingDevices: Boolean;

btNearBy: boolean;

constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController, public navCtrl: NavController)
{
bluetoothSerial.enable();
this.unpairedDevices = null;
this.startScanning();
}

startScanning()
{
this.bluetoothSerial.enable();
this.pairedDevices = null;
this.unpairedDevices = null;
this.unpairedDevicesError=null;
this.gettingDevices = true;

this.bluetoothSerial.discoverUnpaired().then((success) => { 
          
          var arrayWithDuplicates = success;

          var uniqueArray =this.removeDuplicates(arrayWithDuplicates,"class");

          console.log("uniqueArray is: " + JSON.stringify(uniqueArray));

          console.log(uniqueArray);

          this.unpairedDevices=uniqueArray;
          this.gettingDevices = false;
},    
(err) => {
  console.log(err);
  var errorvalue=['Problem while discovering'];
  this.unpairedDevicesError=errorvalue;
})

this.bluetoothSerial.list().then((success) => {
  this.pairedDevices = success;
},
(err) => {
 console.log(err);
})
}

removeDuplicates(originalArray, prop)
{
var newArray = [];
var lookupObject = {};

 for(var i in originalArray) 
 {
    lookupObject[originalArray[i][prop]] = originalArray[i];
 }

 for(i in lookupObject) 
 {
     newArray.push(lookupObject[i]);
 }
  return newArray;
}

//success = (data) => console.log('success data : ',data);

//fail = (error) => console.log('Failure Data : ',error);

success(data)
{
console.log('success data : '+ JSON.stringify(data));
this.bluetoothSerial.available().then(data =>{

    console.log("Available " + JSON.stringify(data));

    this.bluetoothSerial.read().then(data =>{

      console.log("Read " + JSON.stringify(data));

    });
  });
}

fail(error)
{
console.log('Failure Data : '+ JSON.stringify(error));
}

selectDevice(address: any)
{
let alert = this.alertCtrl.create({

message: 'Do you want to connect with?',
buttons:
[
{
text: 'Cancel',
role: 'cancel',
handler: () => {
console.log('Cancel clicked');
}
},
{
text: 'Connect',
handler: () =>
{
this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
}
}
]
});


}

disconnect() {
let alert = this.alertCtrl.create({
message: 'Do you want to Disconnect?',
buttons: [
{
text: 'Cancel',
role: 'cancel',
handler: () => {
console.log('Cancel clicked');
}
},
{
text: 'Disconnect',
handler: () => {
this.bluetoothSerial.disconnect();
}
}
]
});
}

searchNearBy()
{

let chkbox=this.btNearBy;
if(chkbox != true)
{ 
  this.gettingDevices=false;
}
else
{      
  this.startScanning();
}
}

}


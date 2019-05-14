import { Component } from '@angular/core';
import { Geolocation} from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
 
  constructor(private geolocation : Geolocation) {
    console.log('paodebatata');
    //this.getUserPosition();
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      console.log(resp)
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
   });
  }

  
}

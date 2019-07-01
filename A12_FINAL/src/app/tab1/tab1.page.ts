import { Component } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private health: Health) {
    this.health = health
  }

  startHealth() {
    this.health.isAvailable()
      .then((available:boolean) => {
        console.log(available);
        this.health.requestAuthorization([
          'distance', 'nutrition',  //read and write permissions
          {
            read: ['steps'],       //read only permission
            write: ['height', 'weight']  //write only permission
          }
        ])
        .then(res => console.log(res))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

}

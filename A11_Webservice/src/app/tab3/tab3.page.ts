import { Component } from '@angular/core';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {



  constructor(private push: Push, public alertCtrl: AlertController) {
    this.pushsetup();
  }

  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);
    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        /*let youralert = this.alertCtrl.create({
          title: notification.label,
          message: notification.message
        });
        youralert.present();*/
      }
    });
  }
}

import { Component } from '@angular/core';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private push: Push){
    this.pushsetup();
  }

  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

  }
}

import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private notificacao: LocalNotifications) { }


  notificar() {

    this.notificacao.schedule({
      title: "Notificação ionic",
      text: 'Single ILocalNotification',
      foreground: true
    });

  }


  notifcaropcao() {
    this.notificacao.schedule({
      title: 'Nova aula',
      text: 'vai par aula de mobile segunda',    
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    })

  }

}

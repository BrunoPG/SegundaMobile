import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  log: string
  latitude: string
  link = ''
  map: any;

  constructor(private geolocation: Geolocation) {
     
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.longitude, resp.coords.latitude)      
      //this.link = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1388889055406!2d"+resp.coords.latitude+"!3d"+resp.coords.longitude+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df1f28e3fb23c7%3A0x9520facb7ba77e49!2sFURB+-+C%C3%A2mpus+3!5e0!3m2!1spt-BR!2sbr!4v1558393061694!5m2!1spt-BR!2sbr"
      this.posicionar(resp.coords.longitude,resp.coords.latitude)
      //console.log(this.link)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {


    });
  }

  posicionar(lat, log: Number) {
    const position = new google.maps.LatLng(log,lat);

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,

      //Titulo
      title: 'Minha posição',

      //Animção
      animation: google.maps.Animation.DROP, // BOUNCE

      //Icone
      //icon: 'assets/imgs/pessoa.png'
    });
  }


}

import { Component } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private mediaCapture: MediaCapture) { }
  batata(){
  let options: CaptureImageOptions = { limit: 3 }
  this.mediaCapture.captureImage(options)
  .then(
    (data: MediaFile[]) => console.log(data),
    (err: CaptureError) => console.error(err)
  );}
}

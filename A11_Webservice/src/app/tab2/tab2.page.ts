import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public userlista: any[];

  public nome: string = '';

  public email: string = '';

  constructor(
     private http: HttpClient
  ) {
      this.getAllUser().then((data: any) => {
        this.userlista = data.users;
        console.log(this.userlista);
      });

  }

  getAllUser(){
    return new Promise(resolve=>{
      this.http.get('http://localhost:3456/user/all',{})
      .subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    })
  }

  criar(){
    return new Promise(resolve=>{
      this.http.post('http://localhost:3456/user/save',{nome:this.nome, email:this.email},{})
      .subscribe(data => {
        console.log('deu boa')
        resolve(data);
      }, error => {
        console.log(error);
      });
    })
  }
}

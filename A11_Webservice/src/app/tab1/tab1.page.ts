import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public eventolista: any[];

  public titulo: string = '';

  public descricao: string = '';

  constructor(
     private http: HttpClient
  ) {
      this.getAllEvento().then((data: any) => {
        this.eventolista = data.eventos;
        console.log(this.eventolista);
      });

  }

  getAllEvento(){
    return new Promise(resolve=>{
      this.http.get('http://localhost:3456/evento/all',{})
      .subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    })
  }

  criar(){
    return new Promise(resolve=>{
      this.http.post('http://localhost:3456/evento',{titulo:this.titulo, descricao:this.descricao},{})
      .subscribe(data => {
        console.log('deu boa')
        resolve(data);
      }, error => {
        console.log(error);
      });
    })
  }

}

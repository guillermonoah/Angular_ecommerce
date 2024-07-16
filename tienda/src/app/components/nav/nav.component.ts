import { Component,OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { response } from 'express';
import { io } from "socket.io-client";
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  public token:any;
  public id:any;
  public user : any = undefined;
  public user_lc : any = undefined;
  public config_global: any ={};
  public op_cart = false;
  public carrito_Arr: Array<any> = [];
  public url:any;
  public subtotal:any = 0;
  public socket = io('http://localhost:4201');

  constructor(
    private _clienteService:ClienteService,
    private _router:Router
  ){
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id'); 
    this.url= GLOBAL.url;

    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        this.config_global = response.data;
      }
    )

    console.log(this.user_lc);

    if (this.token) {
      this._clienteService.obtener_cliente_guest( this.id,this.token).subscribe(
        response=>{
          this.user= response.data;
          localStorage.setItem('user_data',JSON.stringify(this.user));            
          if(localStorage.getItem('user_data')){
            this.user_lc = JSON.parse(localStorage.getItem('user_data')!);

            this.obtener_carrito();
          }else{
            this.user_lc = undefined;
          }
        },error=>{                 
          this.user= undefined;
        }
      );
    }
  }

  obtener_carrito(){
    this._clienteService.obtener_carrito_cliente(this.user_lc._id,this.token).subscribe(
      response=>{
        this.carrito_Arr = response.data;   
        this.calcular_carrito();             
      }
    );
  }


  ngOnInit(): void {
    this.socket.on('new-carrito',(data:any) =>{
      console.log(data);
      this.obtener_carrito();
    });
  }

  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/']);
  }

  op_modalcart(){
    if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      $('#cart').removeClass('show');

    }
  }

  calcular_carrito(){
    this.subtotal =0;
    this.carrito_Arr.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    })
  }

  eliminar_item(id:any){
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-SUCCESS',
          position: 'topRight',
          message: 'Se elimino el producto correctamente'
        });

        this.socket.emit('delete-carrito',{data:response.data});
        console.log(response);
        
      }
    );
  }

}

import { Component,OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { response } from 'express';
declare var $:any;

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

            this._clienteService.obtener_carrito_cliente(this.user_lc._id,this.token).subscribe(
              response=>{
                this.carrito_Arr = response.data;   
                this.calcular_carrito();             
              }
            );
          }else{
            this.user_lc = undefined;
          }
        },error=>{                 
          this.user= undefined;
        }
      );
    }
  }

  ngOnInit(): void {
    
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
    this.carrito_Arr.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    })
  }

  eliminar_item(id:any){
    this._clienteService.eliminar_carrito_cliente(id,this.token).subscribe(
      response=>{
        console.log(response);
        
      }
    );
  }

}

import { Component,OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  public idcliente: any;
  public token:any;

  public carrito_Arr: Array<any> = [];
  public url:any;
  public subtotal:any = 0;
  public total_pagar:any = 0;
 
 
  constructor(
    private _clienteService:ClienteService,
  ){
    this.idcliente = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.url= GLOBAL.url;

    this._clienteService.obtener_carrito_cliente(this.idcliente, this.token).subscribe(
      response=>{
        this.carrito_Arr = response.data;   
        this.calcular_carrito();             
      }
    );
  }
  
  ngOnInit(): void {
    
  }

  calcular_carrito(){
    this.carrito_Arr.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.producto.precio);
    })
    this.total_pagar=this.subtotal;
  }

}

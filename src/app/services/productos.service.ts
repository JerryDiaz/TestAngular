import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  registro = false;
  cargando = true;
  productos: Producto[] = [];
  ProductosFiltrado: Producto[] = [];
  constructor(private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto(){

    return new Promise( ( resolve, reject ) =>{

      this.http.get('https://angular-html-8ab02.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        } );

    } );

        
  }

  getProducto( id: string ){
    return this.http.get(`https://angular-html-8ab02.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string ){

    if( this.productos.length === 0 ){
      //Cargar productos
      this.cargarProducto().then( ()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //Aplicar filtro
      this.filtrarProductos(termino);
    }  

  }

  insert(item) {
    return this.http.post('https://angular-html-8ab02.firebaseio.com/productos_idx', { data: [item] });
  }

  private filtrarProductos( termino: string ){
  
    this.ProductosFiltrado = [];
    termino = termino.toLocaleLowerCase();


    this.productos.forEach( prod => {
      
      const tituloLower = prod.titulo.toLocaleLowerCase();
      
      if(prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.ProductosFiltrado.push(prod);
      }
    });

 
  }

}

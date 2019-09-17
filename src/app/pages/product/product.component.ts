import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: Producto

  constructor(public productService: ProductosService) { }

  ngOnInit() {
  }

  save_product() {
    if (this.producto.categoria == '') { return; }

   
  }

}

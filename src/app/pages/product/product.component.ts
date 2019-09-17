import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: Producto

  public model = {
    categoria: '1',
    cod: '2',
    titulo: '3',
    url: '4'
  };

  constructor(public productService: ProductosService) { }

  ngOnInit() {
  }

  save_product() {
    if (this.model.categoria == '') { return; }
    var json = {
      "categoria": this.model.categoria,
      "cod": this.model.cod,
      "titulo": this.model.titulo,
      "url": this.model.url
    }
    console.log(json);
    this.productService.insert(json).subscribe(res => {
      this.cleanModel();
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(err.message);
        } else {
          console.log(err.message);
        }
      });

  }

  cleanModel() {
    this.model.categoria = '';
    this.model.cod = '';
    this.model.titulo = '';
    this.model.url = '';

  }
}

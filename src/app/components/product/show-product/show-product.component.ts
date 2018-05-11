import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() product_id: number;
  public product: any;

  constructor(private ps: ProductService) { }

  async ngOnInit() {
    this.product = await this.ps.getCompleteProduct(this.product_id);
  }

}

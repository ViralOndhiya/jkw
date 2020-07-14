import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product/product.service';
import { CommonService } from '../common/common.service';
import { ShareButtons } from '@ngx-share/core';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  providers: [ProductService]
   
   
})
export class ProductDetailComponent implements OnInit {
  selectedImages: any[];
  constructor(public share: ShareButtons, private productService: ProductService,
    private commonService: CommonService) {
    

}
@Input() selectedProduct;
  ngOnInit(): void {
    console.log("in open dialog box:", this.selectedProduct)
  //this.selectedImages=this.selectedProduct?.proImages
  }

}

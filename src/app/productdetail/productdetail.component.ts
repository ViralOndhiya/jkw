import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './productdetail.service';
import { ShareButtons } from '@ngx-share/core';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  providers: [ProductDetailService],
  encapsulation: ViewEncapsulation.None
})
export class ProductdetailComponent implements OnInit {
  productName: any;
  productList: any[] = []
  selectedProduct: any;
    selectedImages: any[];
    selectedSizes: any[];
    selectchangeImage: any;
    selectedchangeProduct: any;
  constructor(private router: Router, 
    private _activatedRoute: ActivatedRoute, 
    private productDetailService: ProductDetailService,
    public share: ShareButtons,) {
    this._activatedRoute.params.subscribe((params: any) => {
      
      
       this.productName = params['productName']; 
       //console.log('this.productName',this.productName);
       if (this.productName) this.getProductDetailbyProName();

   })

   }

  ngOnInit(): void {
  }
getProductDetailbyProName(){
  this.productDetailService.productDetailbyProName(this.productName).subscribe((data: any) => {
    this.productList = []

   data.map(e => {
       var dt: any = e.payload.doc.data();
       this.productList.push({
           id: e.payload.doc.id, 
           product_name: dt.product_name, 
           price: dt.price,
           material: dt.material, 
           ProURL: dt.ProURL, 
           ProPath: dt.ProPath,
          //  proImages: dt.proImages,
          //  gender: dt.gender.id,
          //  scategoryID: dt.name.id,
           name: dt.name,
           size: dt.size
       })
  
   });
 

   console.log(this.productList)
   
})


}
}

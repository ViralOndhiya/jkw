import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from './product.service';
import { ShareButtons } from '@ngx-share/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductAdminService } from '../admin/product-admin/product-admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
//import { NotifyService } from '../common/notify.service';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    providers: [ProductService, ProductAdminService],
    styles: [`      
  .filter-container {
      text-align: center;
  }
  .car-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2em;
      border-bottom: 1px solid #d9dad9;
  }
  .car-details > div {
      display: flex;
      align-items: center;
  }
  .car-details > div img {
      margin-right: 14px;
  }
  .car-detail {
      padding: 0 1em 1em 1em;
      border-bottom: 1px solid #d9dad9;
      margin: 1em;
  }
  .ui-panel-content {
      padding: 1em;
  }
  .dark-theme :host ::ng-deep .car-details,
  .dark-theme :host ::ng-deep .car-detail {
      border-bottom: 1px solid #191919;
  }
  
  @media (max-width: 1024px) {
      .car-details img {
           width: 75px;
      }
      .filter-container {
          text-align: left;
      }
  }

  /* Column Priorities */
  @media only all {
      th.ui-p-6,
      td.ui-p-6,
      th.ui-p-5,
      td.ui-p-5,
      th.ui-p-4,
      td.ui-p-4,
      th.ui-p-3,
      td.ui-p-3,
      th.ui-p-2,
      td.ui-p-2,
      th.ui-p-1,
      td.ui-p-1 {
          display: none;
      }
  }
  
  /* Show priority 1 at 320px (20em x 16px) */
  @media screen and (min-width: 20em) {
      th.ui-p-1,
      td.ui-p-1 {
          display: table-cell;
      }
  }
  
  /* Show priority 2 at 480px (30em x 16px) */
  @media screen and (min-width: 30em) {
      th.ui-p-2,
      td.ui-p-2 {
          display: table-cell;
      }
  }
  
  /* Show priority 3 at 640px (40em x 16px) */
  @media screen and (min-width: 40em) {
      th.ui-p-3,
      td.ui-p-3 {
          display: table-cell;
      }
  }
  
  /* Show priority 4 at 800px (50em x 16px) */
  @media screen and (min-width: 50em) {
      th.ui-p-4,
      td.ui-p-4 {
          display: table-cell;
      }
  }
  
  /* Show priority 5 at 960px (60em x 16px) */
  @media screen and (min-width: 60em) {
      th.ui-p-5,
      td.ui-p-5 {
          display: table-cell;
      }
  }
  
  /* Show priority 6 at 1,120px (70em x 16px) */
  @media screen and (min-width: 70em) {
      th.ui-p-6,
      td.ui-p-6 {
          display: table-cell;
      }
  }

  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-details > .p-grid {
    border: 1px solid #b3c2ca;
    border-radius: 3px;
    margin: 0.3em;
    text-align: center;
    padding: 2em 0 2.25em 0;
}
.carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-title {
    font-weight: 700;
    font-size: 20px;
    margin-top: 24px;
}
.carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-subtitle {
    margin: 0.25em 0 2em 0;
}
.carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button {
    margin-left: 0.5em;
}
.carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button:first-child {
    margin-left: 0;
}
.carousel-demo .ui-carousel.custom-carousel .ui-carousel-dot-icon {
    width: 16px !important;
    height: 16px !important;
    border-radius: 50%;
}
.carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-start .car-details > .p-grid {
    margin-left: 0.6em;
}
.carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-end .car-details > .p-grid {
    margin-right: 0.6em;
}


`],
    encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

    cols: any[];
    displayDialog: boolean = false;
    displayzoom: boolean = false;
    genderId: any;
   
    productId: any;
    //selectProduct: any;
    productList: any[] = []
    productImgList: any[] = []
    selectedProduct: any;
    selectedImages: any[];
    selectedSizes: any[];
    selectchangeImage: any;
    selectedchangeProduct: any;
    userLikedProducts: any[] = []
    currentUser;
    name: ""
    categories: any[] = [];
    sizes: any[] = [];
    displayZoom: boolean = false;
    productListbyCategory: any[] = []
    categoryName: any;

    subscription: Subscription;
    responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
    constructor(private productService: ProductService, public share: ShareButtons,
        private _activatedRoute1: ActivatedRoute,private _activatedRoute: ActivatedRoute, private commonService: CommonService,
        private router: Router,
        private productAdminService: ProductAdminService,
        private firestore: AngularFirestore,
        private storage: AngularFireStorage,
        private db: AngularFirestore) {
        this.productAdminService.getCategories().subscribe(data => {
            this.categories = []
            data.map(e => {
                var dt: any = e.payload.doc.data()
                this.categories.push({ cid: e.payload.doc.id, name: dt.name })
            });

            //  console.log("list of category:", this.categories)
        }),

            this.productAdminService.getsizes().subscribe(data => {
                this.sizes = []
                data.map(e => {
                    var dt: any = e.payload.doc.data()
                    this.sizes.push({ sid: e.payload.doc.id, size: dt.size })
                });

                //   console.log("list of size:", this.sizes)
            }),

            this._activatedRoute.params.subscribe((params: any) => {
              
                this.genderId = params['genderName']
                this.getProductListByGender()

                this.categoryName = params['categoryName']
                this.getProductListByCategory()
          
            }),
           

            this.responsiveOptions = [
                {
                    breakpoint: '1024px',
                    numVisible: 3,
                    numScroll: 3
                },
                {
                    breakpoint: '768px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '560px',
                    numVisible: 2,
                    numScroll: 2
                }
            ];
    }

    ngOnInit(): void {

    }
    getProductListByGender() {

        this.productService.getAllProductByGender(this.genderId).subscribe((data: any) => {
            this.productList = []
          //  this.selectProduct

            data.map(e => {
                var dt: any = e.payload.doc.data();

                this.productList.push({
                    id: e.payload.doc.id, product_name: dt.product_name, price: dt.price,
                    material: dt.material, ProURL: dt.ProURL, ProPath: dt.ProPath,
                    proImages: dt.proImages,
                    gender: dt.gender.id,
                    categoryID: dt.name.id,                   
                    name: dt.name,
                    size: dt.size
                })
            });
        })
    }

    getProductListByCategory() {

        this.productService.getProductByCategory(this.categoryName).subscribe((data: any) => {
            this.productListbyCategory = []
         
      
            data.map(e => {
                var dt: any = e.payload.doc.data();
      
                this.productListbyCategory.push({
                    id: e.payload.doc.id, product_name: dt.product_name, price: dt.price,
                    material: dt.material, ProURL: dt.ProURL, ProPath: dt.ProPath,
                    proImages: dt.proImages,
                    gender: dt.gender.id,
                    categoryID: dt.name.id,              
                    name: dt.name,
                    size: dt.size
                })
            });
            console.log(this.productListbyCategory);
        })
      }
      
    selectProduct(event, product) {
        this.selectedProduct = ''

        this.selectedProduct = product
        this.selectedImages = this.selectedProduct?.ProURL
        this.selectedSizes = this.selectedProduct?.size
        this.displayDialog = true;
    }

    onMouseOver(event, car) {
        this.selectedchangeProduct = car
    }

    isShow = false;

    toggleDisplay() {
        this.isShow = !this.isShow;
        // console.log('this.isShow',this.isShow)
    }


}






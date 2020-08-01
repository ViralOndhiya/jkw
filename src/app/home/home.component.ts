import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderAdminService } from '../admin/slider-admin/slider-admin.service';
import { ShareButtons } from '@ngx-share/core';
import { ProductAdminService } from '../admin/product-admin/product-admin.service';
import { ProductService } from '../product/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService,SliderAdminService],
  styles: [`
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
          .p-nogutter > .p-col, .p-nogutter > [class*=p-col-] {
            padding: 0;
            width: 100%;
          }
      `]
})
export class HomeComponent implements OnInit {
  sliders: any[]; // // FOR SLIDER IMAGE 20200312
  responsiveOptions; // // FOR SLIDER IMAGE 20200312
  genders: any[] = [];
  productList: any[] = []
 
  categories: any[] = [];

  constructor( private router: Router, private sliderService: SliderAdminService,
    public share: ShareButtons, private productAdminService: ProductAdminService,
    private productService: ProductService,
    private _activatedRoute: ActivatedRoute) { 

        this.productAdminService.getCategories().subscribe(data => {
            this.categories = []
            data.map(e => {
                var dt: any = e.payload.doc.data()
                this.categories.push({ cid: e.payload.doc.id, name: dt.name })
            });

          //  console.log("list of category:", this.categories)
        }),
    
        this.productAdminService.getGenders().subscribe(data => {
            this.genders = []
            data.map(e => {
              var dt: any = e.payload.doc.data()
              this.genders.push({ id: e.payload.doc.id, gender: dt.gender })
            });
      
             // console.log("list of genders:", this.genders)
          }),

       

     this.responsiveOptions = [
    
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      }, 
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
 
  }

  ngOnInit(): void {
    this.sliderService.getAllSliders().subscribe(data => {
      this.sliders = []
      data.map(e => {
          var dt: any = e.payload.doc.data()
          if(dt.mainImage)
            this.sliders.push({
                id: e.payload.doc.id, mainImage: dt.mainImage, type: this.checkType(dt.mainImage) ? 'image' : 'video'
            })
      });
    
  })  
  this.getAllProducts()
  }

  getAllProducts() {
    this.productAdminService.getProducts().subscribe(data => {
      this.productList = []
      data.map(e => {
      
        var dt: any = e.payload.doc.data()
        this.productList.push({       
          // name: this.categories.find(e => e.id == dt.name.id) ?
          // this.categories.find(e => e.id == dt.name.id).name : '',
          gender : this.genders.find(e => e.gender == dt.gender) ?
          this.genders.find(e => e.gender == dt.gender).gender : '' ,

          name: this.categories.find(e => e.name == dt.name) ?
          this.categories.find(e => e.name == dt.name).name : '' ,
          
         
          
        })
        //console.log("in product.....list:", this.productList)
      });
    })
  }



  public executeSelectedChange = (event) => {
    console.log(event);
  }

  


private checkType(url){
  var arr = [ "jpeg", "jpg", "gif", "png", "tiff", "bmp" ];
  // console.log("ig::;...", url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?')))
  return arr.indexOf(url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?'))) > -1
}

openProductByCategory(itm1) {  
  this.router.navigate(['app/', itm1.name]);  
}

}

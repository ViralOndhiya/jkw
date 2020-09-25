import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, } from '@angular/router';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './productdetail.service';
import { ShareButtons } from '@ngx-share/core';
// import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
  public href: string = "";
  route: string;
  urlcopy: string = ""
  // url: any;
  constructor(private router: Router, private location: Location,
    private _activatedRoute: ActivatedRoute,
    private productDetailService: ProductDetailService,
    public share: ShareButtons, private sanitizer: DomSanitizer) {
    this._activatedRoute.params.subscribe((params: any) => {


      this.productName = params['productName'];
      //console.log('this.productName',this.productName);
      if (this.productName) this.getProductDetailbyProName();

    })


    // router.events.subscribe(val => {
    //   if (location.path() != "") {
    //     this.route = location.path();
    //   } else {
    //     this.route = "Home";
    //   }
    //   console.log('hiii',this.route);
    // });

  }

  public whatsAppUrl: SafeUrl;
  ngOnInit(): void {
    //this.href = this.router.url;
    //console.log('href',this.href)
    https://wa.me/917048484866/?text=hi ...{{urlcopy}}
    this.getURL();
  }
  getURL() {
    var url = window.location.href;
    this.urlcopy = url;
    // this.router.url;
    //this.urlcopy=this.router.url;
    // console.log(window.location.href);
    // console.log('url...',this.urlcopy);
    // this.whatsAppUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.urlcopy}`)
    //let localUrl = `http://localhost:4200/productdetail;productName=Baby%20Hug%20with%20Steel%20Body`;

    //this.whatsAppUrl = 'https://wa.me/917048484866/?text=hello .. '+localUrl
    //console.log('this.whatsAppUrl;', this.whatsAppUrl)
  }
  getProductDetailbyProName() {
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
          size: dt.size,
          discount: dt.discount
        })
        console.log('disocunt', dt.discount);
        var x = document.getElementById("myDIV");
        if (dt.discount === "") {
          x.style.display = "block";
        } else {
          x.style.display = "block";
        }
      });
      //console.log(this.productList)
      //console.log('this.selectedImages', this.selectedImages)

    })
  }
  //  myFunction() {
  //   var x = document.getElementById("myDIV");
  //   if (dt.discount === "") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "block";
  //   }
  //}
  // selectProduct(event, product) {
  //   this.selectedProduct = ''

  //   this.selectedProduct = product
  //   this.selectedImages = this.selectedProduct?.ProURL


  // }
}

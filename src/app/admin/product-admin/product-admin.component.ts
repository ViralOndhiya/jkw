import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { ProductAdminService } from './product-admin.service';
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
  providers: [ProductAdminService]
})
export class ProductAdminComponent implements OnInit {

  products: any[] = []
  productList: any[] = []
  cols: any[];
  selectProduct: any;
  product_name = ""
  price = ""
  material = ""
  selectedProduct: any;

  constructor(private productAdminService: ProductAdminService,
    private firestore: AngularFirestore,  
    private storage: AngularFireStorage) { 
      this.productAdminService.getProducts().subscribe(data => {
        this.products = []
        data.map(e => {
          var dt: any = e.payload.doc.data()
          this.products.push({ id: e.payload.doc.id, product_name: dt.product_name, price: dt.price, material: dt.material })
        });
        
        console.log("list of Products:", this.products)
      })
     }

  ngOnInit(): void {

    this.cols = [
      { field: 'product_name', header: 'Product Name' },     
      { field: 'price', header: 'Price', columnWidth: '100px' },
      { field: 'material', header: 'Material' },
     
  ];
  }

  addNew() {   
    this.selectProduct = "" 
    this.product_name = ""
    this.price = ""
    this.material = ""    
}

deleteCategory(data) {
  this.selectProduct = data
  if (data.mainImage)
      //this.deleteMainImage()
  this.productAdminService.deleteProduct(data.id);
 
}

saveCategory() {
  var product = { product_name: this.product_name, price: this.price, material: this.material }
  var id = this.productAdminService.createProduct(product)
  console.log("saved obj:", id)

  this.addNew()
}

editCategory(data) {
  this.productList = []
  this.selectProduct = data
  this.product_name = data.name
  this.price = data.description
  this.material = data.material
 
  this.productAdminService.getAllProductByid(data.id).subscribe(event => {
      // console.log("get ref products:", data)
      event.map(e => {
        var dt: any = e.payload.doc.data();
        this.productList.push({
          id: e.payload.doc.id, product_name: dt.product_name, price: dt.price, material: dt.material          
        })
      });
      this.productList = [...this.productList]
      console.log("Product list based on pro id:", this.productList)
      this.selectedProduct = data.product ? this.productList.find(e => e.id === data.product.id) : ''
    })
}


}

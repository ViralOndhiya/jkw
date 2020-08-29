import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { ProductAdminService } from './product-admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';




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
  product_name = "";
  gender = "";
  name="";
  price = "";
  material = "";
  selectedProduct: any;
  @ViewChild('minImageInput', { static: false })
  mainImagevariable: ElementRef;
  isHovering: boolean;
  files: File[] = [];
  genders: any[] = [];
  categories: any[] = [];
  sizes: any[] = [];
  selectedSizes: any[] =[];
  checked: boolean = false;
  selectedGender: any;
  selectedCategory: any;

  title = 'push-notification';
  message;

  @Input() file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private productAdminService: ProductAdminService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFirestore) {
    this.productAdminService.getGenders().subscribe(data => {
      this.genders = []
      data.map(e => {
        var dt: any = e.payload.doc.data()
        this.genders.push({ id: e.payload.doc.id, gender: dt.gender })
      });

     // console.log("list of genders:", this.genders)
    }),


    this.productAdminService.getCategories().subscribe(data => {
      this.categories = []
      data.map(e => {
        var dt: any = e.payload.doc.data()
        this.categories.push({ id: e.payload.doc.id, name: dt.name })
      });

     // console.log("list of category:", this.categories)
    }),

    this.productAdminService.getsizes().subscribe(data => {
      this.sizes = []
      data.map(e => {
        var dt: any = e.payload.doc.data()
        this.sizes.push({ id: e.payload.doc.id, size: dt.size })
      });

      //console.log("list of size:", this.sizes)
    })
  }

  ngOnInit(): void {

    this.cols = [
      { field: 'gender', header: 'Gender' },
      { field: 'name', header: 'Category' },
      { field: 'product_name', header: 'Product Name' },
      { field: 'price', header: 'Price', columnWidth: '100px' },
      { field: 'material', header: 'Material' },
      { field: 'size', header: 'Size' },
    ];

    this.getAllProducts();

  

  }

  getAllProducts() {
    this.productAdminService.getProducts().subscribe(data => {
      this.productList = []
      data.map(e => {
      //  console.log("in map data:", e.payload.doc.data())
        var dt: any = e.payload.doc.data()
        this.productList.push({
          id: e.payload.doc.id, 
          product_name: dt.product_name, 
          price: dt.price,
          material: dt.material,
          genderId: dt.gender.id,
          // gender: this.genders.find(e => e.id == dt.gender.id) ?
          // this.genders.find(e => e.id == dt.gender.id).gender : '',
          gender: dt.gender,
            
          categoryID: dt.name.id,
          // name: this.categories.find(e => e.id == dt.name.id) ?
          // this.categories.find(e => e.id == dt.name.id).name : '',
          name: dt.name,
           size: dt.size, 
            // sizeId: dt.size.id,
            // size: this.sizes.find(e => e.id == dt.size.id) ?
            // this.sizes.find(e => e.id == dt.size.id).size : '',

         
        })
       // console.log("in product.....list:", this.productList)
      });
    })
  }

  addNew() {
    this.selectProduct = ""
    this.gender = ""
    this.selectedCategory = ""
    this.selectedSizes = []
    this.product_name = ""
    this.price = ""
    this.material = ""
  }

  deleteProduct(data) {
    this.selectProduct = data
    //console.log("delete data :", data);
    this.productAdminService.deleteProduct(data.id);

  }

  saveProduct() {
    var product = {
      product_name: this.product_name,
      price: this.price, 
      material: this.material, 
      genderId: this.selectedGender.gender,
      categoryID: this.selectedCategory.name,
      size: this.selectedSizes
    }
    //console.log('save...product', product);
    var id = this.productAdminService.createProduct(product)
   // console.log("saved obj:", id)
   //this.productAdminService.setsize(product) 
   //this.productAdminService.setsize(product)
    this.addNew()
  }

  editProduct(data) {
    this.selectedProduct = data
    this.selectedGender = this.genders.find(e => e.id === data.genderId)
    this.selectedCategory = this.categories.find(e => e.id === data.categoryID)
   // this.selectedSizes = this.sizes.find(e => e.id === data.sizeId)
    this.product_name = data.product_name
    this.price = data.price
    this.material = data.material
  //  console.log('update mode this.selectedProduct.id', this.selectedProduct.id);
    localStorage.setItem("STORE_IMG_NAME", this.selectedProduct.id)

  }

  updateProduct() {

    this.productAdminService.updateProduct(this.selectedProduct.id, {
      product_name: this.product_name,
      price: this.price,
      material: this.material,
      genderId: this.selectedGender.id,
      categoryID:this.selectedCategory.id, 
    //  sizeId: this.selectedSizes,
    })
    this.addNew()
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }

  }
}

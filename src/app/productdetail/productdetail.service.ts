import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable()
export class ProductDetailService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) {
    }   

   
    productDetailbyProName(productName) {     
      return this.firestore.collection('product_detail', ref => ref.where('product_name', '==', productName)).snapshotChanges()
    }

  
    

    
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) {
    }   

    getAllProductByGender(genderName) {        
      return this.firestore.collection('product_detail', ref => ref.where('gender', '==', genderName)).snapshotChanges()
    }
    getProductByCategory(categoryName) {     
      return this.firestore.collection('product_detail', ref => ref.where('name', '==', categoryName)).snapshotChanges()
    }

  
    

    
}
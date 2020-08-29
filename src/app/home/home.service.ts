import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


@Injectable()
export class HomeService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) {
    }   

    getAllProduct() {        
      return this.firestore.collection('product_detail').snapshotChanges()
    }
  
    

  
    

    
}
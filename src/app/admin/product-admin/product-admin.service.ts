import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class ProductAdminService {
    constructor(private http: HttpClient, private firestore: AngularFirestore,
        private storage: AngularFireStorage) { 
    }

    createProduct(product: any) {
        return this.firestore.collection('product_detail').add(product).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        });
      }
    
      updateCategory(id, product: any) {
        // delete category.id;
        this.firestore.doc('product_detail/' + id).update(product);
      }

      deleteMainImage(url, proId) {
        console.log("in delete product do:", url, proId)
        this.storage.storage.refFromURL(url).delete();
        //this.updateCategoryMainImagePath(catId)
      }
    
      updateCategoryMainImagePath(proId){
        this.firestore.collection("categories").doc(proId).update({
          mainImage: "",
          pathMainImage: ""
        })
      }

  
      
      deleteProduct(proId: string) {
        this.firestore.doc('product_detail/' + proId).delete();
      }

      getProducts() {
        return this.firestore.collection('product-detail').snapshotChanges();
      }

      getAllProductByid(proId) {
        const proObj = this.firestore.doc('product-detail/' + proId);
        return this.firestore.collection('products', ref => ref.where('category', '==', proObj.ref)).snapshotChanges()
    }

     
  
}
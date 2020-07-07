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
      const genObj =this.firestore.doc('genders/' + product.genderId);
//console.log('genObj',genObj);
        return this.firestore.collection('product_detail').add({
          gender: genObj.ref,
          product_name: product.product_name,
          price: product.price,
          material: product.material
        }).then(function(docRef) {
           // console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        });
      }
    
      updateProduct(id, product: any) {
        const genObj =this.firestore.doc('genders/' + product.genderId);
        this.firestore.doc('product_detail/' + id).update({
          gender: genObj.ref,
          product_name: product.product_name,
          price: product.price,
          material: product.material
        });
      }

      deleteMainImage(url, proId) {
       // console.log("in delete product do:", url, proId)
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
        return this.firestore.collection('product_detail').snapshotChanges();
      }

      getAllProductByid(proId) {
        const proObj = this.firestore.doc('product_detail/' + proId);
        //return this.firestore.collection('products', ref => ref.where('category', '==', proObj.ref)).snapshotChanges()
        return this.firestore.collection('product_detail').snapshotChanges()
    }

    getGenders() {
      return this.firestore.collection('genders').snapshotChanges();
    }

     
  
}
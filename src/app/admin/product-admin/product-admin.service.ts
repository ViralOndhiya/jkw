import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
@Injectable()
export class ProductAdminService {
    constructor(private http: HttpClient, private firestore: AngularFirestore,
        private storage: AngularFireStorage) { 
    }

    createProduct(product: any) {
     
     // const genObj =this.firestore.doc('genders/' + product.genderId);
    //  const catObj =this.firestore.doc('category/' + product.categoryID);
     

        return this.firestore.collection('product_detail').add({
          //gender: genObj.ref,
          //name:catObj.ref,

          gender: product.genderId,
          name: product.categoryID,
          product_name: product.product_name,
          price: product.price,
          material: product.material, 
          size: product.size,         
        }).then(function(docRef) {
           // console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        });       
      }
     

      // setsize(product: any) {
       
      //   this.firestore.collection('product_detail/').doc(product.id).update({
      //     size : firebase.firestore.FieldValue.arrayUnion(product.size)
      //   });
      // }
    
      updateProduct(id, product: any) {
      
        const genObj =this.firestore.doc('genders/' + product.genderId);
        const catObj =this.firestore.doc('category/' + product.categoryID);
        const sizeObj = this.firestore.doc('sizes/' + product.sizeId);
        this.firestore.doc('product_detail/' + id).update({
          gender: genObj.ref,
          name:catObj.ref,
          product_name: product.product_name,
          price: product.price,
          material: product.material,
          size:  firebase.firestore.FieldValue.arrayUnion(sizeObj.ref),
         
        });
      }

      deleteMainImage(url, proId) {
        this.storage.storage.refFromURL(url).delete();
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
        return this.firestore.collection('product_detail').snapshotChanges()
    }

   
      getAllProductBygid(genderName) {
      
      const genObj = this.firestore.doc('product_detail/' + genderName);
      return this.firestore.collection('product_detail').snapshotChanges()
  }

    getGenders() {
      return this.firestore.collection('genders').snapshotChanges();
    }

   

    getCategories() {
      return this.firestore.collection('category').snapshotChanges();
    }
    getsizes() {
      return this.firestore.collection('sizes').snapshotChanges();
    }

     
  
}
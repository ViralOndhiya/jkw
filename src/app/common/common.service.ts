import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CommonService {
    constructor(){}
    // private db: AngularFireDatabase
    private basePath = "https://jaliyankw.firebaseio.com/"
    // addLikedProductInList(){
    //     const itemsRef = this.db.list('items');
    //     // const itemRef = db.object('item');
    //     // itemsRef.set({ name: 'new name!'});
    //     itemsRef.push({ name: '111' });
    //     itemsRef.push({ name: '222' });
    //     itemsRef.push({ name: '333' });
    //     itemsRef.push({ name: '444' });
    //     itemsRef.push({ name: '111' });
    // }
    // itemsRef: AngularFireList<any>;
    // items: Observable<any[]>;
    // getUserLikedProducts(){
    // //    return this.db.list('items').snapshotChanges()
    // this.itemsRef  = this.db.list('items')
    // return this.itemsRef.snapshotChanges()
    // }

    // getLikedProducts(){
    //     return this.db.object('products').valueChanges()
    // }

    getCurrentUser() {
        return localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')) : null;
    }

    // updateProductCount(obj){
    //     // var obj = {}
    //     // obj[pId] = cnt
    //     // console.log("in update produc:", obj)
    //     return this.db.object('/').set({products: obj})
    // }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class SliderAdminService {
  constructor(private http: HttpClient, private firestore: AngularFirestore,
    private storage: AngularFireStorage) {
  }

  getAllSliders() {
    return this.firestore.collection('sliders').snapshotChanges();
  }



  // addSliderImage(slider: any) {
  //   console.log("in add slider function service")
  //   return this.firestore.collection('sliders').add(slider).then(function(docRef) {
  //       console.log("Document written with ID for slider: ", docRef.id);
  //       return docRef.id;
  //   });
  // }

  deleteMainImage(url, sliderId) {
    console.log("in delete product do:", url, sliderId)
    this.storage.storage.refFromURL(url).delete();
    this.updateSliderMainImagePath(sliderId, '', '')
  }

  updateSliderMainImagePath(sliderId, mainImage, pathMainImage) {
    this.firestore.collection("sliders").doc(sliderId).update({
      mainImage: mainImage,
      pathMainImage: pathMainImage
    })
  }
}
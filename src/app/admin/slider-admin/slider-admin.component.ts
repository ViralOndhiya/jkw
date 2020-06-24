import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { SliderAdminService } from './slider-admin.service';

@Component({
  selector: 'app-slider-admin',
  templateUrl: './slider-admin.component.html',
  styleUrls: ['./slider-admin.component.css'],
  providers: [SliderAdminService]
})
export class SliderAdminComponent implements OnInit {

  mainImage: any = "";
  subImage: any = "";
  uploadProgress1;
  uploadProgress2;
  uploadProgress3;
  uploadProgress4;
  uploadProgress5;
  task: AngularFireUploadTask;
  name;
  description;
  cols: any[];
  categories: any[] = []
  selectedCategory: any;
  @ViewChild('minImageInput', { static: false })
  mainImageVariable: ElementRef;

  sliders: any[] = []
  selectedProduct: any;
  showLoader : boolean = false;

  constructor(private firestore: AngularFirestore,
    private sliderAdminService: SliderAdminService,
    private storage: AngularFireStorage) {
      this.sliderAdminService.getAllSliders().subscribe(data => {
        this.sliders = []
        data.map(e => {
            var dt: any = e.payload.doc.data()
            this.sliders.push({
                id: e.payload.doc.id, mainImage: dt.mainImage, type: this.checkType(dt.mainImage) ? 'image' : 'video'
            })
        });
    })
     }

  ngOnInit(): void {
    
   
  }

  private checkType(url){
    var arr = [ "jpeg", "jpg", "gif", "png", "tiff", "bmp" ];
    // console.log("ig::;...", url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?')))
    return arr.indexOf(url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?'))) > -1
  }

deleteMainImage(slider){
    this.sliderAdminService.deleteMainImage(slider.mainImage, slider.id);
}

upload(event, tableName, tableId, index) {
    this.showLoader = true;
    this.mainImage = ""
    const path = `${tableName}/${Date.now()}_${event.target.files[0].name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, event.target.files[0]);
    this['uploadProgress'+index] = this.task.percentageChanges();
    this.storage.upload(tableName, event.target.files[0]).then(async (result) => {
        this.mainImage = await ref.getDownloadURL().toPromise();
        console.log("Slider main image:", this.mainImage)
       

        this.sliderAdminService.updateSliderMainImagePath(tableId, this.mainImage, path)
     
       
        this.showLoader = false;
    })
}
  // SliderPhotoSelected(event: any){
  //   // const target: HTMLInputElement = <HTMLInputElement>event.target;
  //   // const files: FileList =target.files;
  //   const file: File=event.target.files[0];
   
  //   const metaData = {'contentType' : file.type};
  //   const storageRef: firebase.storage.Reference = firebase.storage().ref('/slider/url1');
  //   storageRef.put(file,metaData);

  //   console.log("Uploading filename: ",file.name);

  // }
  
}

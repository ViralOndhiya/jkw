import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
 // downloadURL: Observable<any>;
 ProdownloadURL: any;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {

    this.startUpload();
  }

  startUpload() {
    var exitingproduct = localStorage.getItem("STORE_IMG_NAME");
   // console.log('exitingproduct',exitingproduct);
    // The storage path
    const path = `product_detail/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);
    //console.log('path',path)
    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.ProdownloadURL  = await ref.getDownloadURL().toPromise();
     //   console.log('ProdownloadURL',this.ProdownloadURL);   
        

       
           this.db.collection('product_detail').doc(exitingproduct).set( { ProdownloadURL : firebase.firestore.FieldValue.arrayUnion(this.ProdownloadURL)}, {merge: true});
          //this.db.collection('product_detail').doc(exitingproduct).set( { ProdownloadURL : this.ProdownloadURL, path});
      
          
        
  
       
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
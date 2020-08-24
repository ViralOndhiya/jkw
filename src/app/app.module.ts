import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SliderAdminComponent } from './admin/slider-admin/slider-admin.component';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { CarouselModule } from 'primeng/carousel';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyService } from './common/notify.service';
import { CommonService } from './common/common.service';
import { ContactusComponent } from './contactus/contactus.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs'

import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './navigation/footer/footer.component';
import { ShareModule } from '@ngx-share/core';


import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ProductComponent } from './product/product.component';
import { DialogModule } from 'primeng/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ProductdetailComponent } from './productdetail/productdetail.component';

// Import the library


 // for image zoom
// import {
//   SocialLoginModule,
//   AuthServiceConfig,
//   GoogleLoginProvider,
//   FacebookLoginProvider,
// } from "angularx-social-login";

// const config = new AuthServiceConfig([
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     // provider: new FacebookLoginProvider('866153103835233')
//     provider: new FacebookLoginProvider('192438435494204')
//   },
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     // provider: new GoogleLoginProvider('401109795446-qjvv0pm1rb27hriafttqhi6dletig8oa.apps.googleusercontent.com')
//     provider: new GoogleLoginProvider('427405871684-a8b099lefrcluprnllgcke345pk35s2e.apps.googleusercontent.com')


//   }
// ]);

// export function provideConfig() {
//   return config;
// }
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    HeaderComponent,
    SidenavListComponent,
    SliderAdminComponent,
    ProductAdminComponent,
    ContactusComponent,
    FooterComponent,
    
    
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    ProductComponent,
    ProductdetailComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CarouselModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    TableModule,
    DropdownModule,
    DataViewModule,
    PanelModule,
    ShareModule,  
    FontAwesomeModule,
    ButtonModule,
    CheckboxModule,
   
    ShareModule.forRoot(),
   // SocialLoginModule,
   DialogModule,
   //NgxImageZoomModule, // <-- Add this line
   AgmCoreModule.forRoot({
    apiKey: 'AIzaSyCYTFor6RFV5hofjBPrk3NEgsV-1o1b8HQ'
  }),
    RouterModule.forRoot([      
      { path: '', component: HomeComponent },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
      { path: 'admin/slider', component: SliderAdminComponent},
      { path: 'admin/product', component: ProductAdminComponent},
      { path: 'contactus', component: ContactusComponent},
      { path: 'uploader', component: UploaderComponent},
      { path: 'product', component: ProductComponent},
      { path: 'productdetail', component: ProductdetailComponent},
      
    ]),
    
  ],
 
  // providers: [{ provide: AuthServiceConfig, useFactory: provideConfig },
  //   AngularFirestore, AngularFireStorage, NotifyService, CommonService],
  providers: [
    AngularFirestore, AngularFireStorage, CommonService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule { }

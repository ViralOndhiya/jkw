import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SliderAdminComponent } from './admin/slider-admin/slider-admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin/slider', component: SliderAdminComponent},
  { path: 'admin/product', component: ProductAdminComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'uploader', component: UploaderComponent},
  { path: 'product', component: ProductComponent},
  //{ path: 'app/:genId', component: ProductComponent},
 /*  { path: 'app/:genderName', component: ProductComponent}, */
  { path: 'app', component: ProductComponent},
 
];
//export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

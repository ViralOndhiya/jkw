import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SliderAdminComponent } from './admin/slider-admin/slider-admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './productdetail/productdetail.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin/slider', component: SliderAdminComponent},
  { path: 'admin/product', component: ProductAdminComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'uploader', component: UploaderComponent},
  { path: 'product', component: ProductComponent},
  { path: 'app/:genId', component: ProductComponent},
  { path: 'productdetail/:proId', component: ProductDetailComponent},
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

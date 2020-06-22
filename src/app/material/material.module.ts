import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule   } from '@angular/material/list';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatTabsModule  } from '@angular/material/tabs';
import { MatIconModule  } from '@angular/material/icon';
import { MatButtonModule   } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,  
    MatTabsModule,
    MatSidenavModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,   
    MatTabsModule,
    MatSidenavModule    
  ]
})
export class MaterialModule { }

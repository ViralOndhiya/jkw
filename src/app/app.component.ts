import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jaliyan Kids Wear';
  navLinks: any[];
  activeLinkIndex = -1;
 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Women',
            link: './first',
            index: 0
        }, {
            label: 'Men',
            link: './second',
            index: 1
        },    {
          label: 'Kids',
          link: './second',
          index: 2
      }, {
        label: 'Others',
        link: './uploader',
        index: 3
    },  
        {
            label: 'Contact us',
            link: './contactus',
            index: 4
        }, 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}
}

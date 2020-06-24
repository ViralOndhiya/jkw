import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SliderAdminService } from '../admin/slider-admin/slider-admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SliderAdminService],
  styles: [`
  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-details > .p-grid {
      border: 1px solid #b3c2ca;
      border-radius: 3px;
      margin: 0.3em;
      text-align: center;
      padding: 2em 0 2.25em 0;
  }
  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-title {
      font-weight: 700;
      font-size: 20px;
      margin-top: 24px;
  }
  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-subtitle {
      margin: 0.25em 0 2em 0;
  }
  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button {
      margin-left: 0.0em;
  }
  .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button:first-child {
      margin-left: 0;
  }
  .carousel-demo .ui-carousel.custom-carousel .ui-carousel-dot-icon {
      width: 16px !important;
      height: 16px !important;
      border-radius: 50%;
  }
  .carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-start .car-details > .p-grid {
      margin-left: 0.1em;
  }
  .carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-end .car-details > .p-grid {
      margin-right: 0.1em;
  }
`]
})
export class HomeComponent implements OnInit {
  sliders: any[]; // // FOR SLIDER IMAGE 20200312
  responsiveOptions; // // FOR SLIDER IMAGE 20200312
  
  constructor( private router: Router, private sliderService: SliderAdminService) { 
     // FOR SLIDER IMAGE 20200312
     this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      }, 
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.sliderService.getAllSliders().subscribe(data => {
      this.sliders = []
      data.map(e => {
          var dt: any = e.payload.doc.data()
          if(dt.mainImage)
            this.sliders.push({
                id: e.payload.doc.id, mainImage: dt.mainImage, type: this.checkType(dt.mainImage) ? 'image' : 'video'
            })
      });
      console.log("slider on home page:", this.sliders)
  })
  
  }
  public executeSelectedChange = (event) => {
    console.log(event);
  }

  


private checkType(url){
  var arr = [ "jpeg", "jpg", "gif", "png", "tiff", "bmp" ];
  // console.log("ig::;...", url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?')))
  return arr.indexOf(url.substring(url.lastIndexOf('.')+1, url.lastIndexOf('?'))) > -1
}
}

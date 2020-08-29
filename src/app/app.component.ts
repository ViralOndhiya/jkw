import { Component, ViewEncapsulation ,Compiler} from '@angular/core';
import { Router } from '@angular/router';
import { ProductAdminService } from './admin/product-admin/product-admin.service';
// import { RuntimeCompiler} from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductAdminService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
  title = 'Jaliyan Kids Wear';
  navLinks: any[];
  activeLinkIndex = -1;
  genders: any[] = [];
  constructor(private router: Router, private productAdminService: ProductAdminService,
    private _runtimeCompiler: Compiler) {

    this.productAdminService.getGenders().subscribe(data => {
      this.genders = []
      data.map(e => {
        var dt: any = e.payload.doc.data()
        this.genders.push({ id: e.payload.doc.id, gender: dt.gender })
      });

      //  console.log("list of genders:", this.genders)
    })

    // this.navLinks = [
    //   {
    //     label: 'Female',
    //     link: './product',
    //     index: 0
    //   }, {
    //     label: 'Men',
    //     link: './second',
    //     index: 1
    //   }, {
    //     label: 'Kids',
    //     link: './admin/product',
    //     index: 2
    //   }, {
    //     label: 'Others',
    //     link: './uploader',
    //     index: 3
    //   },
    //   {
    //     label: 'Contact us',
    //     link: './contactus',
    //     index: 4
    //   },
    // ];


  }
  ngOnInit(): void {
    // this.router.events.subscribe((res) => {
    //   this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    // });
    this._runtimeCompiler.clearCache();

  }
  gotoGenderof(itm) {
    this.router.navigate(['app/', {genderName:itm.gender}]);
  }

}

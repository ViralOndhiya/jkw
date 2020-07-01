import { Component, OnInit } from '@angular/core';
import { ShareButtons } from '@ngx-share/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public share: ShareButtons) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  
  constructor( public service: ApiService ) { }

  ngOnInit(): void { }

}

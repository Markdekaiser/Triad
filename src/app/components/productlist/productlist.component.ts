import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
products: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getall();
  }
  getall() {
    this.dataService
      .request('get_product_list', {})
      .subscribe((res: any) => {
        if (res.data) {
          this.products = res.data;

        } else if (res.error) {

        }
      });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './model/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularHttpRequest';
  allProducts: Product[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  // SIMILAR TO USEEFFECT HOOKS...
  ngOnInit() {
    this.fetchProducts();
  }

  onProductsFetch() {
    this.fetchProducts();
  }

  // POST REQUEST...
  onProductCreate(products: { pName: string; desc: string; price: string }) {
    console.log(products);
    const headers = new HttpHeaders({ myHeader: 'procademy' });
    this.http
      .post<{ name: string }>(
        'https://mean-elluminatiinc-default-rtdb.firebaseio.com/products.json',
        products,
        { headers: headers }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  // GET REQUEST...
  private fetchProducts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Product }>(
        'https://mean-elluminatiinc-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((res: { [key: string]: Product }) => {
          const products = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
        })
      )
      .subscribe((products) => {
        console.log(products);
        this.allProducts = products;
        this.isFetching = false;
      });
  }

  // DELETE one element..
  onDeleteProduct(id: string) {
    this.http
      .delete(
        'https://mean-elluminatiinc-default-rtdb.firebaseio.com/products/' +
          id +
          '.json'
      )
      .subscribe();
  }

  // DELETE all elements..
  onDeleteAllProduct() {
    this.http
      .delete(
        'https://mean-elluminatiinc-default-rtdb.firebaseio.com/products/.json'
      )
      .subscribe();
  }
}

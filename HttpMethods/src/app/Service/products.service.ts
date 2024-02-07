import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  // Create product in dB
  createProduct() {}

  // Fetch products from dB
  fetchProduct() {}

  // Delete product fro dB
  deleteProduct() {}

  //delete all products from dB
  deleteAllProducts() {}
}

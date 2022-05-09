import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_PATH } from '../../shared/constants/base-constant';
import { SellerPageDto, Seller } from './seller.model';

export type EntityResponseType = HttpResponse<Seller>;

@Injectable({
  providedIn: 'root'
})
export class SellerService {

    private serverUrl = SERVER_PATH + 'seller';
    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<SellerPageDto>> {
        let pageNumber = null;
        let pageCount = null;
        let newresourceUrl = null;

        Object.keys(req).forEach((key) => {
            if (key === 'page') {
                pageNumber = req[key];
            }
            if (key === 'count') {
                pageCount = req[key];
            }
        });

        newresourceUrl = this.serverUrl + `/page/${pageNumber}/count/${pageCount}`;

        return this.http.post<SellerPageDto>(newresourceUrl, req['filter'], { observe: 'response' });
    }

    update(seller: Seller): Observable<EntityResponseType> {
      const copy = this.convert(seller);
      return this.http.put<Seller>(`${this.serverUrl}`, copy, { observe: 'response'})
          .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    save(seller: Seller): Observable<EntityResponseType> {
        const copy = this.convert(seller);
        return this.http.post<Seller>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    private convert( seller: Seller): Seller {
        const copy: Seller = Object.assign({}, seller);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Seller = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(seller: Seller): Seller {
        const copyOb: Seller = Object.assign({}, seller);
        return copyOb;
    }
}

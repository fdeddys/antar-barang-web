import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_PATH } from '../../shared/constants/base-constant';
import { Transaksi, TransaksiPageDto } from './transaksi.model';

export type EntityResponseType = HttpResponse<Transaksi>;


@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

    private serverUrl = SERVER_PATH + 'transaksi';
    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<TransaksiPageDto>> {
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

        return this.http.post<TransaksiPageDto>(newresourceUrl, req['filter'], { observe: 'response' });
    }

    newTransaksi(transaksi: Transaksi): Observable<EntityResponseType> {
      const copy = this.convert(transaksi);
      return this.http.post<Transaksi>(`${this.serverUrl}/new`, copy, { observe: 'response'})
          .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(transaksi: Transaksi): Observable<EntityResponseType> {
        const copy = this.convert(transaksi);
        return this.http.put<Transaksi>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    private convert( transaksi: Transaksi): Transaksi {
        const copy: Transaksi = Object.assign({}, transaksi);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Transaksi = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(transaksi: Transaksi): Transaksi {
        const copyOb: Transaksi = Object.assign({}, transaksi);
        return copyOb;
    }
}

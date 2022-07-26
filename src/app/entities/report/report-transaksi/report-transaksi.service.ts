import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_PATH } from '../../../shared/constants/base-constant';

@Injectable({
    providedIn: 'root'
})
export class ReportTransaksiService {

    private serverUrl = SERVER_PATH + 'report';
    constructor(private http: HttpClient) { }

    reportTransaksiService(tgl1: any, tgl2:any): Observable<Blob> {

        const filter = {
            startDate : tgl1,
            endDate: tgl2,
        };
        return this.http.post(`${this.serverUrl}/transaksi`, filter, { responseType: 'blob' });
    }

}

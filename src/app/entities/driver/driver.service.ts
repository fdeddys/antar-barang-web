import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver, DriverPageDto } from './driver.model';
import { SERVER_PATH } from '../../shared/constants/base-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<Driver>;

@Injectable({
    providedIn: 'root'
})
export class DriverService {

    private serverUrl = SERVER_PATH + 'driver';
    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<DriverPageDto>> {
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

        return this.http.post<DriverPageDto>(newresourceUrl, req['filter'], { observe: 'response' });
    }

    save(driver: Driver): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.post<Driver>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(driver: Driver): Observable<EntityResponseType> {
      const copy = this.convert(driver);
      return this.http.put<Driver>(`${this.serverUrl}`, copy, { observe: 'response'})
          .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

    private convert( driver: Driver): Driver {
        const copy: Driver = Object.assign({}, driver);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Driver = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(driver: Driver): Driver {
        const copyOb: Driver = Object.assign({}, driver);
        return copyOb;
    }
}

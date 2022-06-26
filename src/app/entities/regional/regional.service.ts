import { Injectable } from '@angular/core';
import { SERVER_PATH } from '../../shared/constants/base-constant';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regional, RegionalPageDto } from './regional.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<Regional>;

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

    private serverUrl = SERVER_PATH + 'regional';
    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<RegionalPageDto>> {
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

        return this.http.post<RegionalPageDto>(newresourceUrl, req['filter'], { observe: 'response' });
    }

    save(regional: Regional): Observable<EntityResponseType> {
        const copy = this.convert(regional);
        return this.http.post<Regional>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(regional: Regional): Observable<EntityResponseType> {
      const copy = this.convert(regional);
      return this.http.put<Regional>(`${this.serverUrl}`, copy, { observe: 'response'})
          .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

    private convert( regional: Regional): Regional {
        const copy: Regional = Object.assign({}, regional);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Regional = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(regional: Regional): Regional {
        const copyOb: Regional = Object.assign({}, regional);
        return copyOb;
    }

}

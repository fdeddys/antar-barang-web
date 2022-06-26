import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_PATH } from '../../shared/constants/base-constant';
import { RegionalGroupPageDto, RegionalGroup } from './regional-group.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<RegionalGroup>;

@Injectable({
    providedIn: 'root'
})
export class RegionalGroupService {

    private serverUrl = SERVER_PATH + 'regional-group';
    constructor(private http: HttpClient) { }

    filter(req?: any): Observable<HttpResponse<RegionalGroupPageDto>> {
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

        newresourceUrl = this.serverUrl + `/all/page/${pageNumber}/count/${pageCount}`;

        return this.http.post<RegionalGroupPageDto>(newresourceUrl, req['filter'], { observe: 'response' });
    }

    save(regionalGroup: RegionalGroup): Observable<EntityResponseType> {
        const copy = this.convert(regionalGroup);
        return this.http.post<RegionalGroup>(`${this.serverUrl}`, copy, { observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(regionalGroup: RegionalGroup): Observable<EntityResponseType> {
      const copy = this.convert(regionalGroup);
      return this.http.put<RegionalGroup>(`${this.serverUrl}`, copy, { observe: 'response'})
          .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

    private convert( regionalGroup: RegionalGroup): RegionalGroup {
        const copy: RegionalGroup = Object.assign({}, regionalGroup);
        return copy;
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegionalGroup = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertItemFromServer(regionalGroup: RegionalGroup): RegionalGroup {
        const copyOb: RegionalGroup = Object.assign({}, regionalGroup);
        return copyOb;
    }

}

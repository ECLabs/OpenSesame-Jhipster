import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VersionOpenSesame } from './version-open-sesame.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VersionOpenSesame>;

@Injectable()
export class VersionOpenSesameService {

    private resourceUrl =  SERVER_API_URL + 'api/versions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(version: VersionOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(version);
        return this.http.post<VersionOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(version: VersionOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(version);
        return this.http.put<VersionOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VersionOpenSesame>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VersionOpenSesame[]>> {
        const options = createRequestOption(req);
        return this.http.get<VersionOpenSesame[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VersionOpenSesame[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VersionOpenSesame = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VersionOpenSesame[]>): HttpResponse<VersionOpenSesame[]> {
        const jsonResponse: VersionOpenSesame[] = res.body;
        const body: VersionOpenSesame[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VersionOpenSesame.
     */
    private convertItemFromServer(version: VersionOpenSesame): VersionOpenSesame {
        const copy: VersionOpenSesame = Object.assign({}, version);
        copy.createdon = this.dateUtils
            .convertLocalDateFromServer(version.createdon);
        return copy;
    }

    /**
     * Convert a VersionOpenSesame to a JSON which can be sent to the server.
     */
    private convert(version: VersionOpenSesame): VersionOpenSesame {
        const copy: VersionOpenSesame = Object.assign({}, version);
        copy.createdon = this.dateUtils
            .convertLocalDateToServer(version.createdon);
        return copy;
    }
}

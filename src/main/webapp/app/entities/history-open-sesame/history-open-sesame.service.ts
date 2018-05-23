import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { HistoryOpenSesame } from './history-open-sesame.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<HistoryOpenSesame>;

@Injectable()
export class HistoryOpenSesameService {

    private resourceUrl =  SERVER_API_URL + 'api/histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(history: HistoryOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(history);
        return this.http.post<HistoryOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(history: HistoryOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(history);
        return this.http.put<HistoryOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<HistoryOpenSesame>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<HistoryOpenSesame[]>> {
        const options = createRequestOption(req);
        return this.http.get<HistoryOpenSesame[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<HistoryOpenSesame[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: HistoryOpenSesame = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<HistoryOpenSesame[]>): HttpResponse<HistoryOpenSesame[]> {
        const jsonResponse: HistoryOpenSesame[] = res.body;
        const body: HistoryOpenSesame[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to HistoryOpenSesame.
     */
    private convertItemFromServer(history: HistoryOpenSesame): HistoryOpenSesame {
        const copy: HistoryOpenSesame = Object.assign({}, history);
        copy.createdon = this.dateUtils
            .convertLocalDateFromServer(history.createdon);
        return copy;
    }

    /**
     * Convert a HistoryOpenSesame to a JSON which can be sent to the server.
     */
    private convert(history: HistoryOpenSesame): HistoryOpenSesame {
        const copy: HistoryOpenSesame = Object.assign({}, history);
        copy.createdon = this.dateUtils
            .convertLocalDateToServer(history.createdon);
        return copy;
    }
}

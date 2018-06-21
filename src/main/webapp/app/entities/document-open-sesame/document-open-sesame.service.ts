import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DocumentOpenSesame, Status} from './document-open-sesame.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentOpenSesame>;

@Injectable()
export class DocumentOpenSesameService {

    private resourceUrl =  SERVER_API_URL + 'api/documents';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(document: DocumentOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(document);
        return this.http.post<DocumentOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(document: DocumentOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(document);
        return this.http.put<DocumentOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentOpenSesame>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    approve(id: number): Observable<EntityResponseType> {
      return this.http.post<DocumentOpenSesame>(`${this.resourceUrl}/${id}/approve`, {}, { observe: 'response' })
          .map((res: EntityResponseType) => this.convertResponse(res));
    }

    deny(id: number, status: string): Observable<EntityResponseType> {
      return this.http.post<DocumentOpenSesame>(`${this.resourceUrl}/${id}/deny`, status, { observe: 'response' })
          .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentOpenSesame[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentOpenSesame[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentOpenSesame[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentOpenSesame = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentOpenSesame[]>): HttpResponse<DocumentOpenSesame[]> {
        const jsonResponse: DocumentOpenSesame[] = res.body;
        const body: DocumentOpenSesame[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentOpenSesame.
     */
    private convertItemFromServer(document: DocumentOpenSesame): DocumentOpenSesame {
        const copy: DocumentOpenSesame = Object.assign({}, document);
        copy.createdon = this.dateUtils
            .convertLocalDateFromServer(document.createdon);
        copy.duedate = this.dateUtils
            .convertLocalDateFromServer(document.duedate);
        return copy;
    }

    /**
     * Convert a DocumentOpenSesame to a JSON which can be sent to the server.
     */
    private convert(document: DocumentOpenSesame): DocumentOpenSesame {
        const copy: DocumentOpenSesame = Object.assign({}, document);
        copy.createdon = this.dateUtils
            .convertLocalDateToServer(document.createdon);
        copy.duedate = this.dateUtils
            .convertLocalDateToServer(document.duedate);
        return copy;
    }
}

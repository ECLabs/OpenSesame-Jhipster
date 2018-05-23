import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommentOpenSesame } from './comment-open-sesame.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CommentOpenSesame>;

@Injectable()
export class CommentOpenSesameService {

    private resourceUrl =  SERVER_API_URL + 'api/comments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comment: CommentOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.post<CommentOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comment: CommentOpenSesame): Observable<EntityResponseType> {
        const copy = this.convert(comment);
        return this.http.put<CommentOpenSesame>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CommentOpenSesame>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CommentOpenSesame[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentOpenSesame[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CommentOpenSesame[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CommentOpenSesame = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CommentOpenSesame[]>): HttpResponse<CommentOpenSesame[]> {
        const jsonResponse: CommentOpenSesame[] = res.body;
        const body: CommentOpenSesame[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommentOpenSesame.
     */
    private convertItemFromServer(comment: CommentOpenSesame): CommentOpenSesame {
        const copy: CommentOpenSesame = Object.assign({}, comment);
        copy.createdon = this.dateUtils
            .convertLocalDateFromServer(comment.createdon);
        return copy;
    }

    /**
     * Convert a CommentOpenSesame to a JSON which can be sent to the server.
     */
    private convert(comment: CommentOpenSesame): CommentOpenSesame {
        const copy: CommentOpenSesame = Object.assign({}, comment);
        copy.createdon = this.dateUtils
            .convertLocalDateToServer(comment.createdon);
        return copy;
    }
}

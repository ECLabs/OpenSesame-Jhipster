import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DocumentOpenSesameComponent } from './document-open-sesame.component';
import { DocumentOpenSesameDetailComponent } from './document-open-sesame-detail.component';
import { DocumentOpenSesamePopupComponent } from './document-open-sesame-dialog.component';
import { DocumentOpenSesameDeletePopupComponent } from './document-open-sesame-delete-dialog.component';
import { DocumentOpenSesameMockPopupComponent } from './document-open-sesame-mock.component';

@Injectable()
export class DocumentOpenSesameResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const documentRoute: Routes = [
    {
        path: 'document-open-sesame',
        component: DocumentOpenSesameComponent,
        resolve: {
            'pagingParams': DocumentOpenSesameResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-open-sesame/:id',
        component: DocumentOpenSesameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document-open-sesame-new',
        component: DocumentOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-open-sesame/:id/edit',
        component: DocumentOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-open-sesame/:id/delete',
        component: DocumentOpenSesameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-open-sesame-mock',
        component: DocumentOpenSesameMockPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }

];

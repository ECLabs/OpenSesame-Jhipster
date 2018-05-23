import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HistoryOpenSesameComponent } from './history-open-sesame.component';
import { HistoryOpenSesameDetailComponent } from './history-open-sesame-detail.component';
import { HistoryOpenSesamePopupComponent } from './history-open-sesame-dialog.component';
import { HistoryOpenSesameDeletePopupComponent } from './history-open-sesame-delete-dialog.component';

export const historyRoute: Routes = [
    {
        path: 'history-open-sesame',
        component: HistoryOpenSesameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'history-open-sesame/:id',
        component: HistoryOpenSesameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historyPopupRoute: Routes = [
    {
        path: 'history-open-sesame-new',
        component: HistoryOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'history-open-sesame/:id/edit',
        component: HistoryOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'history-open-sesame/:id/delete',
        component: HistoryOpenSesameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

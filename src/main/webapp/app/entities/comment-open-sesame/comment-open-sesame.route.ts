import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommentOpenSesameComponent } from './comment-open-sesame.component';
import { CommentOpenSesameDetailComponent } from './comment-open-sesame-detail.component';
import { CommentOpenSesamePopupComponent } from './comment-open-sesame-dialog.component';
import { CommentOpenSesameDeletePopupComponent } from './comment-open-sesame-delete-dialog.component';

export const commentRoute: Routes = [
    {
        path: 'comment-open-sesame',
        component: CommentOpenSesameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comment-open-sesame/:id',
        component: CommentOpenSesameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'comment-open-sesame-new',
        component: CommentOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-open-sesame/:id/edit',
        component: CommentOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-open-sesame/:id/delete',
        component: CommentOpenSesameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

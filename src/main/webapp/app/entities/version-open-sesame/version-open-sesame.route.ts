import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VersionOpenSesameComponent } from './version-open-sesame.component';
import { VersionOpenSesameDetailComponent } from './version-open-sesame-detail.component';
import { VersionOpenSesamePopupComponent } from './version-open-sesame-dialog.component';
import { VersionOpenSesameDeletePopupComponent } from './version-open-sesame-delete-dialog.component';

export const versionRoute: Routes = [
    {
        path: 'version-open-sesame',
        component: VersionOpenSesameComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Versions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'version-open-sesame/:id',
        component: VersionOpenSesameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Versions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const versionPopupRoute: Routes = [
    {
        path: 'version-open-sesame-new',
        component: VersionOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Versions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'version-open-sesame/:id/edit',
        component: VersionOpenSesamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Versions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'version-open-sesame/:id/delete',
        component: VersionOpenSesameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Versions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../../shared';
import {
    VersionOpenSesameService,
    VersionOpenSesamePopupService,
    VersionOpenSesameComponent,
    VersionOpenSesameDetailComponent,
    VersionOpenSesameDialogComponent,
    VersionOpenSesamePopupComponent,
    VersionOpenSesameDeletePopupComponent,
    VersionOpenSesameDeleteDialogComponent,
    versionRoute,
    versionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...versionRoute,
    ...versionPopupRoute,
];

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VersionOpenSesameComponent,
        VersionOpenSesameDetailComponent,
        VersionOpenSesameDialogComponent,
        VersionOpenSesameDeleteDialogComponent,
        VersionOpenSesamePopupComponent,
        VersionOpenSesameDeletePopupComponent,
    ],
    entryComponents: [
        VersionOpenSesameComponent,
        VersionOpenSesameDialogComponent,
        VersionOpenSesamePopupComponent,
        VersionOpenSesameDeleteDialogComponent,
        VersionOpenSesameDeletePopupComponent,
    ],
    providers: [
        VersionOpenSesameService,
        VersionOpenSesamePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameVersionOpenSesameModule {}

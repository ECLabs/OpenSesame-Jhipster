import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../../shared';
import {
    DocumentOpenSesameService,
    DocumentOpenSesamePopupService,
    DocumentOpenSesameComponent,
    DocumentOpenSesameDetailComponent,
    DocumentOpenSesameDialogComponent,
    DocumentOpenSesamePopupComponent,
    DocumentOpenSesameDeletePopupComponent,
    DocumentOpenSesameDeleteDialogComponent,
    documentRoute,
    documentPopupRoute,
    DocumentOpenSesameResolvePagingParams,
    DocumentOpenSesameMockComponent,
    DocumentOpenSesameMockPopupComponent,
} from './';

const ENTITY_STATES = [
    ...documentRoute,
    ...documentPopupRoute,
];

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentOpenSesameComponent,
        DocumentOpenSesameDetailComponent,
        DocumentOpenSesameDialogComponent,
        DocumentOpenSesameDeleteDialogComponent,
        DocumentOpenSesamePopupComponent,
        DocumentOpenSesameDeletePopupComponent,
        DocumentOpenSesameMockComponent,
        DocumentOpenSesameMockPopupComponent,

    ],
    entryComponents: [
        DocumentOpenSesameComponent,
        DocumentOpenSesameDialogComponent,
        DocumentOpenSesamePopupComponent,
        DocumentOpenSesameDeleteDialogComponent,
        DocumentOpenSesameDeletePopupComponent,
        DocumentOpenSesameMockComponent,
        DocumentOpenSesameMockPopupComponent,

    ],
    providers: [
        DocumentOpenSesameService,
        DocumentOpenSesamePopupService,
        DocumentOpenSesameResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDocumentOpenSesameModule {}

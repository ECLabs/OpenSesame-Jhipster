import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../../shared';
import {
    HistoryOpenSesameService,
    HistoryOpenSesamePopupService,
    HistoryOpenSesameComponent,
    HistoryOpenSesameDetailComponent,
    HistoryOpenSesameDialogComponent,
    HistoryOpenSesamePopupComponent,
    HistoryOpenSesameDeletePopupComponent,
    HistoryOpenSesameDeleteDialogComponent,
    historyRoute,
    historyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...historyRoute,
    ...historyPopupRoute,
];

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HistoryOpenSesameComponent,
        HistoryOpenSesameDetailComponent,
        HistoryOpenSesameDialogComponent,
        HistoryOpenSesameDeleteDialogComponent,
        HistoryOpenSesamePopupComponent,
        HistoryOpenSesameDeletePopupComponent,
    ],
    entryComponents: [
        HistoryOpenSesameComponent,
        HistoryOpenSesameDialogComponent,
        HistoryOpenSesamePopupComponent,
        HistoryOpenSesameDeleteDialogComponent,
        HistoryOpenSesameDeletePopupComponent,
    ],
    providers: [
        HistoryOpenSesameService,
        HistoryOpenSesamePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameHistoryOpenSesameModule {}

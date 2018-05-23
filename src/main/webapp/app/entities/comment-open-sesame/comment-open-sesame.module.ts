import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../../shared';
import {
    CommentOpenSesameService,
    CommentOpenSesamePopupService,
    CommentOpenSesameComponent,
    CommentOpenSesameDetailComponent,
    CommentOpenSesameDialogComponent,
    CommentOpenSesamePopupComponent,
    CommentOpenSesameDeletePopupComponent,
    CommentOpenSesameDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentOpenSesameComponent,
        CommentOpenSesameDetailComponent,
        CommentOpenSesameDialogComponent,
        CommentOpenSesameDeleteDialogComponent,
        CommentOpenSesamePopupComponent,
        CommentOpenSesameDeletePopupComponent,
    ],
    entryComponents: [
        CommentOpenSesameComponent,
        CommentOpenSesameDialogComponent,
        CommentOpenSesamePopupComponent,
        CommentOpenSesameDeleteDialogComponent,
        CommentOpenSesameDeletePopupComponent,
    ],
    providers: [
        CommentOpenSesameService,
        CommentOpenSesamePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameCommentOpenSesameModule {}

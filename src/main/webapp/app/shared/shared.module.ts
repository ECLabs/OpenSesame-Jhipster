import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    OpenSesameSharedLibsModule,
    OpenSesameSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    DocumentModalService,
    JhiDocumentModalComponent
} from './';

@NgModule({
    imports: [
        OpenSesameSharedLibsModule,
        OpenSesameSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        JhiDocumentModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        DocumentModalService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [
        JhiLoginModalComponent,
        JhiDocumentModalComponent
    ],
    exports: [
        OpenSesameSharedCommonModule,
        JhiDocumentModalComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OpenSesameSharedModule {}

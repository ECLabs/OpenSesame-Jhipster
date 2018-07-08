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
    JhiDocumentModalComponent,
    DenyModalService,
    JhiDenyModalComponent
} from './';

@NgModule({
    imports: [
        OpenSesameSharedLibsModule,
        OpenSesameSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        JhiDocumentModalComponent,
        JhiDenyModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        DenyModalService,
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
        JhiDocumentModalComponent,
        JhiDenyModalComponent
    ],
    exports: [
        OpenSesameSharedCommonModule,
        JhiDocumentModalComponent,
        JhiLoginModalComponent,
        JhiDenyModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OpenSesameSharedModule {}

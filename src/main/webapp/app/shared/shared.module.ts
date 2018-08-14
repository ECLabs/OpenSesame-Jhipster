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
    MetricsModalService,
    JhiDocumentModalComponent,
    JhiMetricsModalComponent,
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
        JhiMetricsModalComponent,
        JhiDenyModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        DenyModalService,
        DocumentModalService,
        MetricsModalService,
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
        JhiMetricsModalComponent,
        JhiDenyModalComponent
    ],
    exports: [
        OpenSesameSharedCommonModule,
        JhiDocumentModalComponent,
        JhiMetricsModalComponent,
        JhiLoginModalComponent,
        JhiDenyModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class OpenSesameSharedModule {}

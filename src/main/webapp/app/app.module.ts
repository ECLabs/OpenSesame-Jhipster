import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { OpenSesameSharedModule, UserRouteAccessService } from './shared';
import { OpenSesameAppRoutingModule} from './app-routing.module';
import { OpenSesameHomeModule } from './home/home.module';
import { OpenSesameAdminModule } from './admin/admin.module';
import { OpenSesameDirectorModule } from './director/director.module';
import { OpenSesameAccountModule } from './account/account.module';
import { OpenSesameEntityModule } from './entities/entity.module';
import { OpenSesameDocModule } from './doc-temp/doc.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { MyAlertService } from './layouts/alert/alert.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    MyAlertComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent,
    ClassificationComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        OpenSesameAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        OpenSesameSharedModule,
        OpenSesameHomeModule,
        OpenSesameAdminModule,
        OpenSesameAccountModule,
        OpenSesameDirectorModule,
        OpenSesameEntityModule,
        OpenSesameDocModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        MyAlertComponent,
        ClassificationComponent,
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        MyAlertService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class OpenSesameAppModule {}

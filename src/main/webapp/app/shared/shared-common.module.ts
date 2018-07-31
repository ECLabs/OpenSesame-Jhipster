import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/en';

import { WindowRef } from './tracker/window.service';
import {
    OpenSesameSharedLibsModule,
    JhiAlertComponent,
    MyAlertComponent,
    JhiAlertErrorComponent
} from './';

@NgModule({
    imports: [
        OpenSesameSharedLibsModule
    ],
    declarations: [
        JhiAlertComponent,
        MyAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        WindowRef,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
    ],
    exports: [
        OpenSesameSharedLibsModule,
        JhiAlertComponent,
        MyAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class OpenSesameSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../shared';

import { DOC_ROUTE, DocComponent } from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild([ DOC_ROUTE ])
    ],
    declarations: [
        DocComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDocModule {}

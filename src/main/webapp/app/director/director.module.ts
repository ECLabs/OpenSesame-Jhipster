import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../shared';

import { DIRECTOR_ROUTE, DirectorComponent, DirectorEventsComponent } from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild([DIRECTOR_ROUTE])
    ],
    declarations: [
        DirectorComponent,
        DirectorEventsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDirectorModule {}

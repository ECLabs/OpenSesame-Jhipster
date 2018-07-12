import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../shared';

import { DIRECTOR_ROUTE, DirectorComponent, DirectorEventsComponent, DirectorEventsFilterComponent} from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild([DIRECTOR_ROUTE])
    ],
    declarations: [
        DirectorComponent,
        DirectorEventsComponent,
        DirectorEventsFilterComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDirectorModule {}

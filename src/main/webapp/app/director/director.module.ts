import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventService } from './event.service';

import { OpenSesameSharedModule } from '../shared';

import { DIRECTOR_ROUTE, DirectorComponent } from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        FullCalendarModule,
        RouterModule.forChild([ DIRECTOR_ROUTE ])
    ],
    declarations: [
        DirectorComponent,
    ],
    entryComponents: [
    ],
    providers: [ EventService ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDirectorModule {}

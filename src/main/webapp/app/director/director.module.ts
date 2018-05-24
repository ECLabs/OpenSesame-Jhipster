import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AngularDraggableModule } from 'angular2-draggable';

import { OpenSesameSharedModule } from '../shared';

import { DIRECTOR_ROUTE, DirectorComponent } from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        FullCalendarModule,
        AngularDraggableModule,
        RouterModule.forChild([ DIRECTOR_ROUTE ])
    ],
    declarations: [
        DirectorComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameDirectorModule {}

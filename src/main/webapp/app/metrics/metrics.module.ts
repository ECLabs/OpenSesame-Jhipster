import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenSesameSharedModule } from '../shared';

import { MetricsRoute, MetricsComponent} from './';

@NgModule({
    imports: [
        OpenSesameSharedModule,
        RouterModule.forChild([MetricsRoute])
    ],
    declarations: [
        MetricsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameMetricsModule {}

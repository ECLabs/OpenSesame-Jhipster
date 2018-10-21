import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { MetricsComponent } from './metrics.component';

export const MetricsRoute: Route = {
    path: 'metrics',
    component: MetricsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Metrics'
    },
    canActivate: [UserRouteAccessService]
};

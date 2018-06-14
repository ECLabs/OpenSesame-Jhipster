import { Route } from '@angular/router';

import { DirectorEventsComponent } from './';

export const DIRECTOR_EVENTS_ROUTE: Route = {
    path: 'director-events',
    component: DirectorEventsComponent,
    data: {
        authorities: [],
        pageTitle: 'OpenSesame Director Tools'
    }
};

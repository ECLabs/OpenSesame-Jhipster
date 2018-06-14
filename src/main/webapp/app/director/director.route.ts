import { Route } from '@angular/router';

import { DirectorComponent, DirectorEventsComponent } from './';

export const DIRECTOR_ROUTE: Route = {
    path: 'director',
    component: DirectorComponent,
    data: {
        authorities: [],
        pageTitle: 'OpenSesame Director Tools'
    }
};

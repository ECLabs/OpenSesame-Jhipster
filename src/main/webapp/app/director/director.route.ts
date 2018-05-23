import { Route } from '@angular/router';

import { DirectorComponent } from './';

export const DIRECTOR_ROUTE: Route = {
    path: 'director',
    component: DirectorComponent,
    data: {
        authorities: [],
        pageTitle: 'OpenSesame Director Tools'
    }
};

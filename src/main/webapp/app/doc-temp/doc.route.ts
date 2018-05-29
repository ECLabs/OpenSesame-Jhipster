import { Route } from '@angular/router';

import { DocComponent } from './';

export const DOC_ROUTE: Route = {
    path: 'doc',
    component: DocComponent,
    data: {
        authorities: [],
        pageTitle: 'OpenSesame Doc'
    }
};

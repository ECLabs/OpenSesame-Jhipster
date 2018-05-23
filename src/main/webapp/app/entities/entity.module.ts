import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OpenSesameDocumentOpenSesameModule } from './document-open-sesame/document-open-sesame.module';
import { OpenSesameHistoryOpenSesameModule } from './history-open-sesame/history-open-sesame.module';
import { OpenSesameCommentOpenSesameModule } from './comment-open-sesame/comment-open-sesame.module';
import { OpenSesameVersionOpenSesameModule } from './version-open-sesame/version-open-sesame.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        OpenSesameDocumentOpenSesameModule,
        OpenSesameHistoryOpenSesameModule,
        OpenSesameCommentOpenSesameModule,
        OpenSesameVersionOpenSesameModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenSesameEntityModule {}

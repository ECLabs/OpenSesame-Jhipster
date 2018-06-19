import { Component } from '@angular/core';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { Account, DocumentModalService } from '../shared';

@Component({
    selector: 'jhi-director-events',
    templateUrl: './director-events.component.html',
    styleUrls: [
        'director.css'

    ],
    providers: [NgbPopoverConfig]
})

export class DirectorEventsComponent {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private config: NgbPopoverConfig,
        private documentModalSerivce: DocumentModalService,
    ) {
        config.placement = 'right';
        config.triggers = 'hover';
    }

    getContent() {
        return ['Created on: ', 'Created by: ', 'Due Date: ', 'Current State: ', 'Last State: ', 'Version: ', 'Comments: '];
    }

    openDocPreview(document) {
        this.modalRef = this.documentModalSerivce.open(document.target.innerText);
    }
}

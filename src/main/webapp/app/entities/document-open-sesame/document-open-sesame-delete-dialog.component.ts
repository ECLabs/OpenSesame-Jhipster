import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesamePopupService } from './document-open-sesame-popup.service';
import { DocumentOpenSesameService } from './document-open-sesame.service';

@Component({
    selector: 'jhi-document-open-sesame-delete-dialog',
    templateUrl: './document-open-sesame-delete-dialog.component.html'
})
export class DocumentOpenSesameDeleteDialogComponent {

    document: DocumentOpenSesame;

    constructor(
        private documentService: DocumentOpenSesameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentListModification',
                content: 'Deleted an document'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-open-sesame-delete-popup',
    template: ''
})
export class DocumentOpenSesameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentPopupService
                .open(DocumentOpenSesameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

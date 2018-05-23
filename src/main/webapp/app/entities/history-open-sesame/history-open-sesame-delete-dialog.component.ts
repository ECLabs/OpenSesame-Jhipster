import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HistoryOpenSesame } from './history-open-sesame.model';
import { HistoryOpenSesamePopupService } from './history-open-sesame-popup.service';
import { HistoryOpenSesameService } from './history-open-sesame.service';

@Component({
    selector: 'jhi-history-open-sesame-delete-dialog',
    templateUrl: './history-open-sesame-delete-dialog.component.html'
})
export class HistoryOpenSesameDeleteDialogComponent {

    history: HistoryOpenSesame;

    constructor(
        private historyService: HistoryOpenSesameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'historyListModification',
                content: 'Deleted an history'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-history-open-sesame-delete-popup',
    template: ''
})
export class HistoryOpenSesameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historyPopupService: HistoryOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.historyPopupService
                .open(HistoryOpenSesameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

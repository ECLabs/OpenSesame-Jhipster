import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VersionOpenSesame } from './version-open-sesame.model';
import { VersionOpenSesamePopupService } from './version-open-sesame-popup.service';
import { VersionOpenSesameService } from './version-open-sesame.service';

@Component({
    selector: 'jhi-version-open-sesame-delete-dialog',
    templateUrl: './version-open-sesame-delete-dialog.component.html'
})
export class VersionOpenSesameDeleteDialogComponent {

    version: VersionOpenSesame;

    constructor(
        private versionService: VersionOpenSesameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.versionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'versionListModification',
                content: 'Deleted an version'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-version-open-sesame-delete-popup',
    template: ''
})
export class VersionOpenSesameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private versionPopupService: VersionOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.versionPopupService
                .open(VersionOpenSesameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HistoryOpenSesame } from './history-open-sesame.model';
import { HistoryOpenSesamePopupService } from './history-open-sesame-popup.service';
import { HistoryOpenSesameService } from './history-open-sesame.service';
import { DocumentOpenSesame, DocumentOpenSesameService } from '../document-open-sesame';

@Component({
    selector: 'jhi-history-open-sesame-dialog',
    templateUrl: './history-open-sesame-dialog.component.html'
})
export class HistoryOpenSesameDialogComponent implements OnInit {

    history: HistoryOpenSesame;
    isSaving: boolean;

    documents: DocumentOpenSesame[];
    createdonDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private historyService: HistoryOpenSesameService,
        private documentService: DocumentOpenSesameService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentService.query()
            .subscribe((res: HttpResponse<DocumentOpenSesame[]>) => { this.documents = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.history.id !== undefined) {
            this.subscribeToSaveResponse(
                this.historyService.update(this.history));
        } else {
            this.subscribeToSaveResponse(
                this.historyService.create(this.history));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<HistoryOpenSesame>>) {
        result.subscribe((res: HttpResponse<HistoryOpenSesame>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: HistoryOpenSesame) {
        this.eventManager.broadcast({ name: 'historyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDocumentById(index: number, item: DocumentOpenSesame) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-history-open-sesame-popup',
    template: ''
})
export class HistoryOpenSesamePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historyPopupService: HistoryOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.historyPopupService
                    .open(HistoryOpenSesameDialogComponent as Component, params['id']);
            } else {
                this.historyPopupService
                    .open(HistoryOpenSesameDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

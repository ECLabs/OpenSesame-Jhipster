import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { VersionOpenSesame } from './version-open-sesame.model';
import { VersionOpenSesamePopupService } from './version-open-sesame-popup.service';
import { VersionOpenSesameService } from './version-open-sesame.service';
import { DocumentOpenSesame, DocumentOpenSesameService } from '../document-open-sesame';

@Component({
    selector: 'jhi-version-open-sesame-dialog',
    templateUrl: './version-open-sesame-dialog.component.html'
})
export class VersionOpenSesameDialogComponent implements OnInit {

    version: VersionOpenSesame;
    isSaving: boolean;

    documents: DocumentOpenSesame[];
    createdonDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private versionService: VersionOpenSesameService,
        private documentService: DocumentOpenSesameService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentService.query()
            .subscribe((res: HttpResponse<DocumentOpenSesame[]>) => { this.documents = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.version.id !== undefined) {
            this.subscribeToSaveResponse(
                this.versionService.update(this.version));
        } else {
            this.subscribeToSaveResponse(
                this.versionService.create(this.version));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VersionOpenSesame>>) {
        result.subscribe((res: HttpResponse<VersionOpenSesame>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VersionOpenSesame) {
        this.eventManager.broadcast({ name: 'versionListModification', content: 'OK'});
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
    selector: 'jhi-version-open-sesame-popup',
    template: ''
})
export class VersionOpenSesamePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private versionPopupService: VersionOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.versionPopupService
                    .open(VersionOpenSesameDialogComponent as Component, params['id']);
            } else {
                this.versionPopupService
                    .open(VersionOpenSesameDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
